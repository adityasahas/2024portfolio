import { BentoCard, BentoGrid } from "./magicui/bento";
import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";
import { IoMdSchool } from "react-icons/io";
import { IoBarChart, IoRocket } from "react-icons/io5";
import { MdGroups } from "react-icons/md";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { FaPencil, FaCode } from "react-icons/fa6";

const features = [
  {
    Icon: FaCode,
    name: "Codin",
    description:
      "Supercharge your developer portfolio with real-world projects.",
    href: "https://codin.app",
    cta: "Learn more",
    background: <img className="absolute  opacity-60" />,
    className: "lg:row-start-1 lg:row-end-3 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: IoMdSchool,
    name: "Tech Optimum",
    description:
      "tech optimum is a 501(c)(3) nonprofit organization that aims to provide free stem education to underprivileged students.",
    href: "https://www.techoptimum.org",
    cta: "Learn more",
    background: (
      <img
        src="https://www.techoptimum.org/digital-divide.jpg"
        className="absolute  opacity-60"
      />
    ),
    className: "lg:row-start-3 lg:row-end-5 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: IoBarChart,
    name: "Perceptify",
    description: "Turning customer data into powerful marketing insights.",
    href: "https://joinperceptify.com",
    cta: "Learn more",
    background: (
      <img
        src="https://www.joinperceptify.com/promotional.png"
        className="absolute -top-3 opacity-60"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-4",
  },
  {
    Icon: IoRocket,
    name: "Launch",
    description:
      "Launch will make your organizations dream website a reality, free of charge.",
    href: "https://launchsite.tech",
    cta: "Learn more",
    background: (
      <img
        src="https://launchsite.tech/thumbnail.png"
        className="absolute  opacity-60"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-4 lg:row-end-5",
  },
  {
    Icon: MdGroups,
    name: "Cal Commit",
    description: "Teaching Students the World of Collaboration",
    href: "https://calcommit.org",
    cta: "Learn more",
    background: (
      <img
        src="https://www.calcommit.org/bears.png"
        className="absolute opacity-60"
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-4 lg:row-end-5",
  },
  {
    Icon: FaMoneyBill1Wave,
    name: "Effinity",
    description:
      "Effinity is a startup that aims to provide financial literacy to students across the globe.",
    href: "https://effinity.ca",
    cta: "Learn more",
    background: <img className="absolute  opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-4",
  },
];

export async function Organizations1() {
  return (
    <>
      <div className="bg-[#131315] transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] rounded-xl max-w-6xl mx-auto mt-5 flex items-center justify-center">
        <h1 className="text-4xl font-bold px-4 py-4">Organizations.</h1>
      </div>
      <BentoGrid className="lg:grid-rows-3">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    </>
  );
}
