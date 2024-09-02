import { Libre_Baskerville } from "next/font/google";
import Image from "next/image";

import Camera from "@/../public/camera.png";

import "@/styles/sellerPickupProfile.css";

const lbFont = Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"] });

export default function SellerPickupProfile() {
    return <section className="mt-[105px] px-[5%]">
        <p className={`${lbFont.className} text-4xl`}>Seller & pickup information</p>
        <p className="text-2xl mt-[22px]">Set up profile photo</p>
        <div className="relative mt-[16px] w-full h-[254px] z-0 default-background-svg default-cover-photo">
            <div className="right-4 bottom-5 absolute rounded-[16px] px-[22px] py-[14px] gap-x-[8px] flex justify-between items-center text-[18px] bg-white hover:cursor-pointer">
                <Image src={Camera} alt="change cover" className="w-[31px] h-[27px]" />
                <div>Edit cover photo</div>
            </div>
            <div className="absolute default-background-svg default-profile-photo w-[200px] h-[200px] rounded-[200px] bottom-[-100px] left-[43%] z-10 hover:cursor-pointer">
                <div className="absolute bg-stone-200 w-[58px] h-[58px] rounded-[58px] bottom-2 right-2 z-20">
                    <Image src={Camera} alt="change photo" className="absolute top-[15px] left-[13px] w-[31px] h-[27px]" />
                </div>
            </div>
        </div>
    </section>
}