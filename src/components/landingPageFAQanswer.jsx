export default function LandingPageFAQAnswer({ answer, currentQuestion }) {
    if (currentQuestion === null)
        return null;
    return <ul className="bg-[#FEEECB] rounded-[36px] py-[21px] px-[44px] flex flex-col gap-[8px] mb-[24px] list-disc">
        {
            answer[currentQuestion].map((a, i) => <li key={i} className="text-[18px]" dangerouslySetInnerHTML={{ __html: a }} />)
        }
    </ul>
}