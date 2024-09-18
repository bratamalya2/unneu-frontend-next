"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

import { useUnneuDataStore } from "@/store/store";

import States from "./stateOfIndia.json";

import UpArrow from "@/../public/up-arrow.png";
import DownArrow from "@/../public/down-arrow.png";

import "@/styles/sellerPickupForm.css";

export default function SellerPickupForm() {
    const router = useRouter();
    const sellerProfilePhoto = useUnneuDataStore(store => store.sellerProfilePhoto);
    const sellerCoverPhoto = useUnneuDataStore(store => store.sellerCoverPhoto);
    const sellerPhoneNumber = useUnneuDataStore(store => store.phoneNumber);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [fullName, setFullName] = useState("");
    const [storeName, setStoreName] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [contactPhoneNumber, setContactPhoneNumber] = useState("");
    const [pincode, setPincode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState(States[0]);
    const [storeDescription, setStoreDescription] = useState("");

    const handleAddressSubmit = () => {
        if (address.length === 0)
            enqueueSnackbar("Please enter a valid address!", {
                variant: "error"
            });
        else if (contactPhoneNumber.length !== 10)
            enqueueSnackbar("Please enter a valid 10 digit contact number!", {
                variant: "error"
            });
        else if (pincode.length === 0)
            enqueueSnackbar("Please enter a valid pincode!", {
                variant: "error"
            });
        else if (city.length === 0)
            enqueueSnackbar("Please enter a valid city name!", {
                variant: "error"
            });
        else
            setShowAddressForm(false);
    };

    const handleFormSubmit = async () => {
        try {
            if (fullName.length === 0)
                enqueueSnackbar("Please provide your full name!", {
                    variant: "error"
                });
            else if (storeName.length === 0)
                enqueueSnackbar("Please provide your store name!", {
                    variant: "error"
                });
            else if (gender.length === 0)
                enqueueSnackbar("Please select your gender!", {
                    variant: "error"
                });
            else if (address.length > 0 && contactPhoneNumber.length === 10 && pincode.length > 0 && city.length > 0) {
                //submit form
                const formdata = new FormData();
                formdata.append("profilePhoto", sellerProfilePhoto);
                formdata.append("coverPhoto", sellerCoverPhoto);
                formdata.append("phoneNumber", sellerPhoneNumber);
                formdata.append("fullName", fullName);
                formdata.append("storeName", storeName);
                formdata.append("gender", gender);
                formdata.append("address", address);
                formdata.append("contactPhoneNumber", contactPhoneNumber);
                formdata.append("pincode", pincode);
                formdata.append("city", city);
                formdata.append("state", state);
                formdata.append("storeDescription", storeDescription);
                const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/register/2`, {
                    method: "POST",
                    body: formdata
                });
                const y = await x.json();
                if (y.success)
                    router.push("/seller/register/3");
                else
                    enqueueSnackbar(y.err, {
                        variant: "error"
                    });
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    return <section className="mt-[110px] lg:mt-[250px] pl-[10%] lg:pl-[25%] pr-[10%] lg:pr-[5%] flex flex-col flex-nowrap">
        <p className="text-[15px] lg:text-xl font-medium">Enter full name <span className="text-[#B73636]">*</span></p>
        <input
            type="text"
            className="mt-[16px] lg:mt-[24px] border-[0.6px] border-[#00000080] bg-[#F9F9F9] rounded-[12px] h-[55px] lg:h-[64px] w-full lg:w-[60%] px-3"
            style={{
                boxShadow: "0px 11px 53.8px 4px rgba(81, 69, 55, 0.05)"
            }}
            value={fullName}
            onChange={e => setFullName(e.target.value)}
        />
        <p className="text-[15px] lg:text-xl font-medium mt-[21px] lg:mt-[42px]">Enter store name <span className="text-[#B73636]">*</span></p>
        <input
            type="text"
            className="mt-[16px] lg:mt-[24px] border-[0.6px] border-[#00000080] bg-[#F9F9F9] rounded-[12px] h-[55px] lg:h-[64px] w-full lg:w-[60%] px-3"
            style={{
                boxShadow: "0px 11px 53.8px 4px rgba(81, 69, 55, 0.05)"
            }}
            value={storeName}
            onChange={e => setStoreName(e.target.value)}
        />
        <p className="text-[15px] lg:text-xl font-medium mt-[21px] lg:mt-[42px]">Gender <span className="text-[#B73636]">*</span></p>
        <div className="mt-[21px] lg:mt-[42px] flex flex-row flex-nowrap items-center text-xl gap-x-4 lg:gap-x-7">
            <div className="flex flex-row flex-nowrap items-center">
                <input type="radio" id="male" name="gender" value="Male" className="mr-[13px] h-[16px] w-[16px] local-custom-radio" onClick={() => setGender("Male")} />
                <label htmlFor="male" className="text-[15px] lg:text-base">Male</label>
            </div>
            <div className="flex flex-row flex-nowrap items-center">
                <input type="radio" id="female" name="gender" value="Female" className="mr-[13px] h-[16px] w-[16px] local-custom-radio" onClick={() => setGender("Female")} />
                <label htmlFor="female" className="text-[15px] lg:text-base">Female</label>
            </div>
            <div className="flex flex-row flex-nowrap items-center">
                <input type="radio" id="other" name="gender" value="Other" className="mr-[13px] h-[16px] w-[16px] local-custom-radio" onClick={() => setGender("Other")} />
                <label htmlFor="other" className="text-[15px] lg:text-base">Other</label>
            </div>
        </div>
        <p className="text-xl lg:text-[26px] font-medium mt-[35px] lg:mt-[48px]">Store & Pick up details <span className="text-[#B73636]">*</span></p>
        <div className="w-full lg:w-[60%] border border-[#CACACA] rounded-[24px] p-[16px] mt-[24px] lg:mt-[55px]">
            <div className="lg:my-[29px] lg:mx-[25px] flex flex-row flex-nowrap items-center justify-between">
                <div className="text-[15px] lg:text-xl font-medium">Add a new pickup address</div>
                <Image src={showAddressForm ? UpArrow : DownArrow} alt={showAddressForm ? "hide" : "show"} className="w-[18px] h-[8px] hover:cursor-pointer" onClick={() => {
                    setShowAddressForm(x => !x);
                }} />
            </div>
            {showAddressForm && <div className="lg:mx-[25px]">
                <p className="mt-[25px] lg:mt-[36px] font-medium text-[15px] lg:text-base">Address <span className="text-[#B73636]">*</span></p>
                <input
                    type="text"
                    className="mt-[12px] rounded-[12px] border-[0.6px] border-[#00000080] bg-[#F9F9F9] h-[52px] w-full px-3" style={{
                        boxShadow: "0px 11px 53.8px 4px rgba(81, 69, 55, 0.05)"
                    }}
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
                <p className="mt-[10px] lg:mt-[20px] font-medium text-[15px] lg:text-base">Phone No. <span className="text-[#B73636]">*</span></p>
                <input
                    type="text"
                    className="mt-[12px] rounded-[12px] border-[0.6px] border-[#00000080] bg-[#F9F9F9] h-[52px] w-full px-3" style={{
                        boxShadow: "0px 11px 53.8px 4px rgba(81, 69, 55, 0.05)"
                    }}
                    placeholder="+9194XXXXXXXX"
                    value={contactPhoneNumber}
                    onChange={e => setContactPhoneNumber(e.target.value)}
                />
                <p className="mt-[10px] lg:mt-[20px] font-medium text-[15px] lg:text-base">Pincode <span className="text-[#B73636]">*</span></p>
                <input
                    type="text"
                    className="mt-[12px] rounded-[12px] border-[0.6px] border-[#00000080] bg-[#F9F9F9] h-[52px] w-full px-3" style={{
                        boxShadow: "0px 11px 53.8px 4px rgba(81, 69, 55, 0.05)"
                    }}
                    placeholder="Enter Pincode"
                    value={pincode}
                    onChange={e => setPincode(e.target.value)}
                />
                <p className="mt-[10px] lg:mt-[20px] font-medium text-[15px] lg:text-base">City <span className="text-[#B73636]">*</span></p>
                <input
                    type="text"
                    className="mt-[12px] rounded-[12px] border-[0.6px] border-[#00000080] bg-[#F9F9F9] h-[52px] w-full px-3" style={{
                        boxShadow: "0px 11px 53.8px 4px rgba(81, 69, 55, 0.05)"
                    }}
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />
                <p className="mt-[10px] lg:mt-[20px] font-medium text-[15px] lg:text-base">State <span className="text-[#B73636]">*</span></p>
                <select name="state" id="state" className="mt-[12px] rounded-[12px] border-[0.6px] border-[#00000080] bg-[#F9F9F9] h-[52px] w-full px-3 custom-select" onChange={e => {
                    setState(e.target.value);
                }}>
                    {
                        States.map((s, i) => (
                            <option key={i} value={s}>{s}</option>
                        ))
                    }
                </select>
                <div className="mt-[36px] mb-[36px] lg:mb-[60px] flex flex-row items-center justify-between w-full">
                    <button className="w-[110px] lg:w-[150px] text-[#5C5C5C] font-medium text-base lg:text-xl rounded-[12px] border-[0.6px] border-[#FE9135] py-[11px] px-[25px] lg:px-[39px]" onClick={() => {
                        setAddress("");
                        setContactPhoneNumber("");
                        setPincode("");
                        setCity("");
                        setState(States[0]);
                        setShowAddressForm(false);
                    }}>Cancel</button>
                    <button className="w-[110px] lg:w-[150px] text-white font-medium text-base lg:text-xl rounded-[12px] bg-[#FE9135] border-[0.6px] border-[#FE9135] py-[11px] px-[25px] lg:px-[39px]" onClick={handleAddressSubmit}>Save</button>
                </div>
            </div>}
        </div>
        <p className="mt-[30px] lg:mt-[56px] mb-[18px] lg:text-xl font-medium text-[15px]">Enter store description </p>
        <textarea className="h-[196px] w-full lg:w-[60%] bg-[#ECECEC] rounded-[24px] py-[18px] px-[15px] lg:px-[27px]" placeholder="Welcome to our pre-owned saree store!....." value={storeDescription} onChange={e => {
            setStoreDescription(e.target.value);
        }} />
        <button className="mt-[24px] lg:mt-[57px] w-full lg:w-[60%] py-[12px] lg:py-[25px] bg-[#FE9135] rounded-[24px] text-lg lg:text-xl text-white font-medium" onClick={handleFormSubmit}>Save and Continue</button>
    </section>
}