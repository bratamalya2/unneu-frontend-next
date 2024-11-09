import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Modal from "react-bootstrap/Modal";

import Location from "@/../public/location.png";
import Verified from "@/../public/verified.png";
import Followers from "@/../public/followers.png";
import RatingSelected from "@/../public/rating-selected.png";
import RatingUnselected from "@/../public/rating-unselected.png";
import LeftLeaf from "@/../public/Left-Leaf-Seller-profile.svg";
import RightLeaf from "@/../public/Right-Leaf-Seller-profile.svg";
import Share from "@/../public/share-seller-profile.png";
import Dot from "@/../public/options-dot.svg";
import Close from "@/../public/close.png";
import Facebook from "@/../public/facebook-share.svg";
import Linkedin from "@/../public/linkedin-share.svg";
import X from "@/../public/x-share.svg";
import Whatsapp from "@/../public/whatsapp-share.svg";
import ShareLink from "@/../public/share-link.svg";

import "@/styles/sellerProfileSection.css";

export default function ProfileSection({ sellerDetails }) {
    const router = useRouter();
    const pageUrl = encodeURIComponent(`https://unneu.com/seller?sellerId=${sellerDetails.sellerId}`);
    const shareText = encodeURIComponent("Check out this awesome page!");
    const [profilePhotoUrl, setProfilePhotoUrl] = useState(null);
    const [coverPhotoUrl, setCoverPhotoUrl] = useState(null);
    const [ratingArr, setRatingArr] = useState([]);
    const [showShareModal, setShowShareModal] = useState(false);

    const handleCloseShareModal = () => setShowShareModal(false);
    const handleShowShareModal = () => setShowShareModal(true);

    const getProfileAndCoverPhotos = useCallback(async () => {
        try {
            if (sellerDetails.coverPhoto) {
                const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/fetchImage`, {
                    method: "GET",
                    headers: {
                        imageKey: sellerDetails.coverPhoto
                    }
                });
                const y = await x.json();
                if (y.success)
                    setCoverPhotoUrl(y.imgUrl);
            }
            if (sellerDetails.profilePhoto) {
                const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/fetchImage`, {
                    method: "GET",
                    headers: {
                        imageKey: sellerDetails.profilePhoto
                    }
                });
                const y = await x.json();
                if (y.success)
                    setProfilePhotoUrl(y.imgUrl);
            }
        }
        catch (err) {
            console.log(err);
        }
    }, [sellerDetails.coverPhoto, sellerDetails.profilePhoto]);

    const openShareLink = (url) => {
        window.open(url, "_blank");
    };

    useEffect(() => {
        getProfileAndCoverPhotos();
        const rating = parseInt(sellerDetails.avgRating);
        const arr = []
        for (let i = 0; i < rating; i++)
            arr.push(true);
        for (let i = rating; i < 5; i++)
            arr.push(false);
        setRatingArr(arr);
    }, [sellerDetails, getProfileAndCoverPhotos]);

    return <>
        <Modal show={showShareModal} onHide={handleCloseShareModal} className="lg:w-[65%] lg:left-[17.5%] xl:w-[55%] xl:left-[22.5%] mt-[200px]">
            <Modal.Body className="relative bg-[#F6F6F6] rounded-[20px] px-[25px] py-[15px]" style={{
                boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
            }}>
                <Image src={Close} alt="close" onClick={handleCloseShareModal} className="w-[18px] h-[18px] absolute top-5 right-5 hover:cursor-pointer" />
                <p className="text-2xl text-[#FE9135] font-semibold">Social Share</p>
                <p className="mt-[30px] text-[18px] font-medium">
                    Share this link via
                </p>
                <div className="mt-[15px] flex flex-row flex-nowrap items-center gap-x-[16px]">
                    <Image src={Facebook} alt="facebook" className="w-[50px] h-[54px] hover:cursor-pointer" onClick={() => {
                        openShareLink(`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`);
                    }} />
                    <Image src={Linkedin} alt="linkedin" className="w-[50px] h-[54px] hover:cursor-pointer" onClick={() => {
                        openShareLink(`https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`);
                    }} />
                    <Image src={X} alt="x" className="w-[50px] h-[54px] hover:cursor-pointer" onClick={() => {
                        openShareLink(`https://twitter.com/intent/tweet?url=${pageUrl}&text=${shareText}`);
                    }} />
                    <Image src={Whatsapp} alt="whatsapp" className="w-[50px] h-[54px] hover:cursor-pointer" onClick={() => {
                        openShareLink(`https://api.whatsapp.com/send?text=${shareText}%20${pageUrl}`);
                    }} />
                </div>
                <p className="mt-[20px] font-medium">
                    Copy link
                </p>
                <div className="mt-[12px] w-full border-[1.5px] border-[#5AA7BB] py-[23px] px-[17px] rounded-[8px] flex flex-row items-center flex-nowrap gap-x-1">
                    <Image src={ShareLink} alt="copy-link" className="w-[27px] h-[19px]" />
                    <p className="text-sm">https://unneu.com/seller?sellerId={sellerDetails.sellerId}</p>
                </div>
                <button className="mt-[25px] bg-[#FE9135] text-white w-full py-[10px] rounded-[8px] text-xl font-medium active:bg-[#FBC246]" onClick={async () => {
                    try {
                        await navigator.clipboard.writeText(`https://unneu.com/seller?sellerId=${sellerDetails.sellerId}`);
                    }
                    catch (err) {
                        console.log(err);
                    }
                }}>
                    Copy
                </button>
            </Modal.Body>
        </Modal>
        <section className="w-full h-fit flex flex-col lg:flex-row flex-nowrap justify-between mt-[35px] lg:mt-[100px] px-[10%] lg:px-[5%]">
            <aside className={`w-full lg:w-[55%] h-[300px] lg:h-[500px] rounded-[10px] lg:rounded-[0px] relative default-background-svg ${!coverPhotoUrl && "default-cover-photo"}`} style={{
                backgroundImage: coverPhotoUrl && `url(${coverPhotoUrl})`
            }}>
                <div className={`absolute w-[150px] lg:w-[250px] h-[150px] lg:h-[250px] default-background-svg left-[26%] lg:left-[26%] xl:left-[32%] bottom-[-75px] lg:bottom-[-125px] rounded-[100%] ${!profilePhotoUrl && "default-profile-photo"}`} style={{
                    backgroundImage: profilePhotoUrl && `url(${profilePhotoUrl})`
                }}>
                </div>
            </aside>
            <aside className="mt-[120px] lg:mt-0 w-full lg:w-[40%] relative">
                <div className="absolute top-1 lg:top-2 right-2 flex flex-col items-center gap-y-1 hover:cursor-pointer">
                    <Image src={Dot} alt="dot" className="w-[5px] h-[5px]" />
                    <Image src={Dot} alt="dot" className="w-[5px] h-[5px]" />
                    <Image src={Dot} alt="dot" className="w-[5px] h-[5px]" />
                </div>
                <Image src={Share} alt="share" className="w-[20px] h-[24px] absolute top-1 lg:top-2 right-10 hover:cursor-pointer" onClick={handleShowShareModal} />
                <p className="text-2xl lg:text-3xl font-medium">{sellerDetails.storeName}</p>
                {
                    sellerDetails.storeDescription.length > 0 && <>
                        <p className="hidden lg:block mt-[10px] text-[#FE9135] font-medium">BIO</p>
                        <p className="mt-[14px] text-sm lg:text-[18px] text-[#393939]">{sellerDetails.storeDescription}</p>
                    </>
                }
                <div className="mt-[20px] lg:mt-[30px] flex flex-row flex-nowrap items-center">
                    <Image src={Location} alt="location" className="w-[16px] h-[20px]" />
                    <div className="text-[#7E7E7E] text-[15px] lg:text-base font-medium lg:font-normal ml-[10px]">{sellerDetails.city}, {sellerDetails.state}</div>
                    {
                        sellerDetails.isVerified && (
                            <>
                                <Image src={Verified} alt="verified" className="hidden lg:inline-block w-[20px] h-[20px] ml-[20px]" />
                                <div className="hidden lg:inline-block text-[#7E7E7E] font-medium ml-[10px]">Verified seller</div>
                            </>
                        )
                    }
                </div>
                {
                    sellerDetails.isVerified && (
                        <div className="mt-[16px] lg:hidden flex flex-row flex-nowrap items-center">
                            <Image src={Verified} alt="verified" className="w-[18px] h-[18px]" />
                            <div className="text-[#7E7E7E] text-[15px] font-medium ml-[10px]">Verified seller</div>
                        </div>
                    )
                }
                <div className="mt-[16px] lg:mt-[30px] flex flex-row flex-nowrap items-center">
                    <Image src={Followers} alt="followers" className="w-[37px] h-[20px]" />
                    <div className="ml-[10px] text-[#7E7E7E] leading-7 self-end"><span className="font-semibold text-[#FE9135] text-lg">{sellerDetails.numberOfFollowers}</span> followers</div>
                </div>
                <div className="mt-[16px] lg:mt-[30px] flex flex-row flex-nowrap items-center">
                    {
                        ratingArr.map((isRated, i) => (
                            <Image key={i} src={isRated ? RatingSelected : RatingUnselected} alt="star" className="mr-[7px] w-[17px] lg:w-[20px] h-[17px] lg:h-[20px]" />
                        ))
                    }
                    <p className="text-[#8D8D8D] text-xs lg:text-base font-medium">
                        ({sellerDetails.numberOfReviews} reviews, {sellerDetails.numberOfItemsSold} items sold)
                    </p>
                </div>
                <div className="mt-[36px] lg:mt-[50px] flex flex-row flex-nowrap gap-x-[36px]">
                    <button className="rounded-[8px] text-sm lg:text-lg font-medium bg-[#FE9135] py-[12px] lg:py-[16px] px-[21px] lg:px-[40px] text-white" onClick={() => {
                        router.push(`/seller/uploadItem`);
                    }}>List an item</button>
                    <button className="rounded-[8px] border-2 border-[#939393] text-sm lg:text-lg font-medium py-[12px] lg:py-[16px] px-[21px] lg:px-[40px]" onClick={() => {
                        router.push("/seller/editProfile/1");
                    }}>Edit profile</button>
                </div>
            </aside>
        </section>
        <div className="w-[90%] mx-auto h-fit relative z-0 flex flex-row flex-nowrap items-center justify-between mt-[40px] mb-[60px] lg:mb-0 lg:mt-[125px]">
            <Image src={LeftLeaf} alt="leaf" className="w-[45%] h-[60px] lg:h-[219px] opacity-5" />
            <Image src={RightLeaf} alt="leaf" className="w-[45%] h-[60px] lg:h-[219px] opacity-5" />
        </div>
    </>
}