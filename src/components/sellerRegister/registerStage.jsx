import Image from "next/image";

import PersonalInformation from "@/../public/sellerRegister-personel-information-icon.svg";
import SellerPickup from "@/../public/sellerRegister-pick-up-delivery-icon.svg";
import PaymentType from "@/../public/sellerRegister-payment-type.svg";
import HorizontalLine from "@/../public/sellerRegister-line.png";
import HorizontalLineMobile from "@/../public/sellerRegister-line-mobile.png";

export default function RegisterStage({ stage }) {
    return <section className="relative px-[10%] flex flex-row flex-nowrap items-center lg:mt-[20px] h-[140px]">
        <div className={`rounded-[6px] lg:rounded-[12px] p-[10px] lg:p-[16px] flex flex-row flex-nowrap items-center justify-center ${stage === "1" ? "bg-[#FDDF9F]" : "bg-[#EEEEEE]"}`}>
            <Image src={PersonalInformation} alt="personal-info" className="w-[31px] h-[24px]" />
        </div>
        <p className="text-[#8C8A8A] text-[10px] lg:text-xs font-medium absolute bottom-0 lg:bottom-5 left-[5%] min-[500px]:left-[6%] lg:left-[14%] min-[1130px]:left-[15%] xl:left-[16%] 2xl:left-[17%] w-[88px] lg:w-[169px] text-center">
            Personal information
        </p>
        <Image src={HorizontalLine} alt="line" className="h-[1px] w-[25%] hidden lg:inline-block lg:w-[45%]" />
        <Image src={HorizontalLineMobile} alt="line" className="h-[1px] w-[25%] lg:hidden" />
        <div className={`rounded-[6px] lg:rounded-[12px] p-[10px] lg:p-[16px] flex flex-row flex-nowrap items-center justify-center ${stage === "2" ? "bg-[#FDDF9F]" : "bg-[#EEEEEE]"}`}>
            <Image src={SellerPickup} alt="seller-pickup" className="w-[31px] h-[24px]" />
        </div>
        <p className="text-[#8C8A8A] text-[10px] lg:text-xs font-medium absolute bottom-0 left-[35%] lg:left-[44%] min-[1130px]:left-[45%] xl:left-[45.5%] min-[1500px]:left-[46%] min-[1600px]:left-[46.5%] min-[1900px]:left-[47%] w-[113px] lg:w-[124px] text-center">
            Seller & Pick up information
        </p>
        <Image src={HorizontalLine} alt="line" className="h-[1px] w-[25%] hidden lg:inline-block lg:w-[45%]" />
        <Image src={HorizontalLineMobile} alt="line" className="h-[1px] w-[25%] lg:hidden" />
        <div className={`rounded-[6px] lg:rounded-[12px] p-[10px] lg:p-[16px] flex flex-row flex-nowrap items-center justify-center ${stage === "3" ? "bg-[#FDDF9F]" : "bg-[#EEEEEE]"}`}>
            <Image src={PaymentType} alt="payment-type" className="w-[31px] h-[24px]" />
        </div>
        <p className="text-[#8C8A8A] text-[10px] lg:text-xs font-medium absolute bottom-0 left-[68%] min-[500px]:left-[66%] lg:left-[71%] min-[1130px]:left-[72%] min-[1200px]:left-[73%] xl:left-[73.5%] min-[1500px]:left-[74%] min-[1600px]:left-[74.5%] min-[1740px]:left-[75%] w-[101px] lg:w-[124px] text-center">
            Set your payment type
        </p>
    </section>
}