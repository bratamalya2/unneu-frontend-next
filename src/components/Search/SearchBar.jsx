
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Search from "@/../public/search.png";

const SearchBar = ({ backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchSuggestions, setSearchSuggestions] = useState({ stores: [], categories: [] });
    const [showSearchResults, setShowSearchResults] = useState(false);

    const [isSearchVisible, setIsSearchVisible] = useState(false); // State to toggle search bar visibility

   
      const router = useRouter();
      

    // Function to handle search
    const handleSearch = async (query) => {
        if (!query) {
            setSearchResults([]);
            setSearchSuggestions({ stores: [], categories: [] });
            setShowSearchResults(false);
            return;
        }

        try {
            const itemsResponse = await fetch(`${backendUrl}/search/searchItems?q=${encodeURIComponent(query)}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const suggestionsResponse = await fetch(`${backendUrl}/search/suggestSearchTerms?q=${encodeURIComponent(query)}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!itemsResponse.ok || !suggestionsResponse.ok) {
                throw new Error("Search request failed");
            }

            const itemsData = await itemsResponse.json();
            const suggestionsData = await suggestionsResponse.json();

            setSearchResults(itemsData.items || []);
            setSearchSuggestions(suggestionsData.suggestions || { stores: [], categories: [] });
            setShowSearchResults(
                (itemsData.items && itemsData.items.length > 0) ||
                (suggestionsData.suggestions &&
                    (suggestionsData.suggestions.stores.length > 0 || suggestionsData.suggestions.categories.length > 0))
            );
        } catch (error) {
            console.error("Search error:", error);
            setSearchResults([]);
            setSearchSuggestions({ stores: [], categories: [] });
            setShowSearchResults(false);
        }
    };

    // Debounce search input
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchQuery.trim()) {
                handleSearch(searchQuery);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    // Handle search input changes
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Navigate to item page
    const handleSearchResultClick = (itemId) => {
        router.push(`http://localhost:3000/item?itemId=${itemId}`);
        setShowSearchResults(false);
        setIsSearchVisible(false); // Hide search bar after navigation
    };

    // Navigate to store page
    const handleStoreClick = (sellerId) => {
        router.push(`http://localhost:3000/seller?sellerId=${encodeURIComponent(sellerId)}`);
    };

    // Toggle search bar visibility
    const toggleSearch = () => {
        setIsSearchVisible((prev) => !prev);
    };

    return (
        <div className="relative w-[30%] md:w-[40%]">
            {!isSearchVisible ? (
                <Image
                    src={Search}
                    alt="Search"
                    className="w-[24px] h-[24px] hover:cursor-pointer"
                    onClick={toggleSearch} // Toggle search bar on click
                />
            ) : (
                <div
                    className={`transition-transform duration-300 ease-in-out ${
                        isSearchVisible ? "scale-100" : "scale-0"
                    } w-full`}
                >
                    <input
                        type="text"
                        placeholder="Search for product"
                        className="rounded-[24px] w-full h-[64px] pl-[48px] poppins-class"
                        style={{ boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)" }}
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                    {showSearchResults && (
                        <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-[24px] max-h-[300px] overflow-y-auto z-50">
                            {/* Item Results */}
                            {searchResults.length > 0 && (
                                <div>
                                    <div className="px-4 py-2 bg-gray-100 text-sm font-semibold">Items</div>
                                    {searchResults.map((item) => (
                                        <div
                                            key={item.itemId}
                                            className="p-3 hover:bg-gray-100 cursor-pointer flex items-center"
                                            onClick={() => handleSearchResultClick(item.itemId)}
                                        >
                                            {item.imageUrl && (
                                                <Image
                                                    src={item.imageUrl}
                                                    alt={item.itemName || "Unnamed Item"}
                                                    width={50}
                                                    height={50}
                                                    className="mr-3"
                                                />
                                            )}
                                            <div>
                                                <div className="font-bold">{item.itemName || "Unnamed Item"}</div>
                                                <div className="text-sm text-gray-600">{item.description || "No description available"}</div>
                                                <div className="text-sm text-gray-500">₹{item.sellingPrice}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Suggestions */}
                            {(searchSuggestions.stores.length > 0 || searchSuggestions.categories.length > 0) && (
                                <div>
                                    {/* Store Suggestions */}
                                    {searchSuggestions.stores.length > 0 && (
                                        <div>
                                            <div className="px-4 py-2 bg-gray-100 text-sm font-semibold">Stores</div>
                                            {searchSuggestions.stores.map((store) => (
                                                <div
                                                    key={store.sellerId}
                                                    className="p-3 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => handleStoreClick(store.sellerId)}
                                                >
                                                    <div className="font-bold">{store.storeName}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Category Suggestions */}
                                    {searchSuggestions.categories.length > 0 && (
                                        <div>
                                            <div className="px-4 py-2 bg-gray-100 text-sm font-semibold">Categories</div>
                                            {searchSuggestions.categories.map((category) => (
                                                <div
                                                    key={category}
                                                    className="p-3 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => {
                                                        /* Handle category navigation */
                                                    }}
                                                >
                                                    <div className="font-bold">{category}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
