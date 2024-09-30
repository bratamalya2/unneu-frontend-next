import Image from "next/image";

import VisionImg from "@/../public/aboutUs-vision.svg";
import LeftLeaf from "@/../public/aboutUs-left-leaf.png";
import RightLeaf from "@/../public/aboutUs-right-leaf.png";

export default function Vision() {
    return <>
        <section className="mt-[75px] lg:mt-0 w-full lg:h-[500px] flex lg:flex-row flex-col-reverse flex-nowrap lg:items-center justify-between mb-[50px] pl-[5%]">
            <aside className="mt-[24px] lg:mt-0 w-full lg:w-[50%] xl:w-[60%] 2xl:w-[55%] h-full relative flex flex-col flex-nowrap justify-center gap-y-8 pl-[10%]">
                <p className="text-2xl xl:text-3xl font-semibold">Our <span className="text-[#FE9135]">Vision</span></p>
                <p className="text-[15px] xl:text-lg leading-7 max-w-[80%]">
                    Revolutionize India&apos;s saree market by pioneering the country&apos;s first and a dedicated pre-owned saree marketplace.
                </p>
                <p className="text-[15px] xl:text-lg leading-7 max-w-[80%]">
                    Our peer-to-peer platform empowers Indian women to effortlessly resell or rent their sarees, transforming the age-old practices of saree sharing norm into a sustainable, digital experience.
                </p>
                <Image src={LeftLeaf} alt="leaf" className="absolute w-[67px] lg:w-[85px] h-[230px] lg:h-[400px] left-[-15%] lg:left-1" />
                <Image src={RightLeaf} alt="leaf" className="absolute w-[67px] lg:w-[85px] h-[230px] lg:h-[400px] right-[-10%] lg:right-0" />
            </aside>
            <aside className="relative w-[70%] lg:w-[25%] h-full bg-[#FCCC64] z-0 self-end">
                <Image src={VisionImg} alt="vision-img" className="relative h-full right-[50%] lg:left-[-45%] max-w-[340px] top-[12px] lg:top-[64px] z-10" />
            </aside>
        </section>
    </>
}