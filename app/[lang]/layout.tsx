import "@/app/globals.css";
import { NavbarMenu } from "@/components/custom-ui/Navbar";
import { Geist, Geist_Mono } from "next/font/google";
import { getDictionary } from "./dictionaries";
import { Languages } from "@/constants/types";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'nl' }, { lang: 'ar' }, { lang: 'es' }]
}

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode
    params: Promise<{ lang: Languages }>
}>) {
    const lang = (await params).lang;
    const dict = await getDictionary(lang)
    return (
        <html lang={lang}>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
                <NavbarMenu dict={dict} lang={lang} />
                {children}
            </body>
        </html>
    )
}