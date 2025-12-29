import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Sebastian Bimbi - Portfolio',
    description: 'Webflow Global Community Leader and Notion Ambassador. Strategic no-code development for growth-focused companies.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=Oswald:wght@500;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="bg-white text-black antialiased">
                {children}
            </body>
        </html>
    );
}
