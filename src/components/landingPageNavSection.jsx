import Image from "next/image";

import Resell from "@/../public/landingpage-resell.png";
import Rewear from "@/../public/landingpage-rewear.png";
import Rental from "@/../public/landingpage-rent.png";

export default function LandingPageNavSection() {
    return <aside className="relative bg-white w-[90%] xl:w-[80%] sm:h-[432px] rounded-[36px] mx-auto z-50 top-[-45px] flex flex-col sm:flex-row justify-around items-center py-[60px] sm:py-[0px] px-[21px] sm:px-[0px] text-center gap-y-8 sm:gap-y-0" style={{
        boxShadow: "0px 11px 40px 4px rgba(81, 69, 55, 0.05)"
    }}>
        <section className="flex flex-col items-center md:max-w-[23%]">
            <Image src={Resell} alt="resell" className="lg:w-[80px] lg:h-[60px] xl:w-[90px] xl:h-[70px]" />
            <p className="sm:text-[18px] font-medium my-3">Resell</p>
            <p className="sm:text-sm sm:text-center">
                Give a treasured saree a new home! Resell your pre-owned and embrace financial pleasure
            </p>
            <button className="bg-[#FBC246] py-[12px] px-[47px] sm:px-[35px] rounded-[12px] mt-[32px] text-black font-medium text-[18px] hover:bg-[#FE9135]">Sell now</button>
        </section>
        <section className="flex flex-col items-center md:max-w-[23%]">
            <Image src={Rewear} alt="resell" className="lg:w-[80px] lg:h-[70px] xl:w-[90px] xl:h-[80px]" />
            <p className="sm:text-[18px] font-medium my-3">Rewear</p>
            <p className="sm:text-sm sm:text-center">
                Own a piece of history, drape yourself in preloved elegance: &quot;as every drape tells a beautiful story. &quot;
            </p>
            <button className="bg-[#FBC246] py-[12px] px-[47px] sm:px-[35px] rounded-[12px] mt-[32px] text-black font-medium text-[18px] hover:bg-[#FE9135]">Buy now</button>
        </section>
        <section className="flex flex-col items-center md:max-w-[23%]">
            <Image src={Rental} alt="resell" className="lg:w-[50px] lg:h-[70px] xl:w-[55px] xl:h-[80px]" />
            <p className="sm:text-[18px] font-medium my-3">Rental</p>
            <p className="sm:text-sm sm:text-center">
                Rent the perfect preloved saree; or give your beauties a new lease on life by renting them out!
            </p>
            <button className="bg-[#FBC246] py-[12px] px-[47px] sm:px-[35px] rounded-[12px] mt-[32px] text-black font-medium text-[18px] hover:bg-[#FE9135]">Rent now</button>
        </section>
    </aside>
}