import Image from "next/image";

import Resell from "@/../public/landingpage-resell.png";
import Rewear from "@/../public/landingpage-rewear.png";
import Rental from "@/../public/landingpage-rent.png";

export default function LandingPageNavSection() {
    return <aside className="relative bg-white w-[80%] h-[432px] rounded-[36px] mx-auto z-50 top-[-45px] flex justify-around items-center" style={{
        boxShadow: "0px 11px 40px 4px rgba(81, 69, 55, 0.05)"
    }}>
        <section className="flex flex-col items-center max-w-[19%]">
            <Image src={Resell} alt="resell" className="w-[93px] h-[101px]" />
            <p className="text-[18px] font-medium my-3">Resell</p>
            <p className="text-[18px] text-center">
                Give a treasured saree a new home! Resell your pre-owned and embrace financial pleasure
            </p>
        </section>
        <section className="flex flex-col items-center max-w-[19%]">
            <Image src={Rewear} alt="resell" className="w-[93px] h-[101px]" />
            <p className="text-[18px] font-medium my-3">Rewear</p>
            <p className="text-[18px] text-center">
                Own a piece of history, drape yourself in preloved elegance: &quot;as every drape tells a beautiful story. &quot;
            </p>
        </section>
        <section className="flex flex-col items-center max-w-[19%]">
            <Image src={Rental} alt="resell" className="w-[93px] h-[101px]" />
            <p className="text-[18px] font-medium my-3">Rental</p>
            <p className="text-[18px] text-center">
                Rent the perfect preloved saree; or give your beauties a new lease on life by renting them out!
            </p>
        </section>
    </aside>
}