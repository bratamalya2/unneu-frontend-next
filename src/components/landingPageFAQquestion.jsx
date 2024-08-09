import Image from "next/image";

import LandingPageFAQAnswer from "./landingPageFAQanswer";

import Expand from "@/../public/landingPageFAQShowAnswer.png";


export default function LandingPageFAQQuestion({ question, currentQuestion, setCurrentQuestion, id, answer }) {
    return <>
        <div className="relative bg-[#FCD681] rounded-[24px] px-[30px] py-[18px] mb-[24px] text-[#000] text-2xl font-medium">
            {question}
            <Image src={Expand} alt="show answer" className="w-[35px] h-[35px] absolute top-5 right-5 hover:cursor-pointer" onClick={() => {
                if (currentQuestion !== id)
                    setCurrentQuestion(id);
                else
                    setCurrentQuestion(null);
            }} />
        </div>
        {
            currentQuestion === id && (
                <LandingPageFAQAnswer answer={answer} currentQuestion={currentQuestion} />
            )
        }
    </>
}