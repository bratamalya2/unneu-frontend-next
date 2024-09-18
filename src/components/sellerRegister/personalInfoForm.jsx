"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Libre_Baskerville } from "next/font/google";
import { enqueueSnackbar } from "notistack";

import { useUnneuDataStore } from "@/store/store";

import Upload from "@/../public/upload.png";
import UploadFile from "@/../public/upload file.png";

import "@/styles/personalInfoForm.css";

const lbFont = Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"] });

export default function PersonalInfoForm() {
    const router = useRouter();
    const setPhoneNumber = useUnneuDataStore(store => store.setPhoneNumber);
    const [email, setEmail] = useState("");
    const [isEmailOtpSent, setIsEmailOtpSent] = useState(false);
    const [sendEmailOtpText, setSendEmailOtpText] = useState("Send OTP");
    const [isEmailOtpVerified, setIsEmailOtpVerified] = useState(false);
    const [emailOtp, setEmailOtp] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [isPhoneOtpSent, setIsPhoneOtpSent] = useState(false);
    const [sendPhoneOtpText, setSendPhoneOtpText] = useState("Send OTP");
    const [isPhoneOtpVerified, setIsPhoneOtpVerified] = useState(false);
    const [phoneOtp, setPhoneOtp] = useState("");
    const [gst, setGst] = useState("");
    const [panImagePreview, setPanImagePreview] = useState(null);
    const panFileInputRef = useRef(null);
    const [panImageFile, setPanImageFile] = useState(null);

    const handlePanButtonClick = () => {
        panFileInputRef.current.click();
    };

    const handleFileChange = (event, setImagePreview) => {
        if (event.target.files.length > 0) {
            if (event.target.files[0].type.split("/")[0] !== "image") {
                setImagePreview(null);
                enqueueSnackbar("Only image files can be uploaded!", {
                    variant: "error"
                });
            }
            else {
                const file = event.target.files[0];
                setPanImageFile(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result);
                };
                reader.readAsDataURL(file);
            }
        } else {
            setImagePreview(null);
        }
    };

    const handleFormSubmit = async () => {
        try {
            if (!isEmailOtpVerified) {
                enqueueSnackbar("Please verify email!", {
                    variant: "error"
                });
            }
            else if (!isPhoneOtpVerified) {
                enqueueSnackbar("Please verify phone number!", {
                    variant: "error"
                });
            }
            else if (!panImageFile) {
                enqueueSnackbar("Please upload PAN image!", {
                    variant: "error"
                });
            }
            else {
                //submit form
                const formdata = new FormData();
                formdata.append("email", email);
                formdata.append("phoneNumber", phoneNo);
                formdata.append("gst", gst);
                formdata.append("pan", panImageFile);
                const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/register/1`, {
                    method: "POST",
                    body: formdata
                });
                const y = await x.json();
                if (y.success) {
                    router.push("/seller/register/2");
                }
                else
                    enqueueSnackbar(y.err, {
                        variant: "error"
                    });
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return <>
        <section className="hidden mt-[105px] lg:flex flex-row flex-nowrap justify-between pr-[5%]">
            <aside className="h-[1000px] w-[46%] rounded-tr-[36px] rounded-br-[36px]" id="seller-register-personal-info-form-hero"></aside>
            <aside className="w-[50%] mt-[20px]">
                <p className={`${lbFont.className} text-3xl mb-[20px]`}>Add Personal info</p>
                {
                    !isEmailOtpSent && (
                        <>
                            <p className="mt-[42px] text-xl">Enter email ID <span className="text-[#B73636]">*</span></p>
                            <div className="relative">
                                <input
                                    type="email"
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                    placeholder="Enter your email"
                                    className="mt-[18px] mb-[5px] w-full py-[12px] pl-5 pr-[100px] rounded-[12px] border-[0.6px] border-[#00000080] bg-[#F9F9F9]"
                                    style={{
                                        boxShadow: " 0px 11px 53.8px 4px rgba(81, 69, 55, 0.05)"
                                    }}
                                />
                                <div className="absolute top-[28px] right-2 text-[18px] text-[#00000080] hover:cursor-pointer" onClick={async () => {
                                    try {
                                        if (sendEmailOtpText === "Send OTP") {
                                            setSendEmailOtpText("Sending");
                                            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/sendVerificationEmail`, {
                                                method: "POST",
                                                body: JSON.stringify({
                                                    email
                                                }),
                                                headers: {
                                                    "Content-type": "application/json; charset=UTF-8"
                                                }
                                            });
                                            const y = await x.json();
                                            if (y.success) {
                                                setIsEmailOtpSent(true);
                                                setSendEmailOtpText("Verify OTP");
                                            }
                                            else {
                                                setSendEmailOtpText("Send OTP");
                                                enqueueSnackbar(y.err, {
                                                    variant: "error"
                                                });
                                            }
                                        }
                                    }
                                    catch (err) {
                                        console.log(err);
                                    }
                                }}>{sendEmailOtpText}</div>
                            </div>
                        </>
                    )
                }
                {
                    isEmailOtpSent && (
                        <>
                            <p className="mt-[42px] text-xl">{isEmailOtpVerified ? "Email Verified" : "Enter OTP sent to email"}<span className="text-[#B73636]">*</span></p>
                            <div className="relative">
                                <input
                                    type="number"
                                    onChange={e => setEmailOtp(e.target.value)}
                                    value={emailOtp}
                                    disabled={isEmailOtpVerified}
                                    placeholder="Enter OTP"
                                    className="mt-[18px] mb-[5px] w-full py-[12px] pl-5 pr-[100px] rounded-[12px] border-[0.6px] border-[#00000080] bg-[#F9F9F9]"
                                    style={{
                                        boxShadow: " 0px 11px 53.8px 4px rgba(81, 69, 55, 0.05)"
                                    }}
                                />
                                <div className="absolute top-[28px] right-2 text-[18px] text-[#00000080] hover:cursor-pointer" onClick={async () => {
                                    try {
                                        if (sendEmailOtpText === "Verify OTP") {
                                            setSendEmailOtpText("Sending");
                                            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/verifyEmail`, {
                                                method: "POST",
                                                body: JSON.stringify({
                                                    email,
                                                    otp: emailOtp
                                                }),
                                                headers: {
                                                    "Content-type": "application/json; charset=UTF-8"
                                                }
                                            });
                                            const y = await x.json();
                                            if (y.success) {
                                                setIsEmailOtpVerified(true);
                                                setSendEmailOtpText("OTP Verified");
                                            }
                                            else {
                                                setSendEmailOtpText("Verify OTP");
                                                enqueueSnackbar(y.err, {
                                                    variant: "error"
                                                });
                                            }
                                        }
                                    }
                                    catch (err) {
                                        console.log(err);
                                    }
                                }}>{sendEmailOtpText}</div>
                            </div>
                        </>
                    )
                }
                {
                    !isPhoneOtpSent && (
                        <>
                            <p className="mt-[42px] text-xl">Mobile number <span className="text-[#B73636]">*</span></p>
                            <div className="relative">
                                <input
                                    type="text"
                                    onChange={e => setPhoneNo(e.target.value)}
                                    value={phoneNo}
                                    placeholder="+91 (Enter 10 digit phone number)"
                                    className="mt-[18px] mb-[5px] w-full py-[12px] pl-5 pr-[100px] rounded-[12px] border-[0.6px] border-[#00000080] bg-[#F9F9F9]"
                                    style={{
                                        boxShadow: " 0px 11px 53.8px 4px rgba(81, 69, 55, 0.05)"
                                    }}
                                />
                                <div className="absolute top-[28px] right-2 text-[18px] text-[#00000080] hover:cursor-pointer" onClick={async () => {
                                    try {
                                        if (sendPhoneOtpText === "Send OTP") {
                                            setSendPhoneOtpText("Sending");
                                            /*
                                            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/sendVerificationEmail`, {
                                                method: "POST",
                                                body: JSON.stringify({
                                                    email
                                                }),
                                                headers: {
                                                    "Content-type": "application/json; charset=UTF-8"
                                                }
                                            });
                                            const y = await x.json();
                                            */
                                            if (true) {
                                                setIsPhoneOtpSent(true);
                                                setSendPhoneOtpText("Verify");
                                            }
                                            else {
                                                setSendPhoneOtpText("Send OTP");
                                                enqueueSnackbar(y.err, {
                                                    variant: "error"
                                                });
                                            }
                                        }
                                    }
                                    catch (err) {
                                        console.log(err);
                                    }
                                }}>{sendPhoneOtpText}</div>
                            </div>
                        </>
                    )
                }
                {
                    isPhoneOtpSent && (
                        <>
                            <p className="mt-[42px] text-xl">{isPhoneOtpVerified ? "Phone Number Verified" : "Enter OTP sent to phone"} <span className="text-[#B73636]">*</span></p>
                            <div className="relative">
                                <input
                                    type="number"
                                    onChange={e => setPhoneOtp(e.target.value)}
                                    value={phoneOtp}
                                    disabled={isPhoneOtpVerified}
                                    placeholder="Enter OTP"
                                    className="mt-[18px] mb-[5px] w-full py-[12px] pl-5 pr-[100px] rounded-[12px] border-[0.6px] border-[#00000080] bg-[#F9F9F9]"
                                    style={{
                                        boxShadow: " 0px 11px 53.8px 4px rgba(81, 69, 55, 0.05)"
                                    }}
                                />
                                <div className="absolute top-[28px] right-2 text-[18px] text-[#00000080] hover:cursor-pointer" onClick={async () => {
                                    try {
                                        const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/verifyPhone`, {
                                            method: "GET",
                                            headers: {
                                                "Content-type": "application/json; charset=UTF-8",
                                                "phonenumber": phoneNo,
                                                "otp": phoneOtp
                                            }
                                        });
                                        const y = await x.json();
                                        if (y.success) {
                                            setIsPhoneOtpVerified(true);
                                            setSendPhoneOtpText("Verified");
                                            setPhoneNumber(phoneNo);
                                        }
                                        else {
                                            setIsPhoneOtpVerified(false);
                                            setSendPhoneOtpText("Verify");
                                            enqueueSnackbar(y.err, {
                                                variant: "error"
                                            });
                                        }
                                    }
                                    catch (err) {
                                        console.log(err);
                                    }
                                    //setIsPhoneOtpSent(true);
                                }}>{sendPhoneOtpText}</div>
                            </div>
                        </>
                    )
                }
                {
                    !panImagePreview && (
                        <>
                            <p className="mt-[42px] text-xl">Upload PAN image <span className="text-[#B73636]">*</span></p>
                            <input
                                type="file"
                                ref={panFileInputRef}
                                onChange={(e) => handleFileChange(e, setPanImagePreview)}
                                className="hidden"
                            />
                            <div className="mt-[24px] mb-[56px] h-[300px] w-full border !border-dashed rounded-[32px] flex flex-col flex-nowrap items-center justify-center gap-y-[5px]">
                                <Image src={Upload} alt="upload" className="lg:w-[12%] xl:w-[10%] 2xl:w-[9%] h-[15%]" />
                                <p className="text-xl font-medium">Drag and drop image here</p>
                                <p className="text-xl font-medium">or</p>
                                <button className="relative py-[16px] px-[125px] rounded-[16px] text-white bg-[#FEA355] text-xl font-medium" onClick={handlePanButtonClick}>
                                    Browse files
                                    <Image src={UploadFile} alt="file-upload" className="w-[30px] h-[30px] absolute top-[13px] right-[20%]" />
                                </button>
                            </div>
                        </>
                    )
                }
                {
                    panImagePreview && (
                        <>
                            <p className="mt-[42px] text-xl">PAN image <span className="text-[#B73636]">*</span></p>
                            <div className="mt-[24px] mb-[56px] h-[300px] w-[60%] border !border-dashed rounded-[32px] default-background-svg" style={{
                                backgroundImage: `url(${panImagePreview})`
                            }}>
                            </div>
                        </>
                    )
                }
                <p className="mt-[42px] text-xl">Enter GSTIN <span className="text-[#ADA6A6]">(optional)</span></p>
                <input
                    type="text"
                    value={gst}
                    onChange={e => setGst(e.target.value)}
                    placeholder="15 digit GST number"
                    className="mt-[18px] mb-[5px] w-full py-[12px] pl-5 pr-5 rounded-[12px] border-[0.6px] border-[#00000080] bg-[#F9F9F9]"
                    style={{
                        boxShadow: " 0px 11px 53.8px 4px rgba(81, 69, 55, 0.05)"
                    }}
                />
                <button className="bg-[#FE9135] rounded-[24px] w-full py-[25px] text-xl mt-[20px] text-white" onClick={handleFormSubmit}>Save and Continue</button>
            </aside>
        </section>
        <section className="relative mt-[50px] lg:hidden pr-[5%]">
            <aside className="absolute h-[600px] w-[100vw] left-0 z-0" id="seller-register-personal-info-form-hero">
            </aside>
            <aside className="absolute w-[90vw] h-fit z-10 top-[450px] left-[5vw] rounded-tl-[24px] rounded-tr-[24px] bg-white py-[36px] px-[16px]" style={{
                boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
            }}>
                <p className={`${lbFont.className} text-2xl mb-[32px] text-center font-medium`}>Add Personal Info</p>
                {
                    !isEmailOtpSent && (
                        <>
                            <p className="mb-[16px] text-[15px]">Enter Email ID <span className="text-[#B63636]">*</span></p>
                            <div className="relative">
                                <input
                                    type="email"
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                    placeholder="Enter email here"
                                    className="text-sm rounded-[12px] pl-[12px] py-[16px] pr-[100px] w-full bg-[#F9F9F9] border-[0.6px] border-[#00000080]"
                                    style={{
                                        boxShadow: "0px 11px 53.8px 4px rgba(81, 69, 55, 0.05)"
                                    }}
                                />
                                <div className="absolute top-[16px] right-2 text-[#00000080] hover:cursor-pointer" onClick={async () => {
                                    try {
                                        if (sendEmailOtpText === "Send OTP") {
                                            setSendEmailOtpText("Sending");
                                            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/sendVerificationEmail`, {
                                                method: "POST",
                                                body: JSON.stringify({
                                                    email
                                                }),
                                                headers: {
                                                    "Content-type": "application/json; charset=UTF-8"
                                                }
                                            });
                                            const y = await x.json();
                                            if (y.success) {
                                                setIsEmailOtpSent(true);
                                                setSendEmailOtpText("Verify OTP");
                                            }
                                            else {
                                                setSendEmailOtpText("Send OTP");
                                                enqueueSnackbar(y.err, {
                                                    variant: "error"
                                                });
                                            }
                                        }
                                    }
                                    catch (err) {
                                        console.log(err);
                                    }
                                }}>{sendEmailOtpText}</div>
                            </div>
                        </>
                    )
                }
                {
                    isEmailOtpSent && (
                        <>
                            <p className="mb-[16px] text-[15px]">{isEmailOtpVerified ? "Email Verified" : "Enter OTP sent to email"}<span className="text-[#B63636]">*</span></p>
                            <div className="relative">
                                <input
                                    type="number"
                                    onChange={e => setEmailOtp(e.target.value)}
                                    value={emailOtp}
                                    disabled={isEmailOtpVerified}
                                    placeholder="Enter OTP"
                                    className="text-sm rounded-[12px] pl-[12px] py-[16px] pr-[100px] w-full bg-[#F9F9F9] border-[0.6px] border-[#00000080]"
                                    style={{
                                        boxShadow: "0px 11px 53.8px 4px rgba(81, 69, 55, 0.05)"
                                    }}
                                />
                                <div className="absolute top-[16px] right-2 text-[#00000080] hover:cursor-pointer" onClick={async () => {
                                    try {
                                        if (sendEmailOtpText === "Verify OTP") {
                                            setSendEmailOtpText("Sending");
                                            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/verifyEmail`, {
                                                method: "POST",
                                                body: JSON.stringify({
                                                    email,
                                                    otp: emailOtp
                                                }),
                                                headers: {
                                                    "Content-type": "application/json; charset=UTF-8"
                                                }
                                            });
                                            const y = await x.json();
                                            if (y.success) {
                                                setIsEmailOtpVerified(true);
                                                setSendEmailOtpText("OTP Verified");
                                            }
                                            else {
                                                setSendEmailOtpText("Verify OTP");
                                                enqueueSnackbar(y.err, {
                                                    variant: "error"
                                                });
                                            }
                                        }
                                    }
                                    catch (err) {
                                        console.log(err);
                                    }
                                }}>{sendEmailOtpText}</div>
                            </div>
                        </>
                    )
                }
                {
                    !isPhoneOtpSent && (
                        <>
                            <p className="mb-[16px] text-[15px] mt-[24px]">Mobile Number <span className="text-[#B63636]">*</span></p>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="+91"
                                    onChange={e => setPhoneNo(e.target.value)}
                                    value={phoneNo}
                                    className="text-sm rounded-[12px] pl-[12px] py-[16px] pr-[100px] w-full bg-[#F9F9F9] border-[0.6px] border-[#00000080]"
                                    style={{
                                        boxShadow: "0px 11px 53.8px 4px rgba(81, 69, 55, 0.05)"
                                    }}
                                />
                                <div className="absolute top-[16px] right-2 text-[#00000080] hover:cursor-pointer" onClick={async () => {
                                    try {
                                        if (sendPhoneOtpText === "Send OTP") {
                                            setSendPhoneOtpText("Sending");
                                            /*
                                            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/sendVerificationEmail`, {
                                                method: "POST",
                                                body: JSON.stringify({
                                                    email
                                                }),
                                                headers: {
                                                    "Content-type": "application/json; charset=UTF-8"
                                                }
                                            });
                                            const y = await x.json();
                                            */
                                            if (true) {
                                                setIsPhoneOtpSent(true);
                                                setSendPhoneOtpText("Verify");
                                            }
                                            else {
                                                setSendPhoneOtpText("Send OTP");
                                                enqueueSnackbar(y.err, {
                                                    variant: "error"
                                                });
                                            }
                                        }
                                    }
                                    catch (err) {
                                        console.log(err);
                                    }
                                }}>{sendPhoneOtpText}</div>
                            </div>
                        </>
                    )
                }
                {
                    isPhoneOtpSent && (
                        <>
                            <p className="mb-[16px] text-[15px] mt-[24px]">{isPhoneOtpVerified ? "Phone Number Verified" : "Enter OTP sent to phone"} <span className="text-[#B73636]">*</span></p>
                            <div className="relative">
                                <input
                                    type="number"
                                    onChange={e => setPhoneOtp(e.target.value)}
                                    value={phoneOtp}
                                    disabled={isPhoneOtpVerified}
                                    placeholder="Enter OTP"
                                    className="text-sm rounded-[12px] pl-[12px] py-[16px] pr-[100px] w-full bg-[#F9F9F9] border-[0.6px] border-[#00000080]"
                                    style={{
                                        boxShadow: " 0px 11px 53.8px 4px rgba(81, 69, 55, 0.05)"
                                    }}
                                />
                                <div className="absolute top-[16px] right-2 text-[#00000080] hover:cursor-pointer" onClick={async () => {
                                    try {
                                        const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/verifyPhone`, {
                                            method: "GET",
                                            headers: {
                                                "Content-type": "application/json; charset=UTF-8",
                                                "phonenumber": phoneNo,
                                                "otp": phoneOtp
                                            }
                                        });
                                        const y = await x.json();
                                        if (y.success) {
                                            setIsPhoneOtpVerified(true);
                                            setSendPhoneOtpText("Verified");
                                            setPhoneNumber(phoneNo);
                                        }
                                        else {
                                            setIsPhoneOtpVerified(false);
                                            setSendPhoneOtpText("Verify");
                                            enqueueSnackbar(y.err, {
                                                variant: "error"
                                            });
                                        }
                                    }
                                    catch (err) {
                                        console.log(err);
                                    }
                                    //setIsPhoneOtpSent(true);
                                }}>{sendPhoneOtpText}</div>
                            </div>
                        </>
                    )
                }
                {
                    !panImagePreview && (
                        <>
                            <p className="text-[15px] mt-[24px]">Upload PAN image <span className="text-[#B63636]">*</span></p>
                            <input
                                type="file"
                                ref={panFileInputRef}
                                onChange={(e) => handleFileChange(e, setPanImagePreview)}
                                className="hidden"
                            />
                            <div className="mt-[24px] h-[240px] w-full border !border-dashed rounded-[32px] flex flex-col flex-nowrap items-center justify-center gap-y-[25px]">
                                <Image src={Upload} alt="upload" className="w-[18%] min-[440px]:w-[17%] min-[500px]:w-[16%] h-[15%]" />
                                <button className="py-[16px] w-[90%] rounded-[16px] text-white bg-[#FEA355] font-medium flex flex-row flex-nowrap items-center justify-center gap-x-[10%]" onClick={handlePanButtonClick}>
                                    Browse files
                                    <Image src={UploadFile} alt="file-upload" className="w-[30px] h-[30px]" />
                                </button>
                            </div>
                        </>
                    )
                }
                {
                    panImagePreview && (
                        <>
                            <p className="text-[15px] mt-[24px]">PAN image <span className="text-[#B63636]">*</span></p>
                            <div className="mt-[24px] h-[300px] w-full border !border-dashed rounded-[32px] default-background-svg" style={{
                                backgroundImage: `url(${panImagePreview})`
                            }}>
                            </div>
                        </>
                    )
                }
                <p className="text-[15px] mt-[24px] mb-[16px]">Enter GSTIN <span className="text-[#ADA6A6]">(optional)</span></p>
                <input
                    type="text"
                    onChange={e => setGst(e.target.value)}
                    value={gst}
                    placeholder="15 digit GST number"
                    className="text-sm rounded-[12px] pl-[12px] py-[16px] pr-[100px] w-full bg-[#F9F9F9] border-[0.6px] border-[#00000080]"
                    style={{
                        boxShadow: " 0px 11px 53.8px 4px rgba(81, 69, 55, 0.05)"
                    }}
                />
                <button className="mt-[32px] rounded-[12px] text-white font-semibold bg-[#FE9135] w-full h-[48px]">Save and Continue</button>
            </aside>
        </section >
    </>
}