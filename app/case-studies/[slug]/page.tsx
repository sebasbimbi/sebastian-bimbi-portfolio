import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const projectsData = [
  {
    name: "Zephyr-Cloud",
    slug: "zephyr-cloud",
    category: "SaaS",
    link: "https://zephyr-v1.webflow.io/",
    description: "A comprehensive SaaS platform designed to streamline cloud operations.",
  },
  {
    name: "Jamboree.org",
    slug: "jamboree",
    category: "Fundraiser",
    description: "A fundraising platform connecting communities with impactful causes.",
  },
  {
    name: "Head2Core",
    slug: "head2core",
    category: "Non-profit",
    description: "A non-profit initiative focused on community development.",
  },
  {
    name: "BCN Visuals",
    slug: "bcn-visuals",
    category: "3D Billboards",
    description: "Cutting-edge 3D billboard experiences for modern advertising.",
  },
  {
    name: "Phoenix of Gaza XR",
    slug: "phoenix-of-gaza-xr",
    category: "Interactive Dev",
    description: "An immersive XR experience telling powerful stories.",
  },
  {
    name: "Kiba",
    slug: "kiba",
    category: "Digital Marketing",
    description: "A digital marketing platform for modern businesses.",
  },
  {
    name: "LiveTrained",
    slug: "livetrained",
    category: "Online Videos",
    description: "Online video platform for professional training and education.",
  },
  {
    name: "DSU",
    slug: "dsu",
    category: "Ecom Courses",
    description: "E-commerce educational platform with comprehensive courses.",
  },
];

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = projectsData.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="w-full min-h-screen bg-white selection:bg-black selection:text-white">
      <Header />

      <main className="pt-32 px-4 md:px-8 pb-20">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto mb-20">
          <div className="mb-8">
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest opacity-50">
              {project.category}
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight mb-8">
            {project.name}
          </h1>

          <p className="text-lg md:text-xl max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </section>

        {/* Project Link */}
        {project.link && (
          <section className="max-w-6xl mx-auto mb-20">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300"
            >
              Visit Live Site →
            </a>
          </section>
        )}

        {/* Placeholder for Case Study Content */}
        <section className="max-w-6xl mx-auto">
          <div className="border-2 border-black p-12 text-center">
            <p className="text-xl font-bold uppercase tracking-widest mb-4">
              Case Study Content Coming Soon
            </p>
            <p className="text-sm opacity-50">
              This is a placeholder for the detailed case study content.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
