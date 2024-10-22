import "@/styles/buyerCategoryHero.css";

export default function Hero({ category }) {
    return <section className="relative my-[20px] w-full h-[420px] lg:h-[350px] flex flex-row flex-nowrap items-center default-background-svg" id="buyer-category-main">
        <div className="w-[40%] h-full default-background-svg" id="buyer-category-hero-1">
        </div>
        <div className="w-[30%] h-full default-background-svg" id="buyer-category-hero-2">
        </div>
        <div className="w-[30%] h-full default-background-svg" id="buyer-category-hero-3">
        </div>
        <div className="absolute bottom-[140px] lg:bottom-[120px] left-[5vw] text-white text-2xl lg:text-4xl font-semibold">{category}</div>
        <p className="absolute bottom-[50px] max-w-[65%] lg:max-w-[40%] lg:bottom-[70px] left-[5vw] text-white text-base lg:text-[18px]">
            Explore the latest Pre-Owned sarees listed freshly by our sellers.
        </p>
    </section>
}