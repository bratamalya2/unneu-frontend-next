"use client";

import { useEffect } from "react";
import Image from "next/image";

import LandingPageFAQAnswer from "./landingPageFAQanswer";

import Expand from "@/../public/landingPageFAQShowAnswer.png";
import Contract from "@/../public/landingPageFAQHideAnswer.png";

export default function LandingPageFAQQuestion({ tag, question, currentQuestion, setCurrentQuestion, clickedQuestion, setClickedQuestion, id, answer, prevHeight, setPrevHeight }) {
    useEffect(() => {
        if (currentQuestion === id && prevHeight && currentQuestion === clickedQuestion) {
            const currentHeightStr = document.getElementById("faq-section").style.minHeight;
            const currentHeight = parseInt(currentHeightStr.substring(0, currentHeightStr.length - 2));
            document.getElementById("faq-section").style.minHeight = (currentHeight + prevHeight) + "px";
        }
    }, [currentQuestion, clickedQuestion, id, tag, prevHeight]);

    return <>
        <div className={`relative bg-[#FCD681] rounded-[24px] px-[15px] sm:px-[30px] py-[18px] text-[#000] text-lg sm:text-2xl font-medium ${answer.length - 1 === id ? "mb-[48px]" : "mb-[24px]"}`}>
            <div className="max-w-[85%]">
                {question}
            </div>
            {
                currentQuestion !== id ? (
                    <Image src={Expand} alt="show answer" className="w-[35px] h-[35px] absolute top-5 right-2 sm:right-5 hover:cursor-pointer" onClick={() => {
                        setCurrentQuestion(id);
                        setTimeout(() => setClickedQuestion(id), 200);
                    }} />
                ) : (
                    <div
                        className="absolute bg-[#D9D9D9] rounded-[50%] w-[40px] h-[40px] top-5 right-2"
                        onClick={() => {
                            setCurrentQuestion(null);
                            setClickedQuestion(null);
                        }}>
                        <Image src={Contract} alt="hide answer" className="absolute top-[10px] left-[9px] w-[40%] h-[40%] absolute hover:cursor-pointer" />
                    </div>
                )
            }
        </div>
        {
            currentQuestion === id && (
                <LandingPageFAQAnswer tag={tag} answer={answer} currentQuestion={currentQuestion} prevClickedQuestion={clickedQuestion} id={id} prevHeight={prevHeight} setPrevHeight={setPrevHeight} />
            )
        }
    </>
}