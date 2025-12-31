import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '700', '900'],
    variable: '--font-inter',
    display: 'swap',
});

const oswald = Oswald({
    subsets: ['latin'],
    weight: ['500', '700'],
    variable: '--font-oswald',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Sebastian Bimbi - Portfolio',
    description: 'Webflow Global Community Leader and Notion Ambassador. Strategic no-code development for growth-focused companies.',
};

export const revalidate = false;

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
            <body className="bg-white text-black antialiased font-sans">
                {children}
            </body>
        </html>
    );
}
