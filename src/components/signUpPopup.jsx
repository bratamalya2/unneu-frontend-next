"use client";

import { Libre_Baskerville } from "next/font/google";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Modal from "react-bootstrap/Modal";

import { useUnneuDataStore } from "@/store/store";

import LeftLeaf from "@/../public/signup-left-leaf.png";
import RightLeaf from "@/../public/signup-right-leaf.png";
import CloseIcon from "@/../public/close.png";

import "@/styles/signUpPopup.css";

const libreBaskerville = Libre_Baskerville({
    subsets: ["latin"],
    weight: ["400", "700"]
});

export default function SignUpPopup({ showSignUp, hideSignUp }) {
    const router = useRouter();
    const [isSellerSelected, setIsSellerSelected] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(null);
    const [timerObj, setTimerObj] = useState(null);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const setJwtToken = useUnneuDataStore(store => store.setJwtToken);
    const setRefreshToken = useUnneuDataStore(store => store.setRefreshToken);
    const setBuyerSelected = useUnneuDataStore(store => store.setBuyerSelected);
    const setSellerSelected = useUnneuDataStore(store => store.setSellerSelected);

    const submitOTP = async () => {
        try {
            if (otp.length === 6) {
                const x = await fetch(`${process.env.BACKEND_URL}\login`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify({
                        phoneNumber,
                        otp
                    })
                });
                const y = await x.json();
                if (!y.success) {
                    setShowError(true);
                    setErrorMessage(y.err);
                    setTimeout(() => {
                        setShowError(false);
                    }, 3000);
                }
                else {
                    setJwtToken(y.jwtToken);
                    setRefreshToken(y.refreshToken);
                    if (isSellerSelected)
                        router.push("/seller/home");
                    else
                        router.push("/buyer/home");
                }
            }
            else {
                setShowError(true);
                setErrorMessage("Enter a 6 digit OTP!");
                setTimeout(() => {
                    setShowError(false);
                }, 3000);
            }
            setTimeout(() => {
                hideSignUp();
            }, 3000);
        }
        catch (err) {
            console.log(err);
        }
    };

    const resendOTP = () => {
        if (timer === 0) {
            setTimerObj(null);
            setIsOTPSent(false);
            setTimeout(() => {
                setIsOTPSent(true);
            }, 1000);
            //send OTP; communicate with backend
        }
    };

    useEffect(() => {
        if (!showSignUp) {
            clearInterval(timerObj);
            setTimer(null);
            setTimerObj(null);
            setPhoneNumber("");
            setIsOTPSent(false);
            setOtp("");
        };
    }, [showSignUp, timerObj]);

    useEffect(() => {
        if (isOTPSent) {
            if (!timerObj) {
                setTimer(60);
                setTimerObj(setInterval(() => {
                    setTimer(x => {
                        if (x > 0)
                            return x - 1;
                        else
                            return x;
                    });
                }, 1000));
            }
        }
    }, [isOTPSent, timerObj]);

    useEffect(() => {
        if (timer === 0) {
            clearInterval(timerObj);
            setTimerObj(null);
        }
    }, [timer, timerObj]);

    useEffect(() => {
        if (isSellerSelected) {
            setSellerSelected();
        }
        else {
            setBuyerSelected();
        }
    }, [isSellerSelected, setBuyerSelected, setSellerSelected]);

    return <>
        <Modal show={showSignUp} onHide={hideSignUp} className="mt-[20px]">
            <Modal.Body className="flex flex-row flex-nowrap justify-center sm:justify-start rounded-[32px] h-[700px] sm:h-[600px] md:h-[640px] lg:h-[750px] p-0">
                <div className="hidden sm:inline-block w-[35%] h-full rounded-tl-[32px] rounded-bl-[32px]" id="signup-popup-side-img-container"></div>
                <div className="relative flex flex-col items-center h-full w-full sm:w-[65%]">
                    <Image src={CloseIcon} alt="close" className="w-[20px] h-[20px] absolute top-5 right-5" onClick={hideSignUp} />
                    <p className={`${libreBaskerville.className} text-2xl text-[32px] text-[#4C4C4C] sm:hidden md:block ${isOTPSent ? "mt-[25px] mb-4" : "mt-[65px] mb-8"}`}>Sign up</p>
                    <div className={`flex flex-row flex-nowrap items-center justify-center ${libreBaskerville.className} text-[20px] lg:text-2xl mt-8`}>
                        <div
                            className={`py-[9px] sm:py-[6px] lg:py-[10px] px-[25px] lg:px-[25px] rounded-tl-[8px] rounded-bl-[8px] ${isSellerSelected ? "bg-[#E05F1D] text-white border-y-2 border-l-2 border-[#E05F1D]" : "bg-white text-[#4C4C4C] border-y-2 border-l-2 border-[#CECECE]"}`}
                            onClick={() => setIsSellerSelected(true)}
                        >
                            Seller
                        </div>
                        <div
                            className={`py-[9px] sm:py-[6px] lg:py-[10px] px-[25px] lg:px-[25px] rounded-tr-[8px] rounded-br-[8px] ${!isSellerSelected ? "bg-[#E05F1D] text-white border-y-2 border-r-2 border-[#E05F1D]" : "bg-white text-[#4C4C4C] border-y-2 border-r-2 border-[#CECECE]"}`}
                            onClick={() => setIsSellerSelected(false)}
                        >
                            Buyer
                        </div>
                    </div>
                    <p className={`${libreBaskerville.className} text-2xl uppercase ${!isOTPSent ? "xl:mt-12 mt-4 mb-2" : "mt-6 sm:mt-4 mb-2"}`}>{isSellerSelected ? "For Reseller" : "For Buyer"}</p>
                    {
                        isSellerSelected ? (
                            <>
                                <p className="text-2xl lg:text-4xl font-light uppercase mt-3 mb-2 lg:my-3">
                                    GET <span className="font-semibold text-[#FE9135]">RS 100 /- </span> EXTRA
                                </p>
                                <p className="text-[15px] font-light">on selling your first item.</p>
                            </>
                        ) : (
                            <>
                                <p className="text-2xl lg:text-4xl font-light uppercase mt-3 mb-2 sm:mt-1 sm:mb-1 lg:my-3">
                                    GET <span className="font-semibold text-[#FE9135]">RS 100 /- </span> OFF
                                </p>
                                <p className="text-[15px] font-light">on your first purchase.</p>
                            </>
                        )
                    }
                    {
                        isSellerSelected && (
                            <button className="bg-[#FE9135] text-white uppercase font-semibold text-xl py-[12px] px-[50px] rounded-[16px] mt-[80px] sm:mt-[50px] mb-[30px]" onClick={() => {
                                router.push("/seller/home");
                                hideSignUp();
                            }}>
                                start selling
                            </button>
                        )
                    }
                    {
                        !isSellerSelected && (
                            <>
                                <p className="text-[#646464] font-medium self-start ml-[46px] min-[500px]:ml-[50px] min-[550px]:ml-[55px] min-[600px]:ml-[60px] sm:ml-[45px] min-[670px]:ml-[50px] md:ml-[55px] min-[830px]:ml-[60px] min-[880px]:ml-[65px] min-[900px]:ml-[70px] min-[1045px]:ml-[75px] min-[1125px]:ml-[80px] min-[1250px]:ml-[90px] min-[1400px]:ml-[100px] min-[1600px]:ml-[110px] min-[1700px]:ml-[115px] min-[1800px]:ml-[120px] mt-10 sm:mt-5">
                                    Enter phone number
                                </p>
                                <input
                                    type="text"
                                    className="bg-[#F0F0F0] rounded-[12px] w-[80%] py-[10px] px-[12px] my-2 sm:ml-2 max-w-[100%]"
                                    placeholder="+91 94XXXXXXXX"
                                    style={{
                                        boxShadow: "0px 11px 40px 4px rgba(81, 69, 55, 0.05)"
                                    }}
                                    onChange={e => setPhoneNumber(e.target.value)}
                                    value={phoneNumber}
                                />
                            </>
                        )
                    }
                    {
                        !isOTPSent && !isSellerSelected && (
                            <button className="relative left-0 sm:left-2 w-[80%] rounded-[16px] text-white bg-[#FE9135] py-[10px] sm:py-[5px] lg:py-[12px] text-[20px] font-semibold my-2" onClick={() => {
                                setIsOTPSent(true);
                            }}>Verify</button>
                        )
                    }
                    {
                        isOTPSent && !isSellerSelected && (
                            <>
                                <input
                                    type="number"
                                    className="bg-[#F0F0F0] rounded-[12px] w-[80%] sm:ml-2 py-[10px] px-[16px] my-2"
                                    style={{
                                        boxShadow: "0px 11px 40px 4px rgba(81, 69, 55, 0.05)"
                                    }}
                                    placeholder="OTP"
                                    onChange={e => setOtp(e.target.value)}
                                    value={otp}
                                />
                                <button className="relative left-0 sm:left-2 w-[80%] rounded-[16px] text-white bg-[#FE9135] py-[10px] text-[20px] font-semibold my-3 sm:my-2" onClick={submitOTP}>
                                    Verify OTP
                                </button>
                            </>
                        )
                    }
                    {
                        showError && !isSellerSelected && (
                            <p className="text-[#8F8F8F] text-[14px] text-red-500 font-bold text-center my-2 sm:my-0 lg:my-4">{errorMessage}</p>
                        )
                    }
                    {
                        isOTPSent && !isSellerSelected && (
                            <>
                                <p className="text-[#8F8F8F] text-[14px] lg:text-[18px] text-center">Didnt get OTP ? <span className={`text-[#6C6C6C] font-medium ${timer === 0 ? "hover:cursor-pointer" : "hover:cursor-wait"}`} onClick={resendOTP}>Resend</span> {
                                    timer > 0 && timer && (
                                        <span>
                                            OTP in <span className="text-red-500">{timer} seconds</span>
                                        </span>
                                    )}
                                </p>
                                <p className="text-xs mt-3 max-w-[96%] text-center mb-1">By selecting sign up, you agree to our terms of service and privacy policy</p>
                            </>
                        )
                    }
                    <div className="absolute flex flex-row flex-nowrap items-center justify-around w-full bottom-5">
                        <Image src={LeftLeaf} alt="left-leaf" className="w-[48%]" />
                        <Image src={RightLeaf} alt="right-leaf" className="w-[48%]" />
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </>
}