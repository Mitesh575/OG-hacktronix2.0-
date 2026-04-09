import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Galaxy from "../components/Galaxy";
import TargetCursor from "../components/TargetCursor";
import ProfileCard from "../components/ui/ProfileCard";
import hackLogo from "../images/hack-logo.png";
import PrabhuImg from "../images/Prabhu.jpeg";
import SushmithaImg from "../images/Sushmitha.jpeg";
import VikashRajImg from "../images/VikashRaj.jpeg";
import MageshImg from "../images/Magesh.jpeg";
import ArunNehruImg from "../images/Arun Nehru.jpeg";
import MiteshKumarImg from "../images/Mitesh Kumar.jpeg";
import GopikaImg from "../images/Gopika.jpeg";
import DharshiniImg from "../images/Dharshini.jpeg";
import PriyaDharshiniImg from "../images/Priya Dharshini.jpeg";
import HariniImg from "../images/harini.jpeg";
import TimothyKelvinImg from "../images/Timothy Kelvin.jpeg";
import ShamKumaarImg from "../images/Sham Kumaar.jpeg";
import AshikaImg from "../images/Ashika.jpeg";
import BavyaImg from "../images/Bavya.jpeg";
import DSaiTejaswiniImg from "../images/D Sai Tejaswini.jpeg";
import DilliImg from "../images/Dilli.jpeg";
import SujayaImg from "../images/Sujaya Pon Gita P.jpeg";
import MuhilanImg from "../images/Muhilan.jpeg";
import GayathriImg from "../images/Gayathri.jpeg";
import SreeLekshmiImg from "../images/Sree Lekshmi J U.jpeg";

const teamSections = [
  {
    title: "Core Organizing Committee",
    color: "from-red-500 to-orange-400",
    members: [
      { name: "Prabhu", role: "President", image: PrabhuImg, linkedinUrl: "https://www.linkedin.com/in/prabhu-s-b20018286/" },
      { name: "Sushmithaa R B", role: "Vice President", image: SushmithaImg, linkedinUrl: "https://www.linkedin.com/in/sushmithaa-balamurugan" },
    ],
  },
  {
    title: "Secretariat",
    color: "from-blue-500 to-cyan-400",
    members: [
      { name: "Vikash Raaj S", role: "Secretary", image: VikashRajImg, linkedinUrl: "https://www.linkedin.com/in/vikash-raaj-s-b191792a8" },
      { name: "Magesvaran B", role: "Operations Head", image: MageshImg, linkedinUrl: "https://www.linkedin.com/in/magesvaran-b-219064283" },
    ],
  },
  {
    title: "Tech Domain",
    color: "from-purple-500 to-pink-400",
    members: [
      { name: "Arun Nehru", role: "Tech Head", image: ArunNehruImg, linkedinUrl: "https://www.linkedin.com/in/arun-nehru-nura14" },
      { name: "DILLI BASKARAN K", role: "Tech Associate", image: DilliImg, linkedinUrl: "https://www.linkedin.com/in/dilli-baskaran-k-1145952a0" },
      { name: "Mitesh", role: "Tech Associate", image: MiteshKumarImg },
      { name: "Gopika", role: "Tech Associate", image: GopikaImg, linkedinUrl: "https://www.linkedin.com/in/gopika-t-9ab453326/" },
    ],
  },
  {
    title: "Design Domain",
    color: "from-emerald-500 to-teal-400",
    members: [
      { name: "Sree Lekshmi J U", role: "Design Head", image: SreeLekshmiImg, nameSize: "16px", bgSize: "140%", bgPosition: "center center", linkedinUrl: "https://www.linkedin.com/in/sree-lekshmi-j-u-4b3678296/" },
      { name: "Dharshini S", role: "Design Vice Head", image: DharshiniImg, linkedinUrl: "https://www.linkedin.com/in/dharshini-s-624ab932a" },
      { name: "D Sai Tejaswini", role: "Design Associate", image: DSaiTejaswiniImg, linkedinUrl: "https://www.linkedin.com/in/darapureddy-sai-tejaswini-569303402" },
      { name: "SHAWROU PRASATH V", role: "Design Associate", nameSize: "15px" },
    ],
  },
  {
    title: "Content & Documentation",
    color: "from-amber-500 to-yellow-400",
    members: [
      { name: "MV PRIYADHARSHINI", role: "Content Head", image: PriyaDharshiniImg, linkedinUrl: "https://www.linkedin.com/in/priyadharshini-manivasahan-31a930292" },
      { name: "Harini S", role: "Content Associate", image: HariniImg, linkedinUrl: "https://www.linkedin.com/in/harinisivakumar06" },
      { name: "Sujaya Pon Gita P", role: "Content Associate", image: SujayaImg, bgSize: "115%" },
      { name: "Gayathri S", role: "Content Associate", image: GayathriImg, linkedinUrl: "https://www.linkedin.com/in/gayathri-s-692978327" },
    ],
  },
  {
    title: "Media & Marketing",
    color: "from-cyan-500 to-blue-400",
    members: [
      { name: "Muhilan", role: "Media Head", image: MuhilanImg, bgSize: "150%", bgPosition: "center center" },
      { name: "Timothy", role: "Media Associate", image: TimothyKelvinImg, linkedinUrl: "https://www.linkedin.com/in/timothy-kelvin-m-17b264284" },
      { name: "SHAMKUMAR V", role: "Media Associate", image: ShamKumaarImg, linkedinUrl: "https://www.linkedin.com/in/sham-kumar-0a135a340" },
    ],
  },
  {
    title: "Hosting Team",
    color: "from-rose-500 to-pink-400",
    members: [
      { name: "ARUNDHATHI H", role: "Hosting Head" },
      { name: "Sushil", role: "Hosting Vice Head" },
      { name: "Pavatharani A", role: "Hosting Associate" },
      { name: "Gayathri", role: "Hosting Associate", image: GayathriImg, linkedinUrl: "https://www.linkedin.com/in/gayathri-s-692978327" },
      { name: "Ashika S Acharia", role: "Hosting Associate", image: AshikaImg, linkedinUrl: "https://www.linkedin.com/in/ashika-s-acharia-b85073332" },
      { name: "BAVYASREE K", role: "Hosting Associate", image: BavyaImg, linkedinUrl: "https://www.linkedin.com/in/bavyasree-k" },
    ],
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0.1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const gradientMap = {
  "from-red-500 to-orange-400": "linear-gradient(145deg, rgba(239, 68, 68, 0.4) 0%, rgba(249, 115, 22, 0.3) 100%)",
  "from-blue-500 to-cyan-400": "linear-gradient(145deg, rgba(59, 130, 246, 0.4) 0%, rgba(34, 211, 238, 0.3) 100%)",
  "from-purple-500 to-pink-400": "linear-gradient(145deg, rgba(168, 85, 247, 0.4) 0%, rgba(236, 72, 153, 0.3) 100%)",
  "from-emerald-500 to-teal-400": "linear-gradient(145deg, rgba(16, 185, 129, 0.4) 0%, rgba(20, 184, 166, 0.3) 100%)",
  "from-amber-500 to-yellow-400": "linear-gradient(145deg, rgba(245, 158, 11, 0.4) 0%, rgba(250, 204, 21, 0.3) 100%)",
  "from-cyan-500 to-blue-400": "linear-gradient(145deg, rgba(6, 182, 212, 0.4) 0%, rgba(59, 130, 246, 0.3) 100%)",
  "from-rose-500 to-pink-400": "linear-gradient(145deg, rgba(244, 63, 94, 0.4) 0%, rgba(236, 72, 153, 0.3) 100%)",
};

function TeamCard({ member, gradient, index }) {
  const innerGradient = gradientMap[gradient] || gradientMap["from-cyan-500 to-blue-400"];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.06 }}
      className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] max-w-[280px]"
    >
      <ProfileCard
        avatarUrl={member.image}
        name={member.name}
        title={member.role}
        innerGradient={innerGradient}
        bgSize={member.bgSize}
        bgPosition={member.bgPosition}
        nameSize={member.nameSize}
        linkedinUrl={member.linkedinUrl}
      />
    </motion.div>
  );
}

export default function TeamPage() {
  return (
    <div className="relative min-h-screen">
      <TargetCursor variant="cyan" />
      <div className="fixed inset-0 -z-10 opacity-80">
        <Galaxy mouseInteraction={false} density={0.65} glowIntensity={0.2} saturation={0.08} />
      </div>

      <nav className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-[rgba(10,10,14,0.72)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="cursor-target">
            <img src={hackLogo} alt="HACKTRONIX" className="h-16 w-auto md:h-20 shrink-0 object-contain" />
          </Link>
        </div>
      </nav>

      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-40 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-black tracking-tight text-white md:text-7xl" style={{ fontFamily: "'Exo_2', sans-serif" }}>
              Meet the people behind <span className="text-[#ff2d55]">HackTronix</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-400">
              A passionate group of organizers, designers, and developers working together to deliver an unforgettable hackathon experience.
            </p>
          </motion.div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl space-y-20 px-4 pb-32 sm:px-6 lg:px-8">
        {teamSections.map((section, si) => (
          <section key={section.title}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-8 text-2xl font-bold text-white md:text-3xl text-center font-['Exo_2']"
            >
              {section.title}
            </motion.h2>

            <div className="flex flex-wrap justify-center gap-6">
              {section.members.map((m, mi) => (
                <TeamCard key={`${section.title}-${m.name}`} member={m} gradient={section.color} index={mi} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}