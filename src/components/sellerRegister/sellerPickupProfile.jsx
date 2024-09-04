"use client";

import { useState, useRef } from "react";
import { Libre_Baskerville } from "next/font/google";
import Image from "next/image";
import Modal from "react-bootstrap/Modal";

import { useUnneuDataStore } from "@/store/store";

import Camera from "@/../public/camera.png";
import Plus from "@/../public/plus-icon.svg";
import Upload from "@/../public/upload.png";
import UploadFile from "@/../public/upload file.png";

import "@/styles/sellerPickupProfile.css";

const lbFont = Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"] });

export default function SellerPickupProfile() {
    const setSellerProfilePhoto = useUnneuDataStore(store => store.setSellerProfilePhoto);
    const setSellerCoverPhoto = useUnneuDataStore(store => store.setSellerCoverPhoto);
    const [showCoverModal, setShowCoverModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [hoverProfileImage, setHoverProfileImage] = useState(false);
    const [coverImagePreview, setCoverImagePreview] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState(null);
    const coverFileInputRef = useRef(null);
    const profileFileInputRef = useRef(null);

    const handleCoverClose = () => setShowCoverModal(false);
    const handleCoverShow = () => setShowCoverModal(true);
    const handleProfileClose = () => setShowProfileModal(false);
    const handleProfileShow = () => setShowProfileModal(true);

    const handleCoverButtonClick = () => {
        coverFileInputRef.current.click();
    };

    const handleProfileButtonClick = () => {
        profileFileInputRef.current.click();
    };

    const handleFileChange = (event, setImagePreview, setImage, closeModal) => {
        if (event.target.files.length > 0) {
            if (event.target.files[0].type.split("/")[0] !== "image") {
                setImagePreview(null);
                setImage(null);
            }
            else {
                const file = event.target.files[0];
                setImage(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result);
                };
                reader.readAsDataURL(file);
            }
        } else {
            setImagePreview(null);
            setImage(null);
        }
        closeModal();
    };

    return <section className="mt-[105px] px-[5%]">
        <p className={`${lbFont.className} text-4xl`}>Seller & pickup information</p>
        <p className="text-2xl mt-[22px]">Set up profile photo</p>
        <div className={`relative mt-[16px] w-full h-[254px] z-0 default-background-svg ${!coverImagePreview ? "default-cover-photo" : ""}`} style={{
            backgroundImage: coverImagePreview && `url(${coverImagePreview})`
        }}>
            <div className="right-4 bottom-5 absolute rounded-[16px] px-[22px] py-[14px] gap-x-[8px] flex justify-between items-center text-[18px] bg-white hover:cursor-pointer" onClick={handleCoverShow}>
                <Image src={Camera} alt="change cover" className="w-[31px] h-[27px]" />
                <div>Edit cover photo</div>
            </div>
            <div className={`absolute ${hoverProfileImage ? "opacity-50" : "opacity-100"} default-background-svg ${!profileImagePreview ? "default-profile-photo" : ""} w-[200px] h-[200px] rounded-[200px] bottom-[-100px] left-[43%] z-10 hover:cursor-pointer`} onMouseEnter={() => {
                setHoverProfileImage(true);
            }} onMouseLeave={() => {
                setHoverProfileImage(false);
            }} onClick={handleProfileShow}
                style={{
                    backgroundImage: profileImagePreview && `url(${profileImagePreview})`
                }}
            >
                <Image src={Plus} alt="modify" className={`absolute ${hoverProfileImage ? "opacity-100" : "opacity-0"} top-[40%] left-[37%]`} />
                <div className="absolute bg-stone-200 w-[58px] h-[58px] rounded-[58px] bottom-2 right-2 z-20">
                    <Image src={Camera} alt="change photo" className="absolute top-[15px] left-[13px] w-[31px] h-[27px]" />
                </div>
            </div>
        </div>
        <Modal show={showCoverModal} onHide={handleCoverClose} className="mt-[90px]">
            <Modal.Body className="px-[10%]">
                <p className="mt-[56px] font-semibold text-2xl">Upload cover image</p>
                <div className="mt-[24px] mb-[56px] h-[400px] w-full border !border-dashed rounded-[32px] flex flex-col flex-nowrap items-center justify-center gap-y-[28px]">
                    <Image src={Upload} alt="upload" className="w-[20%] h-[20%]" />
                    <p className="text-xl font-medium">Drag and drop image here</p>
                    <p className="text-xl font-medium">or</p>
                    <button className="relative py-[16px] px-[125px] rounded-[16px] text-white bg-[#FEA355] text-xl font-medium" onClick={handleCoverButtonClick}>
                        Browse files
                        <Image src={UploadFile} alt="file-upload" className="w-[30px] h-[30px] absolute top-[13px] right-[20%]" />
                    </button>
                </div>
                <input
                    type="file"
                    name="myfile"
                    className="hidden"
                    ref={coverFileInputRef}
                    onChange={(e) => handleFileChange(e, setCoverImagePreview, setSellerCoverPhoto, handleCoverClose)}
                />
            </Modal.Body>
        </Modal>
        <Modal show={showProfileModal} onHide={handleProfileClose} className="mt-[90px]">
            <Modal.Body className="px-[10%]">
                <p className="mt-[56px] font-semibold text-2xl">Upload profile photo</p>
                <div className="mt-[24px] mb-[56px] h-[400px] w-full border !border-dashed rounded-[32px] flex flex-col flex-nowrap items-center justify-center gap-y-[28px]">
                    <Image src={Upload} alt="upload" className="w-[20%] h-[20%]" />
                    <p className="text-xl font-medium">Drag and drop image here</p>
                    <p className="text-xl font-medium">or</p>
                    <button className="relative py-[16px] px-[125px] rounded-[16px] text-white bg-[#FEA355] text-xl font-medium" onClick={handleProfileButtonClick}>
                        Browse files
                        <Image src={UploadFile} alt="file-upload" className="w-[30px] h-[30px] absolute top-[13px] right-[20%]" />
                    </button>
                </div>
                <input
                    type="file"
                    name="myfile"
                    className="hidden"
                    ref={profileFileInputRef}
                    onChange={(e) => handleFileChange(e, setProfileImagePreview, setSellerProfilePhoto, handleProfileClose)}
                />
            </Modal.Body>
        </Modal>
    </section>
}