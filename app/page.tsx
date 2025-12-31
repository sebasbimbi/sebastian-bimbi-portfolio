import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Story from '@/components/Story';
import Founded from '@/components/Founded';
import Lists from '@/components/Lists';
import Testimonials, { Testimonial } from '@/components/Testimonials';
import Partnerships, { Partnership } from '@/components/Partnerships';
import WorkWithMe, { Package } from '@/components/WorkWithMe';
import Ambassador, { AmbassadorRole } from "@/components/Ambassador";
import Footer from '@/components/Footer';
import { Award, Project } from '@/lib/types';

export const dynamic = 'force-static';
export const revalidate = false;

const testimonialsData: Testimonial[] = [
    {
        quote: "I needed a few quick fixes on my webflow website, and Sebastian quickly fixed them and a few other minor things while he was added. Super flexible and easy to work with. Glad I found him :)",
        name: "Peter Sorgenfrei",
        role: "CEO and Founder Coach",
        company: "Sorgenfrei ApS"
    },
    {
        quote: "I highly recommend Sebastian as a dedicated mentor and expert. He played a pivotal role in my professional growth by assisting me in completing complex assignments within tight deadlines. His expertise and guidance were instrumental in my success, especially during highly complex projects. Meeting Sebastian was a stroke of luck, and he has been a true lifesaver for me.",
        name: "Benedict Ryan",
        role: "Founder",
        company: "FlowRonin"
    },
    {
        quote: "Sebastian is a Webflow Master. He went above and beyond to provide value to a fellow founder like myself to build something with quality and speed. He's humble, knowledgeable and always happy to help. I cannot recommend him enough and I hope we'll be working together again soon!",
        name: "Ilai Szpiezak",
        role: "Co-Founder, CEO",
        company: "Pretty Prompt"
    },
    {
        quote: "Without knowing me or looking for anything in return, Sebastian offered to jump on a call and help me resolve an issue I was having in Webflow. He spent time not only helping me come up with a solution to the problem I was facing but also providing me with very helpful suggestions on other parts of my site. Sebastian is an expert in his field and overall a person with great integrity.",
        name: "Dana Severson",
        role: "Senior Manager, SEO & Content",
        company: "Housecall Pro"
    },
    {
        quote: "Sebastian, from a quick LinkedIn message on an early Saturday morning, immediately reached back out to me and got to troubleshoot my website that's built on webflow. In a matter of minutes, he came back to me with a solution. For him it was simple, for me it was the solution of a lifetime. I liked that he was super responsive, extremely communicative, and effective. If you're looking to troubleshoot your webflow, Sebastian is your guy.",
        name: "Nando Rodriguez",
        role: "Executive Leadership Coach",
        company: "The Law Firm Of Moumita Rahman, PLLC"
    },
    {
        quote: "Sebastian combines outstanding expertise with a rare sense of humanity and professionalism. Working with him was not only highly effective, but also truly enjoyable. He brings deep technical knowledge, creative problem-solving and genuine empathy to every project. His collaborative spirit and positive attitude set him apart.",
        name: "Riccardo Morieri",
        role: "Managing Director",
        company: "Morvei Solutions OG"
    },
    {
        quote: "Sebastian was friendly and communicative, and his work was very professional. He found innovative, creative ways to achieve what we had in mind while adjusting to our requirements. His expertise solved our web development needs.",
        name: "Ana Palomo",
        role: "Sales - Marketing Strategy",
        company: "BCN Visuals"
    },
    {
        quote: "Sebastian was helpful in improving our site performance, taking our load time from over 13 seconds to under 2. He also took time to share useful tips for working more efficiently in Webflow with me, which I really appreciated!",
        name: "Angela Blum",
        role: "Director of Digital Marketing",
        company: "Weaver Fundraising"
    },
];

const menteeTestimonialsData: Testimonial[] = [
    {
        quote: "Today's mentorship session with Sebastian Bimbi truly shifted my perspective. He said something that really hit me: 'Fix yourself from your mind first. Think about the process of how to become what you want to be, and you'll reach your goal.' He was real, no sugarcoating.",
        name: "Joseph David",
        role: "Webflow Developer",
        company: "Freelancing"
    },
    {
        quote: "Sebastian has extensive experience in the field and an amazing ability to share his knowledge in a clear and engaging way. I left our meeting feeling confident and ready to put his insights into practice. His guidance not only clarified my next steps but also gave me the motivation to move forward.",
        name: "Gustavo Maia",
        role: "Student",
        company: "Brazil"
    },
    {
        quote: "I had an exceptional experience with Sebastian! His amazing communication and deep subject knowledge made all the difference. He took the time to understand my expertise and provided invaluable guidance on marketing myself to attract clients.",
        name: "Karan Hamav",
        role: "UX Designer and Webflow Developer",
        company: "Ex-FYND"
    },
    {
        quote: "I had an outstanding experience with Sebastian! Their amazing communication and subject knowledge made complex topics easy to understand. Sebastian's motivation and problem-solving skills truly inspired me to tackle my challenges head-on.",
        name: "Aftah Pasha",
        role: "Web Designer",
        company: "Dicoding"
    },
    {
        quote: "Sebastian was very friendly & patient, he guided me on my portfolio building & how do i build my career, would definitely love talk with him again, Thank Sebastian for taking your time!",
        name: "Zain Ahmed",
        role: "Webflow Developer",
        company: "Recreav"
    },
    {
        quote: "The conversation with Sebastian was very productive. I really appreciate his candor and his willingness to discuss the experiences that led to his successful career. He offered valuable guidance on the direction I should take regarding my interest in web development.",
        name: "Sohail Hatim",
        role: "UX Designer",
        company: "Surgyy Design"
    },
    {
        quote: "Booked a half-hour mentorship session, but he generously extended it to a full hour. He provided me with every detail and pathway to become a successful no-code developer. Sebastian is very polite and generous.",
        name: "William Avelar",
        role: "Product Designer",
        company: "Just Beta"
    },
    {
        quote: "I learn a lot about what I did and what I can improve on my freelancing journey.",
        name: "Muhammad Bilal Qureshi",
        role: "UI/UX Designer",
        company: "Coursera"
    },
    {
        quote: "Sebastian was instrumental in my Webflow development journey, providing an abundance of valuable information and resources that helped me overcome obstacles in finding clients. His amazing communication and deep subject knowledge made the session feel like a conversation with a supportive friend.",
        name: "Maksim Kuznetsov",
        role: "Webflow Developer",
        company: "Self taught"
    },
    {
        quote: "Sebastian's brother is a great person who helps everyone. I'm stammering a lot, but he never sees my stammering. He always sees my feelings and my intentions. He has a lot of Webflow knowledge. His guidance is very wonderful.",
        name: "Lavi Sharma",
        role: "Webflow Developer & Designer",
        company: "EWPS"
    },
    {
        quote: "I had an incredible session with my mentor, who exceeded my expectations in every aspect. Their amazing communication and deep subject knowledge provided me with insightful perspectives tailored to my situation. He motivated me and offered effective problem-solving strategies.",
        name: "Kaif suthar",
        role: "Student",
        company: "shri B. H. Gandhi BBA college"
    }
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

const partnershipsData: Partnership[] = [
    {
        company: "Weglot",
        logo: "/logos/weglot_logo.jpeg",
        posts: [
            {
                type: "Sponsored Post",
                description: "Sponsored post sharing discount codes to the people who engaged.",
                impressions: 1900,
                likes: 50,
                url: "https://www.linkedin.com/posts/sebasbimbi_want-to-see-how-i-implement-website-translations-activity-7256903844125724673-lc7G"
            },
            {
                type: "Content Creation",
                description: "How to quick install Weglot into Webflow.",
                impressions: 1830,
                likes: 35,
                url: "https://www.linkedin.com/posts/sebasbimbi_heres-how-i-supercharged-a-clients-global-activity-7253649894555488256-JV0R"
            }
        ]
    },
    {
        company: "Notion",
        logo: "/logos/notionhq_logo.jpeg",
        posts: [
            {
                type: "Content Creation",
                description: "Showcasing 'Notion AI Agent'.",
                impressions: 11809,
                likes: 110,
                url: "https://www.linkedin.com/posts/sebasbimbi_i-just-replaced-my-entire-content-team-with-activity-7370024460239937536-RVg3"
            }
        ]
    },
    {
        company: "Anthropic",
        logo: "/logos/anthropicresearch_logo.jpeg",
        posts: [
            {
                type: "Promoted Post",
                description: "Showcasing free Claude for Business.",
                impressions: 1500,
                likes: 60,
                url: "https://www.linkedin.com/posts/sebasbimbi_i-cant-afford-these-tools-anymore-my-activity-7389536923419058176-5NQ9"
            }
        ]
    },
    {
        company: "Turbotic",
        logo: "/logos/turbotic_logo.jpeg",
        posts: [
            {
                type: "Sponsored Post",
                description: "Created a video showcasing their automation platform.",
                impressions: 24300,
                likes: 100,
                url: "https://www.linkedin.com/posts/sebasbimbi_nocode-turbotic-ai-activity-7408791306803519488-7CHA"
            }
        ]
    },
    {
        company: "Softr",
        logo: "/logos/softr_logo.jpeg",
        posts: [
            {
                type: "Sponsored Post",
                description: "Showcasing 'Ask Softr AI' campaign.",
                impressions: 1728,
                likes: 60,
                url: "https://www.linkedin.com/posts/sebasbimbi_asksoftrai-nocode-activity-7356575128832372736-butW",
                campaign: ""
            },
            {
                type: "Sponsored Post",
                description: "Showcasing 'Softr Databases' campaign.",
                impressions: 5682,
                likes: 90,
                url: "https://www.linkedin.com/posts/sebasbimbi_softrdatabases-nocode-activity-7341050868961619968-WfvS",
                campaign: ""
            },
            {
                type: "Sponsored Post",
                description: "Showcasing 'Softr AI Agents' campaign.",
                impressions: 2439,
                likes: 50,
                url: "https://www.linkedin.com/posts/sebasbimbi_softraiagents-activity-7379088404426227712-xGwE",
                campaign: ""
            },
            {
                type: "Sponsored Post",
                description: "Created a video showcasing Softr Workflows.",
                impressions: 1700,
                likes: 55,
                url: "https://www.linkedin.com/posts/sebasbimbi_softrworkflows-nocode-automation-activity-7392168153910509568-SuwG/",
                campaign: "Workflows"
            },
            {
                type: "Sponsored Post",
                description: "Created a video showcasing Softr Workflows.",
                impressions: 1900,
                likes: 60,
                url: "https://www.linkedin.com/posts/sebasbimbi_softrworkflows-activity-7387037520305340416-baNI/",
                campaign: "Workflows"
            },
            {
                type: "Sponsored Post",
                description: "Created a video showcasing Softr Workflows.",
                impressions: 2100,
                likes: 60,
                url: "https://www.linkedin.com/posts/sebasbimbi_softrworkflows-activity-7389953895000596480-1uaQ/",
                campaign: "Workflows"
            }
        ]
    },
    {
        company: "Webflow",
        logo: "/logos/webflow_inc__logo.jpeg",
        posts: [
            {
                type: "Sponsored Post",
                description: "Created a carousel post about 'Webflow Frameworks'.",
                impressions: 13600,
                likes: 230,
                url: "https://www.linkedin.com/posts/webflow-inc-_webflow-frameworks-activity-7163547515496087553-xm-x"
            },
            {
                type: "Sponsored Post",
                description: "Created a carousel post about 'How to become a Webflow Pro from Scratch'.",
                impressions: 8440,
                likes: 170,
                url: "https://www.linkedin.com/posts/webflow-inc-_webflow-pro-activity-7131349370511208448-L5pc"
            },
            {
                type: "Promoted Post",
                description: "Won Webflow Awards - Community MVP 2025.",
                impressions: 19880,
                likes: 310,
                url: "https://www.linkedin.com/posts/webflow-inc-_the-votes-are-in-activity-7373385165777268737-g5od"
            }
        ]
    }
];

const ambassadorData: AmbassadorRole[] = [
    { company: "Webflow", logo: "/logos/webflow_inc__logo.jpeg", year: "2023" },
    { company: "Notion", logo: "/logos/notionhq_logo.jpeg", year: "2025" },
    { company: "Favikon", logo: "/logos/favikon_logo.jpeg", year: "2025" },
    { company: "Torc", logo: "/logos/opentorc_logo.jpeg", year: "2025" }
];

const packagesData: Package[] = [
    {
        title: "Sponsored Post",
        description: "A LinkedIn static post with text/image or video, promoting your brand and chosen angle/message. Written to drive maximum engagement and reach.",
        price: "$750",
        buttonText: "Book Now",
        buttonUrl: "https://cal.com/sebasbimbi/collaboration"
    },
    {
        title: "Series of Posts",
        description: "A mini-series of 3x LinkedIn static posts with text/image or video, promoting your brand and chosen angle/message. Written to drive maximum engagement and reach.",
        price: "$1500",
        buttonText: "Book 3x Posts",
        buttonUrl: "https://cal.com/sebasbimbi/collaboration"
    },
];
const projectsData: Project[] = [
    {
        name: "DSU",
        slug: "dsu",
        category: "Ecom Courses",
        video: "/videos/dsu.mp4"
    },
    {
        name: "Kiba",
        slug: "kiba",
        category: "Digital Marketing",
        video: "/videos/kiba.mp4"
    },
    {
        name: "Phoenix of Gaza XR",
        slug: "phoenix-of-gaza-xr",
        category: "Interactive Dev",
        video: "/videos/gaza.mp4"
    },
    {
        name: "Zephyr-Cloud",
        slug: "zephyr-cloud",
        category: "SaaS",
        link: "https://zephyr-v1.webflow.io/",
        video: "/videos/zephyr.mp4"
    },
    {
        name: "BCN Visuals",
        slug: "bcn-visuals",
        category: "3D Billboards",
        video: "/videos/bcnvisuals.mp4"
    },
    {
        name: "Jamboree",
        slug: "jamboree",
        category: "Fundraiser",
        video: "/videos/jamboree.mp4"
    },
    {
        name: "Head2Core",
        slug: "head2core",
        category: "Non-profit",
        video: "/videos/head2core.mp4"
    },
    {
        name: "LiveTrained",
        slug: "livetrained",
        category: "Online Videos",
        video: "/videos/livetrained.mp4"
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
                <Testimonials recommendations={testimonialsData} menteeTestimonials={menteeTestimonialsData} />
                <Partnerships partnerships={partnershipsData} />
                <Ambassador roles={ambassadorData} />
                <WorkWithMe packages={packagesData} />
                <Footer />
            </main>
        </div>
    );
}
