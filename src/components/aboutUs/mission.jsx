import Image from "next/image";

import MissionImg from "@/../public/aboutUs-mission.svg";

export default function Mission() {
    return <section className="w-full flex flex-col lg:flex-row flex-nowrap items-center justify-between lg:pr-[1%] pl-[5%] lg:pl-0 pr-[5%]">
        <Image src={MissionImg} alt="mission-img" className="w-full lg:w-[50%] h-[430px] lg:h-[700px]" />
        <aside className="w-full lg:w-[48%] flex flex-col flex-nowrap justify-center gap-y-8">
            <p className="text-2xl xl:text-3xl text-center font-semibold">
                Our <span className="text-[#FE9135]">mission</span>
            </p>
            <p className="text-[15px] xl:text-lg text-center leading-7">
                To build a community led business which bridges the gap between unique demands and supply by connecting a user with a specific need to a user with the perfect product thereby help creating a re purposeful lifestyle.
            </p>
        </aside>
    </section>
}