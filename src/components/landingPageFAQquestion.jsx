"use client";

import { useEffect } from "react";
import Image from "next/image";

import LandingPageFAQAnswer from "./landingPageFAQanswer";

import Expand from "@/../public/landingPageFAQShowAnswer.png";


export default function LandingPageFAQQuestion({ tag, question, currentQuestion, setCurrentQuestion, id, answer }) {
    useEffect(() => {
        if (currentQuestion === id) {
            setTimeout(() => {
                const currentHeightStr = document.getElementById("faq-section").style.minHeight;
                const currentHeight = parseInt(currentHeightStr.substring(0, currentHeightStr.length - 2));
                document.getElementById("faq-section").style.minHeight = currentHeight + document.getElementById(`answer-${tag}-${currentQuestion}`).offsetHeight + "px";
            }, 500);
        }
    }, [currentQuestion, id]);

    return <>
        <div className="relative bg-[#FCD681] rounded-[24px] px-[15px] sm:px-[30px] py-[18px] mb-[24px] text-[#000] text-lg sm:text-2xl font-medium">
            <div className="max-w-[85%]">
                {question}
            </div>
            <Image src={Expand} alt="show answer" className="w-[35px] h-[35px] absolute top-5 right-2 sm:right-5 hover:cursor-pointer" onClick={() => {
                if (currentQuestion !== id) {
                    setCurrentQuestion(id);
                }
                else {
                    const currentHeightStr = document.getElementById("faq-section").style.minHeight;
                    const currentHeight = parseInt(currentHeightStr.substring(0, currentHeightStr.length - 2));
                    document.getElementById("faq-section").style.minHeight = (currentHeight - document.getElementById(`answer-${tag}-${currentQuestion}`).offsetHeight) + "px";
                    setCurrentQuestion(null);
                }
            }} />
        </div>
        {
            currentQuestion === id && (
                <LandingPageFAQAnswer tag={tag} answer={answer} currentQuestion={currentQuestion} />
            )
        }
    </>
}