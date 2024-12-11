import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Store Import
import { useUnneuDataStore } from '@/store/store';

// Image Imports
import LeftLeaf from '@/../public/aboutUs-left-leaf.png';
import RightLeaf from '@/../public/aboutUs-right-leaf.png';
import { Poppins } from "next/font/google";
import { Libre_Baskerville } from "next/font/google";

const lbFont = Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"] });
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "700"]
  });

const OrderSummary = () => {
  const router = useRouter();
  const cart = useUnneuDataStore(store => store.cart);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  

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

  const estimatedTax = totalPrice * 0.07;
  const finalTotal = (totalPrice * (1 - discountPercentage)) * 1.07;

  return (
    <>
    <div className="relative bg-[#F8F8F8] rounded-3xl p-4 w-full max-w-[400px] h-[450px] top-[120px] overflow-hidden shadow-lg right-[-190px]">
      <Image 
        src={LeftLeaf} 
        alt="Left Leaf Decoration" 
        className="absolute h-[300px] w-[85px] bottom-[-20px] left-[-45px] z-[10] opacity-40" 
      />
      <Image 
        src={RightLeaf} 
        alt="Right Leaf Decoration" 
        className="absolute h-[300px] w-[85px] bottom-[-20px] right-[-45px] z-[10] opacity-40" 
      />

      <h2 className={`text-xl ${lbFont.className}  font-semibold mb-4 text-center justify-center items-center`}>Order Summary</h2>

      <p className="mb-3 text-xs">
        You have <span className="font-semibold">{cart.length} Item{cart.length !== 1 && 's'}</span> in your cart
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex font-semibold justify-between text-xl">
          <span>Subtotal:</span>
          <span>₹ {totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-xl">
          <span>Shipping:</span>
          <span>FREE</span>
        </div>
        <div className="flex justify-between font-semibold text-xl">
          <span>Estimated Tax:</span>
          <span>₹ {estimatedTax.toFixed(2)}</span>
        </div>
        {/* <div className="flex justify-between font-semibold text-sm">
          <span>Total Amount:</span>
          <span>₹ {finalTotal.toFixed(2)}</span>
        </div> */}
      </div>

      <div className="space-y-2 mt-20">
        <button 
          className="w-full border border-black text-black py-2 rounded-xl flex justify-center text-center items-center text-sm  transition-colors"
        >
          <span className="font-semibold">Estimated Total: ₹ {finalTotal.toFixed(2)} </span>
        </button>
        
        <button 
          onClick={() => router.push('/')}
          className="w-full border-2 border-[#FE9135] text-[#575757] py-2 rounded-xl text-sm hover:bg-gray-100 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
    </>
  );
};

export default OrderSummary;