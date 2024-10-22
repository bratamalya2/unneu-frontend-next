"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Error from "next/error";

import Hero from "@/components/buyerCategoryPage/hero";
import Filters from "@/components/buyerCategoryPage/filter";
import Results from "@/components/buyerHome/results";
import TopSellers from "@/components/buyerHome/topSellers";
import MobileFilters from "@/components/buyerCategoryPage/mobileFilters";

export default function Category() {
    const searchParams = useSearchParams();
    const [items, setItems] = useState([]);
    const [appliedFilters, setAppliedFilters] = useState([]);
    const [sortBy, setSortBy] = useState("Unsorted");
    const [top10Sellers, setTop10Sellers] = useState([]);
    const [sortedAndFilteredItems, setSortedAndFilteredItems] = useState(items);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [isCategoryProfileExists, setIsCategoryProfileExists] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleCloseMobileFilters = () => setShowMobileFilters(false);
    const handleShowMobileFilters = () => setShowMobileFilters(true);

    const fetchTop10Sellers = async () => {
        try {
            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/buyer/top10Sellers`, {
                method: "GET"
            });
            const y = await x.json();
            if (y.success)
                setTop10Sellers(y.sellers);
        }
        catch (err) {
            console.log(err);
        }
    };

    const fetchItems = async () => {
        try {
            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/buyer/getAllItemsOfACategory`, {
                method: "GET",
                headers: {
                    category: searchParams.get("category")
                }
            });
            const y = await x.json();
            if (y.success) {
                setItems(y.items);
                setIsLoaded(true);
                setIsCategoryProfileExists(true);
            }
            else {
                setIsLoaded(true);
                setIsCategoryProfileExists(false);
            }
        }
        catch (err) {
            console.log(err);
            setIsLoaded(true);
        }
    };

    const addFilter = (x) => {
        setAppliedFilters(curr => [...curr, x]);
    };

    const removeFilter = (x) => {
        setAppliedFilters((curr) => {
            let arr = [...curr];
            return arr.filter(item => item !== x);
        });
    };

    const removeAllFilters = () => {
        setAppliedFilters([]);
    };

    useEffect(() => {
        setSortedAndFilteredItems(items);
    }, [items]);

    useEffect(() => {
        if (sortBy === "Price Low to High")
            setSortedAndFilteredItems(items => {
                let arr = [...items];
                arr.sort((a, b) => parseFloat(a.sellingPrice.N) - parseFloat(b.sellingPrice.N));
                return arr;
            });
        else if (sortBy === "Price High to Low")
            setSortedAndFilteredItems(items => {
                let arr = [...items];
                arr.sort((a, b) => parseFloat(b.sellingPrice.N) - parseFloat(a.sellingPrice.N));
                return arr;
            });
        else if (sortBy === "Listed recently")
            setSortedAndFilteredItems(items => {
                let arr = [...items];
                arr.sort((a, b) => new Date(b.uploadDateTime.S) - new Date(a.uploadDateTime.S))
                return arr;
            });
        else if (sortBy === "Listed early")
            setSortedAndFilteredItems(items => {
                let arr = [...items];
                arr.sort((a, b) => new Date(a.uploadDateTime.S) - new Date(b.uploadDateTime.S))
                return arr;
            });
    }, [sortBy, items]);

    useEffect(() => {
        setSortedAndFilteredItems(() => {
            let arr = [...items];
            let maxDays = 0;
            const selectedColors = [];
            const selectedStoreNames = [];
            appliedFilters.forEach((filter) => {
                switch (filter.split("=")[0]) {
                    case "newly-listed":
                        const noOfDays = parseInt(filter.split("=")[1]);
                        if (noOfDays > maxDays)
                            maxDays = noOfDays;
                        break;
                    case "color":
                        const color = filter.split("=")[1];
                        selectedColors.push(color);
                        break;
                    case "seller":
                        const storeName = filter.split("=")[1];
                        selectedStoreNames.push(storeName);
                        break;
                }
            });
            if (maxDays > 0) {
                const minDateInMiliseconds = (new Date()).getTime() - maxDays * 24 * 60 * 60 * 1000;
                arr = arr.filter((item) => (new Date(item.uploadDateTime.S)).getTime() > minDateInMiliseconds);
            }
            if (selectedColors.length > 0) {
                arr = arr.filter(x => selectedColors.includes(x.color.S));
            }
            if (selectedStoreNames.length > 0) {
                arr = arr.filter(x => selectedStoreNames.includes(x.storeName));
            }
            return arr;
        });
    }, [appliedFilters, items]);

    useEffect(() => {
        if (searchParams.get("category")) {
            fetchItems();
            fetchTop10Sellers();
        }
        else
            setIsLoaded(true);
    }, []);

    return <main className="w-full relative">
        {
            searchParams.get("category") && isCategoryProfileExists && isLoaded && <>
                <p className="mt-[32px] text-[#494949] px-[5%]">
                    Home&nbsp;/&nbsp;shop&nbsp;/&nbsp;{searchParams.get("category")}
                </p>
                <Hero category={searchParams.get("category")} />
                <section className="mt-[42px] lg:mt-[100px] mb-[70px] lg:mb-[150px] w-full flex flex-col lg:flex-row flex-nowrap lg:justify-between gap-x-[16px] lg:gap-x-0">
                    <p className="px-[5%] lg:hidden text-[18px] font-medium">Pre-owned Sarees <span className="text-sm text-[#BEBEBE]">({sortedAndFilteredItems.length} results)</span></p>
                    <Filters
                        appliedFilters={appliedFilters}
                        addFilter={addFilter}
                        removeFilter={removeFilter}
                        handleShowMobileFilters={handleShowMobileFilters}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />
                    <MobileFilters appliedFilters={appliedFilters} addFilter={addFilter} removeFilter={removeFilter} removeAllFilters={removeAllFilters} showMobileFilters={showMobileFilters} handleCloseMobileFilters={handleCloseMobileFilters} />
                    <Results items={sortedAndFilteredItems} appliedFilters={appliedFilters} removeFilter={removeFilter} sortBy={sortBy} setSortBy={setSortBy} />
                </section>
                <TopSellers top10Sellers={top10Sellers} />
            </>
        }
        {
            !isCategoryProfileExists && isLoaded && (
                <Error statusCode={404} />
            )
        }
    </main>
}