import Navbar from "./navbar"

export default function LandpageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Navbar />
            <main className="container mx-auto flex min-h-[94vh] flex-col">
                {children}
            </main>
        </>
    )
}
