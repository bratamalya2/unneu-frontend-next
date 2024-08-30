"use client";

import { useEffect } from "react";

export default function LandingPageFAQAnswer({ tag, answer, currentQuestion, prevClickedQuestion, id, prevHeight, setPrevHeight }) {
    useEffect(() => {
        if (currentQuestion === id)
            setTimeout(() => setPrevHeight(document.getElementById(`answer-${tag}-${currentQuestion}`).offsetHeight), 200);
        return () => {
            if ((prevClickedQuestion !== null && currentQuestion === prevClickedQuestion) || (prevClickedQuestion === null && prevHeight > 0)) {
                const currentHeightStr = document.getElementById("faq-section").style.minHeight;
                const currentHeight = parseInt(currentHeightStr.substring(0, currentHeightStr.length - 2));
                document.getElementById("faq-section").style.minHeight = (currentHeight - prevHeight) + "px";
            }
        };
    }, [currentQuestion, prevClickedQuestion, id, tag, prevHeight, setPrevHeight]);

    if (currentQuestion === null)
        return null;
    return <ul className="bg-[#FEEECB] rounded-[36px] py-[21px] px-[44px] flex flex-col gap-[8px] mb-[24px] list-disc" id={`answer-${tag}-${currentQuestion}`}>
        {
            answer[currentQuestion].map((a, i) => <li key={i} className="text-[18px]" dangerouslySetInnerHTML={{ __html: a }} />)
        }
    </ul>
}