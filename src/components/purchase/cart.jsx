import { Libre_Baskerville } from "next/font/google";
import Image from "next/image";

import CartItem from "./cartItem";

import LeftLeaf from "@/../public/aboutUs-left-leaf.png";
import RightLeaf from "@/../public/aboutUs-right-leaf.png";

import { useUnneuDataStore } from "@/store/store";

const lbFont = Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"] });

export default function Cart() {
    const cart = useUnneuDataStore(store => store.cart);

    return <section className="w-full px-[5%]">
        <p className={`${lbFont.className} text-2xl lg:text-4xl lg:font-bold`}>Shopping Cart</p>
        <p className="mt-[12px] lg:mt-[21px] text-sm lg:text-[18px]">
            You have <span className="font-medium lg:font-semibold">{cart.length} Items</span> in your cart
        </p>
        <section className="mt-[32px] lg:mt-[42px] mb-[50px] w-ful flex flex-col lg:flex-row justify-between">
            <aside className="w-full lg:w-[60%]">
                <div className="w-full mt-0 lg:mt-[44px] flex flex-col gap-y-[32px]">
                    {
                        cart.map((itemId, index) => <CartItem itemId={itemId} key={index} />)
                    }
                </div>
            </aside>
            <aside className="relative mt-[44px] w-full lg:w-[30%] bg-[#F8F8F8] rounded-t-[32px] h-fit px-[25px] py-[12px] overflow-hidden z-[-20]" style={{
                boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
            }}>
                <Image src={LeftLeaf} alt="leaf" className="absolute h-[326px] w-[90px] bottom-[-80px] left-[-65px] z-[-10]" />
                <Image src={RightLeaf} alt="leaf" className="absolute h-[326px] w-[90px] bottom-[-80px] right-[-65px] z-[-10]" />
                <p className={`${lbFont.className} text-lg lg:text-3xl`}>Order summary</p>
                <p className="mt-[16px] font-medium text-sm lg:text-base">Apply promo code</p>
                <input type="text" placeholder="Type here" className="mt-[16px] w-full h-[50px] px-[24px] rounded-[16px] bg-[#FFF]" />
                <button className="mt-[28px] w-full py-[10px] rounded-[12px] text-[18px] font-semibold text-white hover:cursor-pointer" style={{
                    background: "linear-gradient(90deg, #FE9135 0%, #FAC89D 100%)"
                }}>
                    Apply
                </button>
                <div className="w-full mt-[41px] flex flex-row flex-nowrap items-center justify-between">
                    <p className="font-medium text-[15px] lg:text-base">Subtotal :</p>
                    <p className="lg:text-[18px] font-medium">₹ 2000</p>
                </div>
                <div className="w-full mt-[15px] flex flex-row flex-nowrap items-center justify-between">
                    <p className="font-medium text-[15px] lg:text-base">Shipping :</p>
                    <p className="lg:text-[18px] font-medium">FREE</p>
                </div>
                <div className="w-full mt-[15px] flex flex-row flex-nowrap items-center justify-between">
                    <p className="font-medium text-[15px] lg:text-base">Estimated tax :</p>
                    <p className="lg:text-[18px] font-medium">₹ 150</p>
                </div>
                <button className="w-full mt-[50px] px-[21px] py-[10px] rounded-[16px] bg-[#FE9135] flex flex-row flex-nowrap items-center justify-between text-white font-semibold text-[18px]">
                    <p>₹ 2150</p>
                    <p>Checkout &#8594;</p>
                </button>
                <button className="w-full mt-[32px] border-[0.5px] border-[#000] py-[10px] rounded-[16px] flex flex-row flex-nowrap items-center justify-center text-[#575757] text-[18px] font-medium">
                    Continue shopping
                </button>
            </aside>
        </section>
    </section>
}