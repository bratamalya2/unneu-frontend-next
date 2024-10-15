"use client";

import { useState, useEffect } from "react";

import Hero from "@/components/buyerHome/hero";
import Categories from "@/components/buyerHome/categories";
import Filters from "@/components/buyerHome/filters";
import Results from "@/components/buyerHome/results";
import TopSellers from "@/components/buyerHome/topSellers";

export default function BuyerHome() {
    const [items, setItems] = useState([]);
    const [appliedFilters, setAppliedFilters] = useState([]);
    const [sortBy, setSortBy] = useState("Price Low to High");
    const [top10Sellers, setTop10Sellers] = useState([]);
    const [sortedAndFilteredItems, setSortedAndFilteredItems] = useState(items);

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
            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/buyer/getAllItems`);
            const y = await x.json();
            if (y.success) {
                setItems(y.items);
            }
        }
        catch (err) {
            console.log(err);
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

    useEffect(() => {
        fetchItems();
        fetchTop10Sellers();
    }, []);

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
            const selectedCategories = [];
            const selectedColors = [];
            const selectedStoreNames = [];
            appliedFilters.forEach((filter) => {
                switch (filter.split("=")[0]) {
                    case "newly-listed":
                        const noOfDays = parseInt(filter.split("=")[1]);
                        if (noOfDays > maxDays)
                            maxDays = noOfDays;
                        break;
                    case "occasion":
                        const category = filter.split("=")[1];
                        selectedCategories.push(category);
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
            if (selectedCategories.length > 0) {
                arr = arr.filter(x => selectedCategories.includes(x.category.S));
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

    return <main className="w-full relative">
        <Hero />
        <Categories />
        <section className="pl-[10%] mt-[100px] mb-[150px] w-full flex flex-row flex-nowrap justify-between lg:gap-x-[100px]">
            <Filters appliedFilters={appliedFilters} addFilter={addFilter} removeFilter={removeFilter} />
            <Results items={sortedAndFilteredItems} appliedFilters={appliedFilters} removeFilter={removeFilter} sortBy={sortBy} setSortBy={setSortBy} />
        </section>
        <TopSellers top10Sellers={top10Sellers} />
    </main>
}