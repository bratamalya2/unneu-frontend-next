import Image from "next/image";

import NoItemsToDisplays from "@/../public/seller-profile-no-items-to-display.svg";
import NoReviews from "@/../public/seller-profile-no-reviews-yet.svg";
import DownArrow from "@/../public/down-arrow-2.png";

export default function ItemsSections({ sellerDetails }) {
    return <section className="relative z-10 top-[-30px] px-[5%] mb-[85px] flex flex-col">
        <div className="flex flex-row flex-nowrap items-center">
            <p className="text-xl font-medium">Items listed</p>
            <p className="text-xl font-medium ml-[4%]">Reviews</p>
        </div>
        <div className="absolute top-[35px] left-[5%] w-[90%] h-[3px] bg-[#E2E2E2]"></div>
        <div className="absolute top-[35px] left-[5%] w-[135px] h-[3px] bg-[#FE9135] rounded-[5px]"></div>
        <div className="mt-[50px] w-full flex flex-row flex-nowrap items-center justify-between">
            <div className="text-[18px] font-semibold">Total {sellerDetails.noOfItemsListed} items</div>
            <div className="w-[15%] flex flex-row flex-nowrap items-center justify-between">
                <div className="flex flex-row flex-nowrap items-center text-[18px] font-medium hover:cursor-pointer">
                    Category
                    <Image src={DownArrow} alt="expand" className="w-[11px] h-[7px] ml-[15px]" />
                </div>
                <div className="flex flex-row flex-nowrap items-center text-[18px] font-medium hover:cursor-pointer">
                    Sort by
                    <Image src={DownArrow} alt="expand" className="w-[11px] h-[7px] ml-[15px]" />
                </div>
            </div>
        </div>
        {
            sellerDetails.noOfItemsListed === "0" && (
                <>
                    <Image src={NoItemsToDisplays} alt="No items to display" className="mt-[150px] w-[30%] h-[300px] self-center" />
                    <p className="mt-[50px] self-center text-2xl text-[#767676] font-medium">Your store looks great!</p>
                    <p className="mt-[20px] self-center text-[18px] text-[#767676] font-medium">List your pre-loved fashion and start earning today!</p>
                    <button className="mt-[36px] self-center text-xl text-white font-medium py-[12px] px-[56px] rounded-[8px] bg-[#FE9135]">List item</button>
                </>
            )
        }
        <p className="mt-[100px] font-medium text-4xl">Rating & Reviews</p>
        <section className="mt-[50px] w-full h-fit py-[64px] flex flex-col items-center rounded-[32px] border-2 border-[#DCDCDC]">
            {
                sellerDetails.numberOfReviews === "0" && (
                    <>
                        <Image src={NoReviews} alt="No reviews to display" className="w-[30%] h-[250px] self-center" />
                        <p className="mt-[50px] font-semibold">No reviews yet</p>
                        <p className="mt-[30px] max-w-[30%] text-center">Your store is just getting started. Encourage your buyers to leave reviews after their purchases</p>
                    </>
                )
            }
        </section>
    </section>
}