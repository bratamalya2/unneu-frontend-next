import SellerHomeHero from "@/components/sellerHome/sellerHomeHero";
import SellerHomeStepsToStartSelling from "@/components/sellerHome/sellerHomeStepsToStartSelling";
import SellerHomeWhySellWithUs from "@/components/sellerHome/sellerHomeWhySellWithUs";

export default function Home() {
    return <main className="relative">
        <SellerHomeHero />
        <SellerHomeStepsToStartSelling />
        <SellerHomeWhySellWithUs />
    </main>
}