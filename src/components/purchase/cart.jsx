import React, { useState, useEffect } from 'react';
import { Libre_Baskerville } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Component Imports
import CartItem from './cartItem';

// Image Imports
import LeftLeaf from '@/../public/aboutUs-left-leaf.png';
import RightLeaf from '@/../public/aboutUs-right-leaf.png';

// Store Import
import { useUnneuDataStore } from '@/store/store';

// Font Configuration
const lbFont = Libre_Baskerville({ 
    subsets: ['latin'], 
    weight: ['400', '700'] 
});

export default function CartPage() {
    // State Management
    const router = useRouter();
    const cart = useUnneuDataStore(store => store.cart);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [couponCode, setCouponCode] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState(0);

    // Coupon Handling Logic
    const handleCouponChange = (e) => {
        setCouponCode(e.target.value);
    };

    const applyCoupon = () => {
        const validCoupons = {
            'WELCOME10': 0.10,
            'FIRST20': 0.20,
            'SUMMER15': 0.15
        };

        if (validCoupons[couponCode]) {
            setDiscountPercentage(validCoupons[couponCode]);
            alert(`Coupon applied! ${couponCode} gives you ${validCoupons[couponCode] * 100}% off`);
        } else {
            setDiscountPercentage(0);
            alert('Invalid coupon code');
        }
    };

    // Fetch Item Details
    const fetchItemDetails = async (itemId) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/buyer/fetchSingleItemDetails`, {
                method: 'GET',
                headers: {
                    'itemid': itemId
                }
            });
            const data = await response.json();
            return data.success ? data.itemDetails : null;
        } catch (error) {
            console.error('Error fetching item details:', error);
            return null;
        }
    };

    // Load Cart Items Effect
    useEffect(() => {
        const loadCartItems = async () => {
            if (cart.length === 0) {
                setCartItems([]);
                setTotalPrice(0);
                return;
            }

            try {
                const itemDetailsPromises = cart.map(itemId => fetchItemDetails(itemId));
                const itemDetails = await Promise.all(itemDetailsPromises);
                
                const validItems = itemDetails.filter(item => item !== null);
                setCartItems(validItems);

                const total = validItems.reduce((sum, item) => sum + parseFloat(item.sellingPrice), 0);
                setTotalPrice(total);
            } catch (error) {
                console.error('Cart loading error:', error);
            }
        };

        loadCartItems();
    }, [cart]);

    // Calculation Helpers
    const estimatedTax = totalPrice * 0.07;
    const finalTotal = (totalPrice * (1 - discountPercentage)) * 1.07;

    // Render Cart Page
    return (
        <div className="w-full px-[5%] py-8">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className={`${lbFont.className} text-2xl lg:text-4xl font-semibold lg:font-bold`}>
                    Shopping Cart
                </h1>
                <p className="mt-3 text-sm lg:text-lg">
                    You have <span className="font-semibold">{cart.length} Item{cart.length !== 1 && 's'}</span> in your cart.
                </p>
            </div>

            {/* Cart Layout */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items Section */}
                <div className="w-full lg:w-3/5">
                    <div className="space-y-8">
                        {cart.map((itemId, index) => (
                            <CartItem key={index} itemId={itemId} />
                        ))}
                    </div>
                </div>

                {/* Order Summary Section */}
                <div className="relative w-full lg:w-2/5 bg-[#F8F8F8] rounded-3xl p-6 overflow-hidden shadow-lg">
                    {/* Decorative Leaves */}
                    <Image 
                        src={LeftLeaf} 
                        alt="Left Leaf Decoration" 
                        className="absolute bottom-[-80px] left-[-65px] z-[-10] h-[300px] w-[85px]" 
                    />
                    <Image 
                        src={RightLeaf} 
                        alt="Right Leaf Decoration" 
                        className="absolute bottom-[-80px] right-[-65px] z-[-10] h-[300px] w-[85px]" 
                    />

                    {/* Order Summary Title */}
                    <h2 className={`${lbFont.className} text-2xl font-semibold mb-6`}>
                        Order Summary
                    </h2>

                    

                    {/* Commented Promo Code Section */}
                    {/* Promo code input remains unchanged from original */}
                     <p className="mt-[16px] font-semibold text-sm lg:text-base">Apply promo code</p>
                    <input 
                        type="text" 
                        placeholder="Type here" 
                        value={couponCode}
                        onChange={handleCouponChange}
                        className="mt-[16px] w-full h-[50px] px-[24px] rounded-[16px] bg-[#FFF]" 
                    />
                    <button 
                        onClick={applyCoupon}
                        className="mt-[28px] mb-[20px] w-full py-[10px] rounded-[12px] text-[18px] font-semibold text-white bg-[#FE9135] hover:cursor-pointer" 
                        // style={{
                        //     background: "linear-gradient(90deg, #FE9135 0%, #FAC89D 100%)"
                        // }}
                    >
                        Apply
                    </button>

                    {/* Price Breakdown */}
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>₹ {totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping:</span>
                            <span>FREE</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Estimated Tax:</span>
                            <span>₹ {estimatedTax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Total Amount:</span>
                        <span>₹ {finalTotal.toFixed(2)}</span>
                        </div>
                    </div>
                    

                    {/* Action Buttons */}
                    <div className="space-y-4">
                         {/* Leaf Decorations - EXACT PLACEMENT FROM ORIGINAL */}
                    <Image 
                        src={LeftLeaf} 
                        alt="left leaf" 
                        className="absolute h-[300px] w-[85px] bottom-[60px] left-[-45px] z-[10] opacity-40" 
                    />
                    <Image 
                        src={RightLeaf} 
                        alt="right leaf" 
                        className="absolute h-[300px] w-[85px] bottom-[60px] right-[-45px] z-[10] opacity-40" 
                    />
                        <button 
                            onClick={() => window.open('/purchase?slug=address', { 
                                scroll: false, // Prevent automatic scrolling
                                shallow: true // Lightweight navigation
                            })
                            }
                            className="w-full bg-[#FE9135] text-white py-3 rounded-xl flex justify-center text-center items-center hover:bg-[#FF7F00] transition-colors"
                        >
                            
                            <span>Checkout →</span>
                        </button>
                        
                        <button 
                            onClick={() => router.push('/')}
                            className="w-full border border-black text-[#575757] py-3 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}