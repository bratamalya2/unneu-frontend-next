import Image from "next/image";

import Circle from "@/../public/sellerHome-circle.png";
import DottedLine from "@/../public/sellerHome-dotted-line.png";
import Register from "@/../public/sellerHome-register.png";
import List from "@/../public/sellerHome-list.png";
import Manage from "@/../public/sellerHome-manage.png";
import Shipping from "@/../public/sellerHome-shipping.png";
import Payments from "@/../public/sellerHome-payments.png";
import HeroImg from "@/../public/sellerHome-steps-to-start-selling.png";

import "@/styles/sellerHomeStepsToStartSelling.css";

export default function SellerHomeStepsToStartSelling() {
    return <section className="absolute px-[5%] top-[550px] mt-[85px] w-full">
        <p className="text-4xl font-medium">Steps to <span className="text-[#D57A2D] font-semibold">Start Selling</span></p>
        <section className="flex flex-row flex-nowrap justify-between mt-[48px] w-full">
            <aside className="relative w-[50%]">
                <button className="absolute top-0 right-0 text-white text-[18px] font-semibold px-[54px] py-[10px] bg-[#FBC246] rounded-tr-[32px] rounded-bl-[32px]">Register now</button>
                <Image src={HeroImg} alt="hero" className="w-full h-[692px]" />
            </aside>
            <aside className="w-[50%] relative">
                <Image src={Circle} alt="circle" className="w-[86px] h-[86px] absolute top-0 left-[30%]" />
                <Image src={Register} alt="register" className="w-[48px] h-[48px] absolute top-[15px] left-[35%] xl:left-[34%] 2xl:left-[33%]" />
                <Image src={DottedLine} alt="line" className="w-[1px] h-[57px] absolute top-[85px] seller-home-dotted-line" />
                <Image src={List} alt="list" className="w-[86px] h-[86px] absolute top-[140px] left-[30%]" />
                <Image src={DottedLine} alt="line" className="w-[1px] h-[57px] absolute top-[225px] seller-home-dotted-line" />
                <Image src={Manage} alt="list" className="w-[86px] h-[86px] absolute top-[280px] left-[30%]" />
                <Image src={DottedLine} alt="line" className="w-[1px] h-[57px] absolute top-[365px] seller-home-dotted-line" />
                <Image src={Shipping} alt="shipping" className="w-[86px] h-[86px] absolute top-[420px] left-[30%]" />
                <Image src={DottedLine} alt="line" className="w-[1px] h-[57px] absolute top-[505px] seller-home-dotted-line" />
                <Image src={Circle} alt="circle" className="w-[86px] h-[86px] absolute top-[565px] left-[30%]" />
                <Image src={Payments} alt="payments" className="w-[48px] h-[48px] absolute top-[580px] left-[35%] xl:left-[34%] 2xl:left-[33%]" />
                <div className="absolute top-0 left-[53%]">
                    <p className="text-xl font-medium">Register as a seller</p>
                    <p className="text-[14px] max-w-[78%]">Fill out our simple form to join our seller community.</p>
                </div>
                <div className="absolute top-[140px] left-[53%]">
                    <p className="text-xl font-medium">List your saree</p>
                    <p className="text-[14px] max-w-[78%]">Add detailed descriptions and high-quality photos.</p>
                </div>
                <div className="absolute top-[280px] left-[53%]">
                    <p className="text-xl font-medium">Manage your listing</p>
                    <p className="text-[14px] max-w-[78%]">Easily track your inventory and sales.</p>
                </div>
                <div className="absolute top-[420px] left-[53%]">
                    <p className="text-xl font-medium">Free shipping</p>
                    <p className="text-[14px] max-w-[78%]">Ship promptly and securely to buyers.</p>
                </div>
                <div className="absolute top-[565px] left-[53%]">
                    <p className="text-xl font-medium">Receive Payments</p>
                    <p className="text-[14px] max-w-[78%]">Get paid every Friday, securely.</p>
                </div>
            </aside>
        </section>
    </section>
}