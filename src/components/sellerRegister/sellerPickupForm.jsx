"use client";

import { useState } from "react";
import Image from "next/image";

import States from "./stateOfIndia.json";

import UpArrow from "@/../public/up-arrow.png";
import DownArrow from "@/../public/down-arrow.png";

export default function SellerPickupForm() {
    const [showAddressForm, setShowAddressForm] = useState(false);

    return <section className="mt-[250px] pl-[25%] pr-[5%] flex flex-col flex-nowrap">
        <p className="text-xl font-medium">Enter full name <span className="text-[#B73636]">*</span></p>
        <input
            type="text"
            className="mt-[24px] border-[0.6px] border-[#00000080] bg-[#F9F9F9] rounded-[12px] h-[64px] w-[60%] px-3"
            style={{
                boxShadow: "0px 11px 53.8px 4px rgba(81, 69, 55, 0.05)"
            }}
        />
        <p className="text-xl font-medium mt-[42px]">Enter store name <span className="text-[#B73636]">*</span></p>
        <input
            type="text"
            className="mt-[24px] border-[0.6px] border-[#00000080] bg-[#F9F9F9] rounded-[12px] h-[64px] w-[60%] px-3"
            style={{
                boxShadow: "0px 11px 53.8px 4px rgba(81, 69, 55, 0.05)"
            }}
        />
        <p className="text-xl font-medium mt-[42px]">Gender <span className="text-[#B73636]">*</span></p>
        <div className="mt-[42px] flex flex-row flex-nowrap items-center text-xl gap-x-7">
            <div>
                <input type="radio" id="male" name="gender" value="Male" className="mr-[13px] h-[16px] w-[16px]" />
                <label htmlFor="male">Male</label>
            </div>
            <div>
                <input type="radio" id="female" name="gender" value="Female" className="mr-[13px] h-[16px] w-[16px]" />
                <label htmlFor="female">Female</label>
            </div>
            <div>
                <input type="radio" id="other" name="gender" value="Other" className="mr-[13px] h-[16px] w-[16px]" />
                <label htmlFor="other">Other</label>
            </div>
        </div>
        <p className="text-[26px] font-medium mt-[48px]">Store & Pick up details <span className="text-[#B73636]">*</span></p>
        <div className="w-[60%] border border-[#CACACA] rounded-[24px] p-[16px] mt-[55px]">
            <div className="my-[29px] mx-[25px] flex flex-row flex-nowrap items-center justify-between">
                <div className="text-xl font-medium">Add a new pickup address</div>
                <Image src={showAddressForm ? UpArrow : DownArrow} alt={showAddressForm ? "hide" : "show"} className="w-[18px] h-[8px]" onClick={() => {
                    setShowAddressForm(x => !x);
                }} />
            </div>
            {showAddressForm && <div className="mx-[25px]">
                <p className="mt-[36px] font-medium">Address <span className="text-[#B73636]">*</span></p>
                <input
                    type="text"
                    className="mt-[12px] rounded-[12px] border-[0.6px] border-[#00000080] bg-[#F9F9F9] h-[52px] w-full px-3" style={{
                        boxShadow: "0px 11px 53.8px 4px rgba(81, 69, 55, 0.05)"
                    }}
                />
                <p className="mt-[20px] font-medium">Phone No. <span className="text-[#B73636]">*</span></p>
                <input
                    type="text"
                    className="mt-[12px] rounded-[12px] border-[0.6px] border-[#00000080] bg-[#F9F9F9] h-[52px] w-full px-3" style={{
                        boxShadow: "0px 11px 53.8px 4px rgba(81, 69, 55, 0.05)"
                    }}
                    placeholder="+9194XXXXXXXX"
                />
                <p className="mt-[20px] font-medium">Pincode <span className="text-[#B73636]">*</span></p>
                <input
                    type="text"
                    className="mt-[12px] rounded-[12px] border-[0.6px] border-[#00000080] bg-[#F9F9F9] h-[52px] w-full px-3" style={{
                        boxShadow: "0px 11px 53.8px 4px rgba(81, 69, 55, 0.05)"
                    }}
                    placeholder="Enter Pincode"
                />
                <p className="mt-[20px] font-medium">City <span className="text-[#B73636]">*</span></p>
                <input
                    type="text"
                    className="mt-[12px] rounded-[12px] border-[0.6px] border-[#00000080] bg-[#F9F9F9] h-[52px] w-full px-3" style={{
                        boxShadow: "0px 11px 53.8px 4px rgba(81, 69, 55, 0.05)"
                    }}
                />
                <p className="mt-[20px] font-medium">State <span className="text-[#B73636]">*</span></p>
                <select name="state" id="state" className="mt-[12px] rounded-[12px] border-[0.6px] border-[#00000080] bg-[#F9F9F9] h-[52px] w-full px-3 custom-select">
                    {
                        States.map((s, i) => (
                            <option key={i} value={s}>{s}</option>
                        ))
                    }
                </select>
                <div className="mt-[36px] flex flex-row items-center justify-between w-full">
                    <button className="text-[#5C5C5C] font-medium text-xl rounded-[12px] border-[0.6px] border-[#FE9135] py-[11px] px-[39px]">Cancel</button>
                    <button className="w-[150px] text-white font-medium text-xl rounded-[12px] bg-[#FE9135] border-[0.6px] border-[#FE9135] py-[11px] px-[39px]">Save</button>
                </div>
            </div>}
        </div>
        <p className="mt-[56px] mb-[18px] text-xl font-medium">Enter store description </p>
        <textarea className="h-[196px] w-[60%] bg-[#ECECEC] rounded-[24px] py-[18px] px-[27px]" placeholder="Welcome to our pre-owned saree store!....." />
        <button className="mt-[57px] w-[60%] py-[25px] bg-[#FE9135] rounded-[24px] text-xl text-white font-medium">Save and Continue</button>
    </section>
}