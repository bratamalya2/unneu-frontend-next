import { useState } from "react";

import LandingPageFAQQuestion from "./landingPageFAQquestion"

const answer = {
    0: [
        "It is the first Indian aggregator of pre-owned sarees in India where you can buy from verified sellers by surfing products through the sellers stores.",
        "The product is subject to a through quality check before it is shipped to the final buyer so that expectations match reality.",
        "The product is handled through collaboration with a certified courier partner and any damage or mishandling in transition is taken care of by the company."
    ],
    1: [
        "Expect the products to be delivered within <b>7-10 working days.</b>"
    ],
    2: [
        "The order is subject to cancellation within <b>two days</b> from the date of placing an order.",
        "We don’t have any return policy. Once sold the product is non returnable however it is subject to conditions. If the product is damaged or torn and does not meet the quality/ condition as prescribed then we may take the product back"
    ],
    3: [
        "The refund is remitted back <b>within 7 working days</b> from the date of return"
    ],
    4: [
        "You are expected to pay <b>Rs.100/-</b> against each order."
    ]
};

export default function LandingPageBuyerFAQ({ isVisible }) {
    const [currentQuestion, setCurrentQuestion] = useState(null);

    return <section className={`${isVisible ? "block" : "hidden"} mx-auto w-[95%] py-[24px]`}>
        <LandingPageFAQQuestion question="Why should I buy from Unneu.com?" id={0} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} answer={answer} />
        <LandingPageFAQQuestion question="What is the delivery timeline?" id={1} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} answer={answer} />
        <LandingPageFAQQuestion question="What are the cancellation and return policies?" id={2} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} answer={answer} />
        <LandingPageFAQQuestion question="What are the refund policies?" id={3} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} answer={answer} />
        <LandingPageFAQQuestion question="How is the shipping cost calculated?" id={4} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} answer={answer} />
    </section>
}