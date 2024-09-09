"use client";

import { useState, useRef, useEffect } from "react";
import { Libre_Baskerville } from "next/font/google";
import Image from "next/image";
import Modal from "react-bootstrap/Modal";
import AvatarEditor from "react-avatar-editor";

import { useUnneuDataStore } from "@/store/store";

import Camera from "@/../public/camera.png";
import Plus from "@/../public/plus-icon.svg";
import Upload from "@/../public/upload.png";
import UploadFile from "@/../public/upload file.png";
import Close from "@/../public/close.png";

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
    const [isFileUploadedForCropping, setIsFileUploadedForCropping] = useState(false);
    const [profilePhotoUploadError, setProfilePhotoUploadError] = useState(null);
    const [slideValue, setSlideValue] = useState(10);
    const [croppedImage, setCroppedImage] = useState(null);
    const coverFileInputRef = useRef(null);
    const profileFileInputRef = useRef(null);
    const profileImageCropRef = useRef(null);

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

    const handleFileChange = (event, setImagePreview, setImage, closeModal, width, height, setUploadError) => {
        if (event.target.files.length > 0) {
            if (event.target.files[0].type.split("/")[0] !== "image") {
                setImagePreview(null);
                setImage(null);
            }
            else {
                setIsFileUploadedForCropping(true);
                const file = event.target.files[0];
                setImage(file);
                const reader = new FileReader();
                reader.onload = (e) => {
                    let image = new window.Image();
                    image.src = e.target.result;
                    image.onload = function () {
                        var naturalHeight = image.height;
                        var naturalWidth = image.width;
                        if (naturalWidth < width || naturalHeight < height) {
                            setUploadError(`Image must be at least ${width} x ${height} pixels!`);
                            setImagePreview(null);
                            setIsFileUploadedForCropping(false);
                            return;
                        }
                        else {
                            setImagePreview(reader.result);
                            if (setImagePreview == setCoverImagePreview)
                                handleCoverClose();
                        }
                    };
                };
                reader.readAsDataURL(file);
            }
        } else {
            setImagePreview(null);
            setImage(null);
        }
    };

    const handleImageCrop = async (cropRef, setImagePreview, closeModal) => {
        try {
            if (cropRef) {
                const dataUrl = cropRef.current.getImage().toDataURL();
                setImagePreview(dataUrl);
                //setPreview(URL.createObjectURL(blob));
            }
            closeModal();
            setIsFileUploadedForCropping(false);
        }
        catch (err) {
            console.log(err);
        }
    };

    const base64ToFile = (base64String, fileName) => {
        // Split the base64 string into the data type and the actual data
        const [header, data] = base64String.split(',');
        // Extract the MIME type from the header
        const mimeType = header.match(/:(.*?);/)[1];

        // Convert the base64 string to binary data
        const binaryData = atob(data);

        // Create an array buffer to hold the binary data
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const uint8Array = new Uint8Array(arrayBuffer);

        // Populate the array buffer with the binary data
        for (let i = 0; i < binaryData.length; i++) {
            uint8Array[i] = binaryData.charCodeAt(i);
        }

        // Create a Blob from the array buffer
        const blob = new Blob([arrayBuffer], { type: mimeType });

        // Create a File object from the Blob
        const file = new File([blob], fileName, { type: mimeType });

        return file;
    }

    useEffect(() => {
        if (profileImagePreview)
            setSellerProfilePhoto(base64ToFile(profileImagePreview, "profileImage"));
    }, [profileImagePreview]);

    useEffect(() => {
        if (coverImagePreview)
            setSellerCoverPhoto(base64ToFile(coverImagePreview, "profileImage"));
    }, [coverImagePreview]);

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
            <Modal.Body className="px-[10%] relative">
                <Image src={Close} alt="close" className="absolute w-[15px] h-[15px] top-5 right-5" onClick={handleCoverClose} />
                <p className="mt-[56px] font-medium text-3xl">Upload cover image</p>
                <div className="mt-[24px] mb-[56px] h-[400px] w-full border !border-dashed rounded-[32px] flex flex-col flex-nowrap items-center justify-center gap-y-[28px]">
                    <Image src={Upload} alt="upload" className="w-[16%] h-[14%]" />
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
            <Modal.Body className="px-[10%] relative">
                <Image src={Close} alt="close" className="absolute w-[15px] h-[15px] top-5 right-5" onClick={handleProfileClose} />
                {
                    !isFileUploadedForCropping && (
                        <>
                            <p className="mt-[56px] font-medium text-3xl">Upload profile photo</p>
                            <div className="mt-[24px] mb-[56px] h-[400px] w-full border !border-dashed rounded-[32px] flex flex-col flex-nowrap items-center justify-center gap-y-[28px]">
                                <Image src={Upload} alt="upload" className="w-[16%] h-[14%]" />
                                <p className="text-xl font-medium">Drag and drop image here</p>
                                <p className="text-xl font-medium">or</p>
                                <button className="relative py-[16px] px-[125px] rounded-[16px] text-white bg-[#FEA355] text-xl font-medium" onClick={handleProfileButtonClick}>
                                    Browse files
                                    <Image src={UploadFile} alt="file-upload" className="w-[30px] h-[30px] absolute top-[13px] right-[20%]" />
                                </button>
                                {
                                    profilePhotoUploadError && (
                                        <p className="text-red-500 text-sm">{profilePhotoUploadError}</p>
                                    )
                                }
                            </div>
                        </>
                    )
                }
                <input
                    type="file"
                    name="myfile"
                    className="hidden"
                    ref={profileFileInputRef}
                    onChange={(e) => handleFileChange(e, setProfileImagePreview, setSellerProfilePhoto, handleProfileClose, 200, 200, setProfilePhotoUploadError)}
                />
                {
                    isFileUploadedForCropping && (
                        <div className="flex flex-col items-center">
                            <AvatarEditor
                                image={profileImagePreview}
                                rotate={0}
                                ref={profileImageCropRef}
                                borderRadius={100}
                                scale={slideValue / 10}
                                color={[0, 0, 0, 0.72]}
                                style={{ width: "70%", height: "70%" }}
                            />
                            <input type="range" min="10" max="50" onChange={e => setSlideValue(e.target.value)} className="slider" />
                            <button className="mt-[60px] mb-[40px] py-[16px] px-[125px] rounded-[16px] text-white bg-[#FEA355] text-xl font-medium" onClick={() => {
                                handleImageCrop(profileImageCropRef, setProfileImagePreview, handleProfileClose);
                            }}>
                                Save
                            </button>
                        </div>
                    )
                }
            </Modal.Body>
        </Modal>
    </section>
}