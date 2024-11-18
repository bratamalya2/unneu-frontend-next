import Image from "next/image";

import Hero from "@/../public/terms&conditons-hero.svg";

export default function TermsAndConditions() {
    return <main className="relative w-full top-[80px] mt-[21px] mb-[130px]">
        <p className="mt-[50px] text-3xl font-semibold uppercase ml-[5%]">Terms & condition</p>
        <Image src={Hero} alt="hero" className="relative w-full mt-[40px] z-0" />
        <section className="relative top-[-60px] left-[12.5%] w-[75%] bg-white p-[50px] z-10" style={{
            boxShadow: "0px 11px 40px 4px rgba(81, 69, 55, 0.05)"
        }}>
            <p className="text-[18px]">These Terms and Conditions, along with privacy policy or other terms (“Terms”) constitute a binding agreement by and between UNNEU PRIVATE LIMITED, ( “Website Owner” or “we” or “us” or “our”) and you (“you” or “your”) and relate to your use of our website, goods (as applicable) or services (as applicable) (collectively, “Services”).</p>
            <p className="text-[18px] mt-[20px]">By using our website and availing the Services, you agree that you have read and accepted these Terms (including the Privacy Policy). We reserve the right to modify these Terms at any time and without assigning any reason. It is your responsibility to periodically review these Terms to stay informed of updates.</p>
            <p className="text-[18px] font-medium mt-[36px]">The use of this website or availing of our Services is subject to the following terms of use:</p>
            <ul className="text-[18px] mt-[36px] list-disc px-[2%]">
                <li>
                    To access and use the Services, you agree to provide true, accurate and complete information to us during and after registration, and you shall be responsible for all acts done through the use of your registered account.
                </li>
                <li className="mt-[20px]">
                    Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials offered on this website or through the Services, for any specific purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
                </li>
                <li className="mt-[20px]">
                    Your use of our Services and the website is solely at your own risk and discretion.. You are required to independently assess and ensure that the Services meet your requirements.
                </li>
                <li className="mt-[20px]">
                    The contents of the Website and the Services are proprietary to Us and you will not have any authority to claim any intellectual property rights, title, or interest in its contents.
                </li>
                <li className="mt-[20px]">
                    You acknowledge that unauthorized use of the Website or the Services may lead to action against you as per these Terms or applicable laws.
                </li>
                <li className="mt-[20px]">
                    You agree to pay us the charges associated with availing the Services.
                </li>
                <li className="mt-[20px]">
                    You agree not to use the website and/ or Services for any purpose that is unlawful, illegal or forbidden by these Terms, or Indian or local laws that might apply to you.
                </li>
                <li className="mt-[20px]">
                    You agree and acknowledge that website and the Services may contain links to other third party websites. On accessing these links, you will be governed by the terms of use, privacy policy and such other policies of such third party websites.
                </li>
                <li className="mt-[20px]">
                    You understand that upon initiating a transaction for availing the Services you are entering into a legally binding and enforceable contract with us for the Services.
                </li>
                <li className="mt-[20px]">
                    You shall be entitled to claim a refund of the payment made by you in case we are not able to provide the Service. The timelines for such return and refund will be according to the specific Service you have availed or within the time period provided in our policies (as applicable). In case you do not raise a refund claim within the stipulated time, then this would make you ineligible for a refund.
                </li>
                <li className="mt-[20px]">
                    Notwithstanding anything contained in these Terms, the parties shall not be liable for any failure to perform an obligation under these Terms if performance is prevented or delayed by a force majeure event.
                </li>
                <li className="mt-[20px]">
                    These Terms and any dispute or claim relating to it, or its enforceability, shall be governed by and construed in accordance with the laws of India.
                </li>
                <li className="mt-[20px]">
                    All disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in South 24 Parganas, West Bengal.
                </li>
                <li className="mt-[20px]">
                    All concerns or communications relating to these Terms must be communicated to us using the contact information provided on this website.
                </li>
            </ul>
        </section>
    </main>
}