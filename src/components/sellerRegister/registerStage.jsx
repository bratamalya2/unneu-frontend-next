import Image from "next/image";

import PersonalInformation from "@/../public/sellerRegister-personel-information-icon.svg";
import SellerPickup from "@/../public/sellerRegister-pick-up-delivery-icon.svg";
import PaymentType from "@/../public/sellerRegister-payment-type.svg";
import HorizontalLine from "@/../public/sellerRegister-line.png";

export default function RegisterStage({ stage }) {
    return <section className="relative px-[15%] flex flex-row flex-nowrap items-center mt-[50px] h-[140px]">
        <div className={`rounded-[12px] p-[16px] flex flex-row flex-nowrap items-center justify-center ${stage === "1" ? "bg-[#FDDF9F]" : "bg-[#EEEEEE]"}`}>
            <Image src={PersonalInformation} alt="personal-info" className="w-[31px] h-[24px]" />
        </div>
        <p className="text-[#8C8A8A] text-xs font-medium absolute bottom-5 left-[11%] w-[169px] text-center">Personal information</p>
        <Image src={HorizontalLine} alt="line" className="h-[1px] w-[35%]" />
        <div className={`rounded-[12px] p-[16px] flex flex-row flex-nowrap items-center justify-center ${stage === "2" ? "bg-[#FDDF9F]" : "bg-[#EEEEEE]"}`}>
            <Image src={SellerPickup} alt="seller-pickup" className="w-[31px] h-[24px]" />
        </div>
        <p className="text-[#8C8A8A] text-xs font-medium absolute bottom-0 left-[42%] w-[124px] text-center">Seller & Pick up information</p>
        <Image src={HorizontalLine} alt="line" className="h-[1px] w-[35%]" />
        <div className={`rounded-[12px] p-[16px] flex flex-row flex-nowrap items-center justify-center ${stage === "3" ? "bg-[#FDDF9F]" : "bg-[#EEEEEE]"}`}>
            <Image src={PaymentType} alt="payment-type" className="w-[31px] h-[24px]" />
        </div>
        <p className="text-[#8C8A8A] text-xs font-medium absolute bottom-0 left-[72%] w-[124px] text-center">Set your payment type</p>
    </section>
}