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

    return <section className="absolute px-[5%] md:px-[10%] top-[700px] md:top-[900px] lg:top-[520px] xl:top-[570px] 2xl:top-[750px] lg:mt-[85px] w-full">
        <p className="text-2xl lg:text-4xl font-medium">Steps to <span className="text-[#D57A2D] font-semibold">Start Selling</span></p>
        <section className="absolute lg:static flex flex-col md:flex-row flex-nowrap mt-[20px] md:mt-[48px] w-[90%] md:w-[90%] left-[5%] md:left-[10%]">
            <aside className="relative w-full md:w-[50%] rounded-[36px] lg:w-[60%] xl:w-[70%] md:min-h-[692px] h-[400px]" id="seller-home-steps-tostart-selling-hero-div">
                <div className="absolute top-0 right-0 w-[100px] h-[50px] bg-yellow-400 rounded-[36px] z-0">
                </div>
                <button
                    className="absolute top-0 right-0 h-[50px] text-[#5A5A5A] text-[18px] font-semibold px-[54px] py-[10px] bg-[#FFF] rounded-tr-[32px] rounded-bl-[32px] rounded-br-[32px] !border !border-[#FBC246] z-10"
                    onClick={() => {
                        router.push("/seller/register/1");
                    }}
                    id="register-now-button"
                >
                    Register now
                </button>
            </aside>
            <aside className="mt-[30px] lg:mt-0 w-full md:w-[40%] xl:w-[54%] relative">
                <Image src={Register} alt="register" className="w-[60px] lg:w-[86px] w-[60px] lg:h-[86px] absolute top-[20px] lg:left-[20%] left-[10%]" />
                <Image src={DottedLine} alt="line" className="w-[1px] h-[72px] lg:h-[57px] absolute top-[85px] lg:top-[105px] seller-home-dotted-line" />
                <Image src={List} alt="list" className="w-[60px] lg:w-[86px] w-[60px] lg:h-[86px] absolute top-[160px] lg:left-[20%] left-[10%]" />
                <Image src={DottedLine} alt="line" className="w-[1px] h-[72px] lg:h-[57px] absolute top-[225px] lg:top-[245px] seller-home-dotted-line" />
                <Image src={Manage} alt="list" className="w-[60px] lg:w-[86px] w-[60px] lg:h-[86px] absolute top-[300px] lg:left-[20%] left-[10%]" />
                <Image src={DottedLine} alt="line" className="w-[1px] h-[72px] lg:h-[57px] absolute top-[365px] lg:top-[385px] seller-home-dotted-line" />
                <Image src={Shipping} alt="shipping" className="w-[60px] lg:w-[86px] w-[60px] lg:h-[86px] absolute top-[440px] lg:left-[20%] left-[10%]" />
                <Image src={DottedLine} alt="line" className="w-[1px] h-[72px] lg:h-[57px] absolute top-[505px] lg:top-[525px] seller-home-dotted-line" />
                <Image src={Payments} alt="payments" className="w-[60px] lg:w-[86px] w-[60px] lg:h-[86px] absolute top-[582px] lg:left-[20%] left-[10%]" />
                <div className="absolute top-[20px] left-[35%] md:left-[40%] lg:left-[55%] min-[1100px]:left-[52%] min-[1200px]:left-[51%] xl:left-[50%] min-[1400px]:left-[49%] min-[1450px]:left-[48%] min-[1500px]:left-[47%] 2xl:left-[45%]">
                    <p className="lg:text-xl font-medium">Register as a seller</p>
                    <p className="mt-2 text-xs lg:text-[14px] max-w-[78%] md:max-w-[160px] lg:max-w-[100%]">Fill out our simple form to join our seller community.</p>
                </div>
                <div className="absolute top-[160px] left-[35%] md:left-[40%] lg:left-[55%] min-[1100px]:left-[52%] min-[1200px]:left-[51%] xl:left-[50%] min-[1400px]:left-[49%] min-[1450px]:left-[48%] min-[1500px]:left-[47%] 2xl:left-[45%]">
                    <p className="lg:text-xl font-medium">List your saree</p>
                    <p className="mt-2 text-xs lg:text-[14px] max-w-[78%] md:max-w-[160px] lg:max-w-[100%]">Add detailed descriptions and high-quality photos.</p>
                </div>
                <div className="absolute top-[300px] left-[35%] md:left-[40%] lg:left-[55%] min-[1100px]:left-[52%] min-[1200px]:left-[51%] xl:left-[50%] min-[1400px]:left-[49%] min-[1450px]:left-[48%] min-[1500px]:left-[47%] 2xl:left-[45%]">
                    <p className="lg:text-xl font-medium">Manage your listing</p>
                    <p className="mt-2 text-xs lg:text-[14px] max-w-[78%] md:max-w-[160px] lg:max-w-[100%]">Easily track your inventory and sales.</p>
                </div>
                <div className="absolute top-[440px] left-[35%] md:left-[40%] lg:left-[55%] min-[1100px]:left-[52%] min-[1200px]:left-[51%] xl:left-[50%] min-[1400px]:left-[49%] min-[1450px]:left-[48%] min-[1500px]:left-[47%] 2xl:left-[45%]">
                    <p className="lg:text-xl font-medium">Free shipping</p>
                    <p className="mt-2 text-xs lg:text-[14px] max-w-[78%] md:max-w-[160px] lg:max-w-[100%]">Ship promptly and securely to buyers.</p>
                </div>
                <div className="absolute top-[585px] left-[35%] md:left-[40%] lg:left-[55%] min-[1100px]:left-[52%] min-[1200px]:left-[51%] xl:left-[50%] min-[1400px]:left-[49%] min-[1450px]:left-[48%] min-[1500px]:left-[47%] 2xl:left-[45%]">
                    <p className="lg:text-xl font-medium">Receive Payments</p>
                    <p className="mt-2 text-xs lg:text-[14px] max-w-[78%] md:max-w-[160px] lg:max-w-[100%]">Get paid every Friday, securely.</p>
                </div>
            </aside>
        </section>
    </section>
}