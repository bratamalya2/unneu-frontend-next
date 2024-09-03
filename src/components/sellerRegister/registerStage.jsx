import Image from "next/image";

import PersonalInformation from "@/../public/sellerRegister-personel-information-icon.svg";
import SellerPickup from "@/../public/sellerRegister-pick-up-delivery-icon.svg";
import PaymentType from "@/../public/sellerRegister-payment-type.svg";
import HorizontalLine from "@/../public/sellerRegister-line.png";

export default function RegisterStage({ stage }) {
    return <section className="relative px-[20%] flex flex-row flex-nowrap items-center mt-[20px] h-[140px]">
        <div className={`rounded-[12px] p-[16px] flex flex-row flex-nowrap items-center justify-center ${stage === "1" ? "bg-[#FDDF9F]" : "bg-[#EEEEEE]"}`}>
            <Image src={PersonalInformation} alt="personal-info" className="w-[31px] h-[24px]" />
        </div>
        <p className="text-[#8C8A8A] text-xs font-medium absolute bottom-5 left-[14%] min-[1130px]:left-[15%] xl:left-[16%] 2xl:left-[17%] w-[169px] text-center">
            Personal information
        </p>
        <Image src={HorizontalLine} alt="line" className="h-[1px] w-[45%]" />
        <div className={`rounded-[12px] p-[16px] flex flex-row flex-nowrap items-center justify-center ${stage === "2" ? "bg-[#FDDF9F]" : "bg-[#EEEEEE]"}`}>
            <Image src={SellerPickup} alt="seller-pickup" className="w-[31px] h-[24px]" />
        </div>
        <p className="text-[#8C8A8A] text-xs font-medium absolute bottom-0 lg:left-[44%] min-[1130px]:left-[45%] xl:left-[45.5%] min-[1500px]:left-[46%] min-[1600px]:left-[46.5%] min-[1900px]:left-[47%] w-[124px] text-center">
            Seller & Pick up information
        </p>
        <Image src={HorizontalLine} alt="line" className="h-[1px] w-[45%]" />
        <div className={`rounded-[12px] p-[16px] flex flex-row flex-nowrap items-center justify-center ${stage === "3" ? "bg-[#FDDF9F]" : "bg-[#EEEEEE]"}`}>
            <Image src={PaymentType} alt="payment-type" className="w-[31px] h-[24px]" />
        </div>
        <p className="text-[#8C8A8A] text-xs font-medium absolute bottom-0 lg:left-[71%] min-[1130px]:left-[72%] min-[1200px]:left-[73%] xl:left-[73.5%] min-[1500px]:left-[74%] min-[1600px]:left-[74.5%] min-[1740px]:left-[75%] w-[124px] text-center">
            Set your payment type
        </p>
    </section>
}