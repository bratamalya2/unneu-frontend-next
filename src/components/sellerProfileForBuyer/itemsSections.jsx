import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import Item from "./item";

import NoItemsToDisplays from "@/../public/seller-profile-no-items-to-display.svg";
import NoReviews from "@/../public/seller-profile-no-reviews-yet.svg";
import DownArrow from "@/../public/down-arrow-2.png";

const availableCategories = [
    "All",
    "New Arrivals",
    "Festive Wear",
    "Bridal Wear",
    "Party Wear",
    "Casual Wear",
    "Daily Wear"
];

const sortOptions = [
    "Price Low to High",
    "Price High to Low",
    "Listed recently",
    "Listed early"
];

export default function ItemsSections({ sellerDetails }) {
    const router = useRouter();
    const [itemDetails, setItemDetails] = useState([]);
    const [sortedItemDetails, setSortedItemDetails] = useState([]);
    const [showCategories, setShowCategories] = useState(false);
    const [currentCategory, setCurrentCategory] = useState("All");
    const [showSortBy, setShowSortBy] = useState(false);
    const [currentSortBy, setCurrentSortBy] = useState(null);

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
        switch (currentCategory) {
            case "All":
                setSortedItemDetails(itemDetails);
                break;
            case "New Arrivals":
                setSortedItemDetails(itemDetails.filter(x => x.category === "New Arrivals"));
                break;
            case "Festive Wear":
                setSortedItemDetails(itemDetails.filter(x => x.category === "Festive Wear"));
                break;
            case "Bridal Wear":
                setSortedItemDetails(itemDetails.filter(x => x.category === "Bridal Wear"));
                break;
            case "Party Wear":
                setSortedItemDetails(itemDetails.filter(x => x.category === "Party Wear"));
                break;
            case "Casual Wear":
                setSortedItemDetails(itemDetails.filter(x => x.category === "Casual Wear"));
                break;
            case "Daily Wear":
                setSortedItemDetails(itemDetails.filter(x => x.category === "Daily Wear"));
                break;
        }
    }, [itemDetails, currentCategory]);

    useEffect(() => {
        //add new code here
        if (!currentSortBy)
            return;
        switch (currentSortBy) {
            case "Price Low to High":
                setItemDetails(currArr => {
                    let arr = [...currArr];
                    arr.sort((a, b) => parseFloat(a.sellingPrice) - parseFloat(b.sellingPrice));
                    return arr;
                });
                break;
            case "Price High to Low":
                setItemDetails(currArr => {
                    let arr = [...currArr];
                    arr.sort((a, b) => parseFloat(b.sellingPrice) - parseFloat(a.sellingPrice));
                    return arr;
                });
                break;
            case "Listed recently":
                setItemDetails(currArr => {
                    let arr = [...currArr];
                    arr.sort((a, b) => new Date(b.uploadDateTime) - new Date(a.uploadDateTime));
                    return arr;
                });
                break;
            case "Listed early":
                setItemDetails(currArr => {
                    let arr = [...currArr];
                    arr.sort((a, b) => new Date(a.uploadDateTime) - new Date(b.uploadDateTime));
                    return arr;
                });
                break;
        }
    }, [currentSortBy]);

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
            <div className="text-sm lg:text-[18px] font-semibold">Total {sellerDetails.noOfItemsListed ? sortedItemDetails.length : sellerDetails.noOfItemsListed} items</div>
            <div className="w-[55%] lg:w-[25%] xl:w-[20%] 2xl:w-[17%] flex flex-row flex-nowrap items-center justify-between">
                <div className="relative flex flex-row flex-nowrap items-center text-sm lg:text-[18px] font-medium hover:cursor-pointer" onClick={() => {
                    setShowCategories(x => !x);
                    setShowSortBy(false);
                }}>
                    Category
                    <Image src={DownArrow} alt="expand" className="w-[11px] h-[7px] ml-[15px]" />
                    {
                        showCategories && (
                            <div className="w-[200px] z-50 absolute right-0 top-[30px] border border-black bg-white">
                                {
                                    availableCategories.map((cat, index) => {
                                        if (index === 0)
                                            return <div key={index} className="w-full text-sm lg:text-base py-[10px] flex flex-row items-center justify-center hover:text-white hover:bg-[#FE9135]" onClick={() => {
                                                setCurrentCategory(cat);
                                            }}>{cat}</div>
                                        else
                                            return <>
                                                <div className="w-full h-[1px] bg-black"></div>
                                                <div key={index} className="w-full py-[10px] text-sm lg:text-base flex flex-row items-center justify-center hover:text-white hover:bg-[#FE9135]" onClick={() => {
                                                    setCurrentCategory(cat);
                                                }}>{cat}</div>
                                            </>
                                    })
                                }
                            </div>
                        )
                    }
                </div>
                <div className="relative flex flex-row flex-nowrap items-center text-sm lg:text-[18px] font-medium hover:cursor-pointer" onClick={() => {
                    setShowCategories(false);
                    setShowSortBy(x => !x);
                }}>
                    Sort by
                    <Image src={DownArrow} alt="expand" className="w-[11px] h-[7px] ml-[15px]" />
                    {
                        showSortBy && (
                            <div className="w-[200px] z-50 absolute right-0 top-[30px] border border-black bg-white">
                                {
                                    sortOptions.map((option, index) => {
                                        if (index === 0)
                                            return <div key={index} className="w-full py-[10px] text-sm lg:text-base flex flex-row items-center justify-center hover:text-white hover:bg-[#FE9135]" onClick={() => {
                                                setCurrentSortBy(option);
                                            }}>{option}</div>
                                        else
                                            return <>
                                                <div className="w-full h-[1px] bg-black"></div>
                                                <div key={index} className="w-full py-[10px] text-sm lg:text-base flex flex-row items-center justify-center hover:text-white hover:bg-[#FE9135]" onClick={() => {
                                                    setCurrentSortBy(option);
                                                }}>{option}</div>
                                            </>
                                    })
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
        {
            sellerDetails.noOfItemsListed === "0" && (
                <>
                    <Image src={NoItemsToDisplays} alt="No items to display" className="mt-[35px] lg:mt-[150px] w-[80%] lg:w-[30%] h-[300px] self-center" />
                    <p className="mt-[50px] self-center text-2xl text-[#767676] font-medium">No items here yet!</p>
                    <p className="mt-[20px] self-center text-base text-center lg:text-[18px] text-[#767676] font-medium">Explore our marketplace full of pre-loved fashion!</p>
                    <button className="mt-[36px] self-center text-xl text-white font-medium py-[12px] px-[56px] rounded-[8px] bg-[#FE9135]" onClick={() => {
                        router.push(`/buyer/home`);
                    }}>Explore more</button>
                </>
            )
        }
        {
            sellerDetails.noOfItemsListed !== "0" && (
                <div className="w-full max-h-[900px] mt-[32px] flex flex-row flex-wrap gap-x-4 lg:gap-x-[10px] xl:gap-x-10 gap-y-4 overflow-y-auto">
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
                    </>
                )
            }
        </section>
    </section>
}