import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="">
            <main className="mt-4">
                <div className="md:hidden">
                    <div className="mt-8 flex justify-evenly gap-10">
                        <Link href='/'>
                            <p className="text-24 font-extrabold">ZERO | PORTFOLIO</p>
                        </Link>
                        <MobileNav />
                    </div>
                </div>
                <Navbar />
                {children}
                <Footer />
            </main>
        </div>
    );
}
