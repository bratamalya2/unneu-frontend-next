import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import Item from "./item";

import NoItemsToDisplays from "@/../public/seller-profile-no-items-to-display.svg";
import NoReviews from "@/../public/seller-profile-no-reviews-yet.svg";
import DownArrow from "@/../public/down-arrow-2.png";

export default function ItemsSections({ sellerDetails }) {
    const router = useRouter();
    const [itemDetails, setItemDetails] = useState([]);

    const fetchItemDetails = async () => {
        try {
            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/getSellerItems`, {
                method: "GET",
                headers: {
                    sellerid: sellerDetails.sellerId
                }
            });
            const y = await x.json();
            if (y.success)
                setItemDetails(y.items);
        }
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchItemDetails();
    }, []);

    return <section className="relative z-10 top-[-30px] px-[5%] lg:mb-[85px] flex flex-col">
        <div className="flex flex-row flex-nowrap items-center">
            <p className="text-[15px] lg:text-xl font-medium">Items listed</p>
            <p className="text-[15px] lg:text-xl font-medium ml-[4%]">Reviews</p>
        </div>
        <div className="absolute top-[35px] left-[5%] w-[90%] h-[3px] bg-[#E2E2E2]"></div>
        <div className="absolute top-[35px] left-[5%] w-[90px] lg:w-[135px] h-[3px] bg-[#FE9135] rounded-[5px]"></div>
        <div className="mt-[24px] lg:mt-[50px] w-full flex flex-row flex-nowrap items-center justify-between">
            <div className="text-sm lg:text-[18px] font-semibold">Total {sellerDetails.noOfItemsListed} items</div>
            <div className="w-[55%] lg:w-[25%] flex flex-row flex-nowrap items-center justify-between">
                <div className="flex flex-row flex-nowrap items-center text-sm lg:text-[18px] font-medium hover:cursor-pointer">
                    Category
                    <Image src={DownArrow} alt="expand" className="w-[11px] h-[7px] ml-[15px]" />
                </div>
                <div className="flex flex-row flex-nowrap items-center text-sm lg:text-[18px] font-medium hover:cursor-pointer">
                    Sort by
                    <Image src={DownArrow} alt="expand" className="w-[11px] h-[7px] ml-[15px]" />
                </div>
            </div>
        </div>
        {
            sellerDetails.noOfItemsListed === "0" && (
                <>
                    <Image src={NoItemsToDisplays} alt="No items to display" className="mt-[35px] lg:mt-[150px] w-[80%] lg:w-[30%] h-[300px] self-center" />
                    <p className="mt-[50px] self-center text-2xl text-[#767676] font-medium">Your store looks great!</p>
                    <p className="mt-[20px] self-center text-base text-center lg:text-[18px] text-[#767676] font-medium">List your pre-loved fashion and start earning today!</p>
                    <button className="mt-[36px] self-center text-xl text-white font-medium py-[12px] px-[56px] rounded-[8px] bg-[#FE9135]" onClick={() => {
                        router.push(`/seller/uploadItem`);
                    }}>List item</button>
                </>
            )
        }
        {
            sellerDetails.noOfItemsListed !== "0" && (
                <div className="w-full max-h-[800px] mt-[32px] flex flex-row flex-wrap gap-4">
                    {
                        itemDetails.map((x, i) => <Item itemDetail={x} key={i} />)
                    }
                </div>
            )
        }
        <p className="mt-[50px] lg:mt-[100px] font-medium text-2xl lg:text-4xl">Rating & Reviews</p>
        <section className="mt-[50px] w-full h-fit py-[32px] lg:py-[64px] flex flex-col items-center rounded-[32px] border-2 border-[#DCDCDC]">
            {
                sellerDetails.numberOfReviews === "0" && (
                    <>
                        <Image src={NoReviews} alt="No reviews to display" className="w-[80%] lg:w-[30%] h-[250px] self-center" />
                        <p className="mt-[28px] lg:mt-[50px] font-semibold">No reviews yet</p>
                        <p className="mt-[28px] lg:mt-[30px] max-w-[80%] lg:max-w-[30%] text-center text-[15px] lg:text-base">Your store is just getting started. Encourage your buyers to leave reviews after their purchases</p>
                    </>
                )
            }
        </section>
    </section>
}