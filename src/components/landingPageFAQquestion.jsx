"use client";

import { useEffect } from "react";
import Image from "next/image";

import LandingPageFAQAnswer from "./landingPageFAQanswer";

import Expand from "@/../public/landingPageFAQShowAnswer.png";
import Contract from "@/../public/landingPageFAQHideAnswer.png";

export default function LandingPageFAQQuestion({ tag, question, currentQuestion, setCurrentQuestion, id, answer }) {
    useEffect(() => {
        if (currentQuestion === id) {
            setTimeout(() => {
                const currentHeightStr = document.getElementById("faq-section").style.minHeight;
                const currentHeight = parseInt(currentHeightStr.substring(0, currentHeightStr.length - 2));
                document.getElementById("faq-section").style.minHeight = currentHeight + document.getElementById(`answer-${tag}-${currentQuestion}`).offsetHeight + "px";
            }, 500);
        }
    }, [currentQuestion, id, tag]);

    return <>
        <div className="relative bg-[#FCD681] rounded-[24px] px-[15px] sm:px-[30px] py-[18px] mb-[24px] text-[#000] text-lg sm:text-2xl font-medium">
            <div className="max-w-[85%]">
                {question}
            </div>
            {
                currentQuestion !== id ? (
                    <Image src={Expand} alt="show answer" className="w-[35px] h-[35px] absolute top-5 right-2 sm:right-5 hover:cursor-pointer" onClick={() => {
                        setCurrentQuestion(id);
                    }} />
                ) : (
                    <div
                        className="absolute bg-[#D9D9D9] rounded-[50%] w-[40px] h-[40px] top-5 right-2"
                        onClick={() => {
                            const currentHeightStr = document.getElementById("faq-section").style.minHeight;
                            const currentHeight = parseInt(currentHeightStr.substring(0, currentHeightStr.length - 2));
                            document.getElementById("faq-section").style.minHeight = (currentHeight - document.getElementById(`answer-${tag}-${currentQuestion}`).offsetHeight) + "px";
                            setCurrentQuestion(null);
                        }}>
                        <Image src={Contract} alt="hide answer" className="absolute top-[10px] left-[9px] w-[40%] h-[40%] absolute hover:cursor-pointer" />
                    </div>
                )
            }
        </div>
        {
            currentQuestion === id && (
                <LandingPageFAQAnswer tag={tag} answer={answer} currentQuestion={currentQuestion} />
            )
        }
    </>
}