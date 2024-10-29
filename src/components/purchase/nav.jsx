import Image from "next/image";

import Cart from "@/../public/cart.png";
import Location from "@/../public/location.png";
import Payment from "@/../public/checkout-payment.svg";
import HorizontalLine from "@/../public/sellerRegister-line.png";
import HorizontalLineMobile from "@/../public/sellerRegister-line-mobile.png";

export default function Nav({ stage }) {
    return <section className="my-[30px] lg:my-[60px] mx-auto w-[80%] flex flex-row flex-nowrap items-center">
        <div className={`${stage === 1 ? "bg-[#FDDF9F] text-black" : "bg-[#F2F2F2] text-[#8C8A8A]"} rounded-[12px] w-[78px] h-[65px] flex flex-col flex-nowrap justify-center items-center gap-y-[4px]`}>
            <Image src={Cart} alt="cart" className="w-[20px] lg:w-[25px] h-[20px] lg:h-[25px]" />
            <p className="text-xs font-medium">Cart</p>
        </div>
        <Image src={HorizontalLineMobile} alt="line" className="lg:hidden h-[1px] w-[27%]" />
        <Image src={HorizontalLine} alt="line" className="hidden lg:block h-[1px] w-[35%]" />
        <div className={`${stage === 2 ? "bg-[#FDDF9F] text-black" : "bg-[#F2F2F2] text-[#8C8A8A]"} rounded-[12px] w-[78px] h-[65px] flex flex-col flex-nowrap justify-center items-center gap-y-[4px]`}>
            <Image src={Location} alt="loc" className="w-[16px] lg:w-[18px] h-[20px] lg:h-[25px]" />
            <p className="text-xs font-medium">Address</p>
        </div>
        <Image src={HorizontalLineMobile} alt="line" className="lg:hidden h-[1px] w-[27%]" />
        <Image src={HorizontalLine} alt="line" className="hidden lg:block h-[1px] w-[35%]" />
        <div className={`${stage === 3 ? "bg-[#FDDF9F] text-black" : "bg-[#F2F2F2] text-[#8C8A8A]"} rounded-[12px] w-[78px] h-[65px] flex flex-col flex-nowrap justify-center items-center gap-y-[4px]`}>
            <Image src={Payment} alt="pay" className="w-[24px] lg:w-[28px] h-[21px] lg:h-[25px]" />
            <p className="text-xs font-medium">Payment</p>
        </div>
    </section>
}