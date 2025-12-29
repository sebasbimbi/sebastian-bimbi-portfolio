import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Story from '@/components/Story';
import Founded from '@/components/Founded';
import Lists from '@/components/Lists';
import Testimonials, { Testimonial } from '@/components/Testimonials';
import Footer from '@/components/Footer';
import AiAssistant from '@/components/AiAssistant';
import { Award, Project } from '@/lib/types';

const testimonialsData: Testimonial[] = [
    {
        quote: "Sebastian is a Webflow Master. He went above and beyond to provide value to a fellow founder like myself to build something with quality and speed. He's humble, knowledgeable and always happy to help.",
        name: "Ilai Szpiezak",
        role: "Co-Founder, CEO",
        company: "Pretty Prompt",
        url: "https://www.linkedin.com/in/ilaiszpiezak/"
    },
    {
        quote: "Sebastian combines outstanding expertise with a rare sense of humanity and professionalism. Working with him was not only highly effective, but also truly enjoyable.",
        name: "Riccardo Morieri",
        role: "Managing Director",
        company: "Morvei Solutions",
        url: "https://www.linkedin.com/in/riccardomorieri/"
    },
    {
        quote: "I highly recommend Sebastian as a dedicated mentor and expert. He played a pivotal role in my professional growth by assisting me in completing complex assignments within tight deadlines.",
        name: "Benedict Ryan",
        role: "Founder",
        company: "FlowRonin",
        url: "https://www.linkedin.com/in/benedictryan/"
    },
    {
        quote: "Without knowing me or looking for anything in return, Sebastian offered to jump on a call and help me resolve an issue I was having in Webflow. He spent time not only helping me come up with a solution but also providing me with very helpful suggestions.",
        name: "Dana Severson",
        role: "Senior Manager, SEO & Content",
        company: "Housecall Pro",
        url: "https://www.linkedin.com/in/danaseverson/"
    },
    {
        quote: "Today's mentorship session with Sebastian truly shifted my perspective. He said something that really hit me: 'Fix yourself from your mind first. Think about the process of how to become what you want to be.'",
        name: "Joseph David",
        role: "Webflow Developer",
        company: "Freelancing",
        url: "https://adplist.org/mentors/sebastian-bimbi"
    },
    {
        quote: "Sebastian has extensive experience in the field and an amazing ability to share his knowledge in a clear and engaging way. I left our meeting feeling confident and ready to put his insights into practice.",
        name: "Gustavo Maia",
        role: "Student",
        company: "Brazil",
        url: "https://adplist.org/mentors/sebastian-bimbi"
    },
];


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
                <Testimonials testimonials={testimonialsData} />
                <Footer />
            </main>
            <AiAssistant />
        </div>
    );
}
