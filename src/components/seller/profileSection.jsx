import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

import Location from "@/../public/location.png";
import Verified from "@/../public/verified.png";
import Followers from "@/../public/followers.png";
import RatingSelected from "@/../public/rating-selected.png";
import RatingUnselected from "@/../public/rating-unselected.png";
import LeftLeaf from "@/../public/Left-Leaf-Seller-profile.svg";
import RightLeaf from "@/../public/Right-Leaf-Seller-profile.svg";
import Share from "@/../public/share-seller-profile.png";
import Dot from "@/../public/options-dot.svg";

import "@/styles/sellerProfileSection.css";

export default function ProfileSection({ sellerDetails }) {
    const [profilePhotoUrl, setProfilePhotoUrl] = useState(null);
    const [coverPhotoUrl, setCoverPhotoUrl] = useState(null);
    const [ratingArr, setRatingArr] = useState([]);

    const getProfileAndCoverPhotos = useCallback(async () => {
        try {
            console.log('Inside');
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
        <section className="w-full h-fit flex flex-row flex-nowrap justify-between mt-[100px] px-[5%]">
            <aside className={`w-[50%] h-[500px] relative default-background-svg ${!coverPhotoUrl && "default-cover-photo"}`} style={{
                backgroundImage: coverPhotoUrl && `url(${coverPhotoUrl})`
            }}>
                <div className={`absolute w-[250px] h-[250px] default-background-svg left-[33%] bottom-[-125px] rounded-[100%] ${!profilePhotoUrl && "default-profile-photo"}`} style={{
                    backgroundImage: profilePhotoUrl && `url(${profilePhotoUrl})`
                }}>
                </div>
            </aside>
            <aside className="w-[40%] relative">
                <div className="absolute top-2 right-2 flex flex-col items-center gap-y-1 hover:cursor-pointer">
                    <Image src={Dot} alt="dot" className="w-[5px] h-[5px]" />
                    <Image src={Dot} alt="dot" className="w-[5px] h-[5px]" />
                    <Image src={Dot} alt="dot" className="w-[5px] h-[5px]" />
                </div>
                <Image src={Share} alt="share" className="w-[20px] h-[24px] absolute top-2 right-10 hover:cursor-pointer" />
                <p className="text-3xl font-medium">{sellerDetails.storeName}</p>
                {
                    sellerDetails.storeDescription.length > 0 && <>
                        <p className="mt-[10px] text-[#FE9135] font-medium">BIO</p>
                        <p className="mt-[14px] text-[18px] text-[#393939]">{sellerDetails.storeDescription}</p>
                    </>
                }
                <div className="mt-[30px] flex flex-row flex-nowrap items-center">
                    <Image src={Location} alt="location" className="w-[16px] h-[20px]" />
                    <div className="text-[#7E7E7E] ml-[10px]">{sellerDetails.city}, {sellerDetails.state}</div>
                    {
                        sellerDetails.isVerified && (
                            <>
                                <Image src={Verified} alt="verified" className="w-[20px] h-[20px] ml-[20px]" />
                                <div className="text-[#7E7E7E] font-medium ml-[10px]">Verified seller</div>
                            </>
                        )
                    }
                </div>
                <div className="mt-[30px] flex flex-row flex-nowrap items-center">
                    <Image src={Followers} alt="followers" className="w-[37px] h-[20px]" />
                    <div className="ml-[10px] text-[#7E7E7E] leading-7 self-end"><span className="font-semibold text-[#FE9135] text-lg">{sellerDetails.numberOfFollowers}</span> followers</div>
                </div>
                <div className="mt-[30px] flex flex-row flex-nowrap items-center">
                    {
                        ratingArr.map((isRated, i) => (
                            <Image key={i} src={isRated ? RatingSelected : RatingUnselected} alt="star" className="mr-[7px] w-[20px] h-[20px]" />
                        ))
                    }
                    <p className="text-[#8D8D8D] font-medium">
                        ({sellerDetails.numberOfReviews} reviews, {sellerDetails.numberOfItemsSold} items sold)
                    </p>
                </div>
                <div className="mt-[50px] flex flex-row flex-nowrap gap-x-[36px]">
                    <button className="rounded-[8px] text-lg font-medium bg-[#FE9135] py-[20px] px-[64px] text-white">List an item</button>
                    <button className="rounded-[8px] border-2 border-[#939393] text-lg font-medium   py-[20px] px-[64px]">Edit profile</button>
                </div>
            </aside>
        </section>
        <div className="w-[90%] mx-auto h-fit relative z-0 flex flex-row flex-nowrap items-center justify-between mt-[125px]">
            <Image src={LeftLeaf} alt="leaf" className="w-[45%] h-[219px] opacity-5" />
            <Image src={RightLeaf} alt="leaf" className="w-[45%] h-[219px] opacity-5" />
        </div>
    </>
}