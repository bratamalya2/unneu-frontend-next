import { useState } from "react";

import LandingPageFAQQuestion from "./landingPageFAQquestion";

const answer = {
    0: [
        "You can be a seller representative by launching resellers as part of the seller community at Unneu. Contact us at business@unneu.com to learn more about it.",
        "A reseller can also become other seller’s agent based on your willingness."
    ],
    1: [
        "You get entitled to a joining bonus with each new joine and earn 2% commission against each order generated through your introduced pool of resellers ."
    ]
};

export default function LandingPageSellersFAQ({ isVisible }) {
    const [currentQuestion, setCurrentQuestion] = useState(null);

    return <section className={`${isVisible ? "block" : "hidden"} mx-auto w-[95%] py-[24px]`}>
        <LandingPageFAQQuestion tag="seller" question="How do I become a seller representative with Unneu?" id={0} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} answer={answer} />
        <LandingPageFAQQuestion tag="seller" question="What benefits do I get entitled to if I become a seller representative?" id={1} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} answer={answer} />
    </section>
}