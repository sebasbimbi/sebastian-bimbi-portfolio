import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Story from '@/components/Story';
import Founded from '@/components/Founded';
import Lists from '@/components/Lists';
import Footer from '@/components/Footer';
import AiAssistant from '@/components/AiAssistant';
import { Award, Project } from '@/lib/types';

const awardsData: Award[] = [
    { title: "Webflow Awards Winner - Community MVP", organization: "Webflow", year: "2025", url: "https://webflow.com/webflowconf/2025/webflow-awards-recipient/sebastian-bimbi" },
    { title: "Google Knowledge Panel - Internet Personality", organization: "Google", year: "2025", url: "https://share.google/tJlhP8oDz5C1LFJ9r" },
    { title: "Notion Agents - Demo", organization: "Notion", year: "2025", url: "https://www.notion.com/product/ai/use-cases/generate-weeks-of-social-media-content-with-one-prompt" },
    { title: "Top 1% Mentor - October", organization: "Adplist", year: "2025", url: "https://adplist.org/community-certifications/top1percent-oct-2025-no-low-code-accb8e" },
    { title: "Top 100 Front-End Mentor - September", organization: "Adplist", year: "2025", url: "https://adplist.org/community-certifications/top100-sep-2025-front-end-accb8e" },
     { title: "Top 20 Productivity & No-Code Experts in USA", organization: "Favikon", year: "2025", url: "https://www.favikon.com/blog/top-productivity-no-code-experts-us" },
    { title: "GSAP Community Challenge - Chronohop", organization: "Webflow", year: "2025", url: "https://webflow.com/community/webflow-challenge" },
];

const projectsData: Project[] = [
    {
        name: "DSU",
        slug: "dsu",
        category: "Ecom Courses",
        video: "/dsu.mp4"
    },
    {
        name: "Kiba",
        slug: "kiba",
        category: "Digital Marketing",
        video: "/kiba.mp4"
    },
    {
        name: "Phoenix of Gaza XR",
        slug: "phoenix-of-gaza-xr",
        category: "Interactive Dev",
        video: "/gaza.mp4"
    },
    {
        name: "Zephyr-Cloud",
        slug: "zephyr-cloud",
        category: "SaaS",
        link: "https://zephyr-v1.webflow.io/",
        video: "/zephyr.mp4"
    },
    {
        name: "BCN Visuals",
        slug: "bcn-visuals",
        category: "3D Billboards",
        video: "/bcnvisuals.mp4"
    },
    {
        name: "Jamboree",
        slug: "jamboree",
        category: "Fundraiser",
        video: "/jamboree.mp4"
    },
    {
        name: "Head2Core",
        slug: "head2core",
        category: "Non-profit",
        video: "/head2core.mp4"
    },
    {
        name: "LiveTrained",
        slug: "livetrained",
        category: "Online Videos",
        video: "/livetrained.mp4"
    },
    
];

export default function Home() {
    return (
        <div className="w-full min-h-screen relative bg-white selection:bg-black selection:text-white">
            <Header />
            <main>
                <Hero />
                <Story />
                <Founded />
                <Lists title="Honors and Recognition" items={awardsData} id="awards" />
                <Lists title="Selected Projects" items={projectsData} />
                <Footer />
            </main>
            <AiAssistant />
        </div>
    );
}
