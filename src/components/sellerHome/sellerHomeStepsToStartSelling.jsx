"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import DottedLine from "@/../public/sellerHome-dotted-line.png";
import Register from "@/../public/sellerHome-register.svg";
import List from "@/../public/sellerHome-list.png";
import Manage from "@/../public/sellerHome-manage.png";
import Shipping from "@/../public/sellerHome-shipping.png";
import Payments from "@/../public/sellerHome-payments.svg";

import "@/styles/sellerHomeStepsToStartSelling.css";

export default function SellerHomeStepsToStartSelling() {
    const router = useRouter();

    return <section className="absolute px-[10%] lg:top-[520px] xl:top-[570px] 2xl:top-[750px] mt-[85px] w-full">
        <p className="text-4xl font-medium">Steps to <span className="text-[#D57A2D] font-semibold">Start Selling</span></p>
        <section className="flex flex-row flex-nowrap mt-[48px] w-full">
            <aside className="relative w-[50%] rounded-[36px] xl:w-[46%] min-h-[692px]" id="seller-home-steps-tostart-selling-hero-div">
                <button className="absolute top-0 right-0 text-white text-[18px] font-semibold px-[54px] py-[10px] bg-[#FBC246] rounded-tr-[32px] rounded-bl-[32px]" onClick={() => {
                    router.push("/seller/register/1");
                }}>Register now</button>
            </aside>
            <aside className="w-[50%] xl:w-[54%] relative">
                <Image src={Register} alt="register" className="w-[86px] h-[86px] absolute top-[20px] left-[20%]" />
                <Image src={DottedLine} alt="line" className="w-[1px] h-[57px] absolute top-[105px] seller-home-dotted-line" />
                <Image src={List} alt="list" className="w-[86px] h-[86px] absolute top-[160px] left-[20%]" />
                <Image src={DottedLine} alt="line" className="w-[1px] h-[57px] absolute top-[245px] seller-home-dotted-line" />
                <Image src={Manage} alt="list" className="w-[86px] h-[86px] absolute top-[300px] left-[20%]" />
                <Image src={DottedLine} alt="line" className="w-[1px] h-[57px] absolute top-[385px] seller-home-dotted-line" />
                <Image src={Shipping} alt="shipping" className="w-[86px] h-[86px] absolute top-[440px] left-[20%]" />
                <Image src={DottedLine} alt="line" className="w-[1px] h-[57px] absolute top-[525px] seller-home-dotted-line" />
                <Image src={Payments} alt="payments" className="w-[86px] h-[86px] absolute top-[582px] left-[20%]" />
                <div className="absolute top-[30px] lg:left-[43%] min-[1100px]:left-[42%] min-[1200px]:left-[41%] xl:left-[40%] min-[1400px]:left-[39%] min-[1450px]:left-[38%] min-[1500px]:left-[37%] 2xl:left-[35%]">
                    <p className="text-xl font-medium">Register as a seller</p>
                    <p className="mt-1 text-[14px] max-w-[78%]">Fill out our simple form to join our seller community.</p>
                </div>
                <div className="absolute top-[170px] lg:left-[43%] min-[1100px]:left-[42%] min-[1200px]:left-[41%] xl:left-[40%] min-[1400px]:left-[39%] min-[1450px]:left-[38%] min-[1500px]:left-[37%] 2xl:left-[35%]">
                    <p className="text-xl font-medium">List your saree</p>
                    <p className="mt-1 text-[14px] max-w-[78%]">Add detailed descriptions and high-quality photos.</p>
                </div>
                <div className="absolute top-[310px] lg:left-[43%] min-[1100px]:left-[42%] min-[1200px]:left-[41%] xl:left-[40%] min-[1400px]:left-[39%] min-[1450px]:left-[38%] min-[1500px]:left-[37%] 2xl:left-[35%]">
                    <p className="text-xl font-medium">Manage your listing</p>
                    <p className="mt-1 text-[14px] max-w-[78%]">Easily track your inventory and sales.</p>
                </div>
                <div className="absolute top-[450px] lg:left-[43%] min-[1100px]:left-[42%] min-[1200px]:left-[41%] xl:left-[40%] min-[1400px]:left-[39%] min-[1450px]:left-[38%] min-[1500px]:left-[37%] 2xl:left-[35%]">
                    <p className="text-xl font-medium">Free shipping</p>
                    <p className="mt-1 text-[14px] max-w-[78%]">Ship promptly and securely to buyers.</p>
                </div>
                <div className="absolute top-[595px] lg:left-[43%] min-[1100px]:left-[42%] min-[1200px]:left-[41%] xl:left-[40%] min-[1400px]:left-[39%] min-[1450px]:left-[38%] min-[1500px]:left-[37%] 2xl:left-[35%]">
                    <p className="text-xl font-medium">Receive Payments</p>
                    <p className="mt-1 text-[14px] max-w-[78%]">Get paid every Friday, securely.</p>
                </div>
            </aside>
        </section>
    </section>
}