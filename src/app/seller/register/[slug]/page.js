import RegisterStage from "@/components/sellerRegister/registerStage"

export default function Register({ params }) {
    return <main className="relative">
        <RegisterStage stage={params.slug} />
    </main>
}