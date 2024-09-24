"use client";

import { useState, useRef, useEffect } from "react";
import { Libre_Baskerville } from "next/font/google";
import Image from "next/image";
import Modal from "react-bootstrap/Modal";
import AvatarEditor from "react-avatar-editor";

import Dropzone from "@/components/dropzone";

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
    const coverFileInputRef = useRef(null);
    const profileFileInputRef = useRef(null);
    const profileImageCropRef = useRef(null);
    const coverImageCropRef = useRef(null);

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

    const handleDrop = (acceptedFiles, setFilePreview) => {
        // Trigger the file upload
        if (acceptedFiles.length > 0) {
            if (acceptedFiles[0].type.split("/")[0] !== "image") {
                return;
            }
            else {
                const file = acceptedFiles[0];;
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFilePreview(reader.result);
                };
                reader.readAsDataURL(file);
                setIsFileUploadedForCropping(true);
            }
        }
    }

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
            setSlideValue(10);
            setIsFileUploadedForCropping(false);
        }
        catch (err) {
            console.log(err);
            setSlideValue(10);
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
    }, [profileImagePreview, setSellerProfilePhoto]);

    useEffect(() => {
        if (coverImagePreview)
            setSellerCoverPhoto(base64ToFile(coverImagePreview, "coverImage"));
    }, [coverImagePreview, setSellerCoverPhoto]);

    return <section className="mt-[56px] lg:mt-[105px] px-[10%] lg:px-[5%]">
        <p className={`hidden lg:block ${lbFont.className} text-4xl`}>Seller & pickup information</p>
        <p className={`lg:hidden ${lbFont.className} text-2xl`}>Seller information</p>
        <p className="text-[15px] lg:text-2xl font-medium lg:font-normal mt-[22px]">Set up profile photo</p>
        <div className={`relative mt-[16px] w-full h-[264px] lg:h-[254px] z-0 default-background-svg ${!coverImagePreview ? "default-cover-photo" : ""}`} style={{
            backgroundImage: coverImagePreview && `url(${coverImagePreview})`
        }}>
            <div className="right-0 lg:right-2 top-2 absolute rounded-bl-[8px] lg:rounded-[16px] px-[12px] lg:px-[22px] py-[8px] lg:py-[14px] gap-x-[8px] flex justify-between items-center text-sm lg:text-[18px] font-medium lg:font-normal bg-white hover:cursor-pointer" onClick={handleCoverShow}>
                <Image src={Camera} alt="change cover" className="w-[31px] h-[27px]" />
                <div>Edit cover photo</div>
            </div>
            <div className={`absolute ${hoverProfileImage ? "opacity-50" : "opacity-100"} default-background-svg ${!profileImagePreview ? "default-profile-photo" : ""} w-[120px] lg:w-[200px] h-[120px] lg:h-[200px] rounded-[200px] bottom-[-60px] lg:bottom-[-100px] left-[30%] lg:left-[43%] z-10 hover:cursor-pointer`} onMouseEnter={() => {
                setHoverProfileImage(true);
            }} onMouseLeave={() => {
                setHoverProfileImage(false);
            }} onClick={() => {
                setHoverProfileImage(x => !x);
                handleProfileShow();
            }}
                style={{
                    backgroundImage: profileImagePreview && `url(${profileImagePreview})`
                }}
            >
                <Image src={Plus} alt="modify" className={`absolute ${hoverProfileImage ? "opacity-100" : "opacity-0"} top-[40%] left-[37%]`} />
                <div className="absolute bg-stone-200 w-[36px] lg:w-[58px] h-[36px] lg:h-[58px] rounded-[58px] bottom-1 lg:bottom-2 right-1 lg:right-2 z-20">
                    <Image src={Camera} alt="change photo" className="absolute top-[9px] lg:top-[15px] left-[8px] lg:left-[14px] w-[20px] h-[17px] lg:w-[28px] lg:h-[25px]" />
                </div>
            </div>
        </div>
        <Modal show={showCoverModal} onHide={handleCoverClose} className={`mt-[90px] ${isFileUploadedForCropping && "w-full mx-auto"}`}>
            <Modal.Body className={`px-[10%] relative ${isFileUploadedForCropping && "w-full mx-auto"}`}>
                <Image src={Close} alt="close" className="absolute w-[15px] h-[15px] top-5 right-5" onClick={() => {
                    handleCoverClose();
                    setIsFileUploadedForCropping(false);
                    setCoverImagePreview(null);
                }} />
                {
                    !isFileUploadedForCropping && (
                        <>
                            <Dropzone onDrop={(x) => handleDrop(x, setCoverImagePreview)}>
                                <p className="mt-[42px] lg:mt-[56px] font-medium text-2xl lg:text-3xl">Upload cover image</p>
                                <div className="mt-[24px] mb-[56px] h-[250px] lg:h-[400px] w-full border !border-dashed rounded-[32px] flex flex-col flex-nowrap items-center justify-center gap-y-[28px]">
                                    <Image src={Upload} alt="upload" className="w-[18%] lg:w-[16%] xl:w-[11%] 2xl:w-[7%] h-[14%] xl:h-[13%] 2xl:h-[12%]" />
                                    <p className="hidden lg:block text-xl font-medium">Drag and drop image here</p>
                                    <p className="hidden lg:block text-xl font-medium">or</p>
                                    <button className="relative py-[10px] lg:py-[16px] px-[50px] lg:px-[125px] rounded-[16px] text-white bg-[#FEA355] text-xl font-medium" onClick={(e) => {
                                        e.stopPropagation();
                                        handleCoverButtonClick();
                                    }}>
                                        Browse files
                                        <Image src={UploadFile} alt="file-upload" className="w-[30px] h-[30px] absolute top-[10px] lg:top-[13px] right-[5%] lg:right-[20%]" />
                                    </button>
                                </div>
                            </Dropzone>
                            <Image src={Close} alt="close" className="absolute w-[15px] h-[15px] top-5 right-5" onClick={handleCoverClose} />
                        </>
                    )
                }
                <input
                    type="file"
                    name="myfile"
                    className="hidden"
                    ref={coverFileInputRef}
                    onChange={(e) => handleFileChange(e, setCoverImagePreview, setSellerCoverPhoto, handleCoverClose)}
                />
                {
                    isFileUploadedForCropping && (
                        <div className="flex flex-col items-center">
                            <AvatarEditor
                                image={coverImagePreview}
                                rotate={0}
                                ref={coverImageCropRef}
                                scale={slideValue / 10}
                                color={[0, 0, 0, 0.72]}
                                style={{ width: "100%", height: "254px" }}
                            />
                            <input type="range" min="10" max="50" onChange={e => setSlideValue(e.target.value)} className="slider" />
                            <button className="mt-[60px] mb-[40px] py-[16px] px-[125px] rounded-[16px] text-white bg-[#FEA355] text-xl font-medium" onClick={() => {
                                handleImageCrop(coverImageCropRef, setCoverImagePreview, handleCoverClose);
                            }}>
                                Save
                            </button>
                        </div>
                    )
                }
            </Modal.Body>
        </Modal>
        <Modal show={showProfileModal} onHide={handleProfileClose} className="mt-[90px] w-full lg:w-[60%] lg:left-[20%]">
            <Modal.Body className="px-[10%] relative">
                <Image src={Close} alt="close" className="absolute w-[15px] h-[15px] top-5 right-5" onClick={() => {
                    handleProfileClose();
                    setIsFileUploadedForCropping(false);
                    setProfileImagePreview(null);
                }} />
                {
                    !isFileUploadedForCropping && (
                        <>
                            <Dropzone onDrop={(x) => handleDrop(x, setProfileImagePreview)}>
                                <p className="mt-[42px] lg:mt-[56px] font-medium text-2xl lg:text-3xl">Upload profile photo</p>
                                <div className="mt-[24px] mb-[56px] h-[250px] lg:h-[400px] w-full border !border-dashed rounded-[32px] flex flex-col flex-nowrap items-center justify-center gap-y-[28px]">
                                    <Image src={Upload} alt="upload" className="w-[16%] h-[14%]" />
                                    <p className="text-xl font-medium lg:block hidden">Drag and drop image here</p>
                                    <p className="text-xl font-medium lg:block hidden">or</p>
                                    <button className="relative py-[10px] lg:py-[16px] px-[50px] lg:px-[125px] rounded-[16px] text-white bg-[#FEA355] text-xl font-medium" onClick={(e) => {
                                        e.stopPropagation();
                                        handleProfileButtonClick();
                                    }}>
                                        Browse files
                                        <Image src={UploadFile} alt="file-upload" className="w-[30px] h-[30px] absolute top-[10px] lg:top-[13px] right-[5%] lg:right-[20%]" />
                                    </button>
                                    {
                                        profilePhotoUploadError && (
                                            <p className="text-red-500 text-sm">{profilePhotoUploadError}</p>
                                        )
                                    }
                                </div>
                            </Dropzone>
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
                                style={{ width: "200px", height: "200px" }}
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