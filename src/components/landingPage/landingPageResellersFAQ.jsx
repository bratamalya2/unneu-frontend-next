import { useState } from "react";

import LandingPageFAQQuestion from "./landingPageFAQquestion";

const answer = {
    0: [
        "You can sell any form of sarees from the comfort of your home and can also be an aggregator to sell pre-owned sarees which get picked up from your doorstep at zero cost.",
        "You can get the visibility of being an authentic seller and sell from your own social store with products links generated to be shared across platforms for better reachability.",
        "You will get recognised for being a stellar seller based on your performance.",
        "You would be exposed to an easy and hassle free mode of selling with guaranteed payout at the end of every week .",
        "You can quote a competitive price for your sarees after building a sense of the market value of your products  by comparing against the selling point of other resellers ."
    ],
    1: [
        "Yes you can sell on any other platform if exists while experiencing the maximum benefits with us ."
    ],
    2: [
        "You have to share your bank details with us and your sales proceeds would be transferred at the end of every week that is on Friday."
    ],
    3: [
        "We don’t have any return policy however it’s subject to conditions. If the product does not live up to it’s quality standards or conditions as promised then it will be returned back to you from our warehouse."
    ],
    4: [
        "We aim to build the first and the biggest seller ecosystem in India with respect to pre-owned products and each touchpoint in the process would be authenticated through system generated procedure and not through verbal verdicts. Any loss or theft in transition would be borne by the company ."
    ]
};

export default function LandingPageResellersFAQ({ isVisible }) {
    const [currentQuestion, setCurrentQuestion] = useState(null);

    return <section className={`${isVisible ? "block" : "hidden"} mx-auto w-[95%] py-[24px]`}>
        <LandingPageFAQQuestion tag="reseller" question="Why should I sell with Unneu.com?" id={0} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} answer={answer} />
        <LandingPageFAQQuestion tag="reseller" question="Can I sell on other platforms while selling at Unneu.com?" id={1} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} answer={answer} />
        <LandingPageFAQQuestion tag="reseller" question="When and how do I get paid against my sales?" id={2} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} answer={answer} />
        <LandingPageFAQQuestion tag="reseller" question="Can my products get returned after I sell them?" id={3} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} answer={answer} />
        <LandingPageFAQQuestion tag="reseller" question="How do I know the service platform is authentic?" id={4} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} answer={answer} />
    </section>
}