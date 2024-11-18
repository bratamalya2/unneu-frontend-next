import Image from "next/image";

import Hero from "@/../public/cancellation&refund - hero.svg";

export default function CancellationAndRefund() {
    return <main className="relative w-full top-[80px] mt-[21px] mb-[130px]">
        <p className="mt-[50px] text-3xl font-semibold uppercase ml-[5%]"> Cancellation & Refund Policy</p>
        <Image src={Hero} alt="hero" className="relative w-full mt-[40px] z-0" />
        <section className="relative top-[-60px] left-[12.5%] w-[75%] bg-white p-[50px] z-10" style={{
            boxShadow: "0px 11px 40px 4px rgba(81, 69, 55, 0.05)"
        }}>
            <p className="text-[18px]">
                <span className="text-[#FE9135] font-semibold">UNNEU PRIVATE LIMITED</span>  believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:
            </p>
            <ul className="mt-[36px] list-disc px-[2%]">
                <li>Cancellations will be considered only if the request is made immediately after placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.</li>
                <li className="mt-[32px]"><span className="font-medium">UNNEU PRIVATE LIMITED</span> does not accept cancellation requests for perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good</li>
                <li className="mt-[32px]">In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within 2 days of receipt of the products. In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 2 days of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.</li>
                <li className="mt-[32px]">In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them. In case of any Refunds approved by the UNNEU PRIVATE LIMITED, it&apos;ll take 1-2 days for the refund to be processed to the end customer.</li>
            </ul>
        </section>
    </main>
}
