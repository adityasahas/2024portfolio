import React from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "@nextui-org/react";
export default function Socials() {
  const socials = [
    {
      name: "GitHub",
      url: "https://github.com/adityasahas",
      icon: FaGithub,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/adityasahas/",
      icon: FaLinkedin,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/bababooeyacc/",
      icon: FaInstagram,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/adityasahas",
      icon: FaTwitter,
    },
    {
      name: "Email",
      url: "mailto:contact@adityasahas.tech",
      icon: MdEmail,
    },
  ];

  return (
    <div className="mt-5 flex flex-row space-x-4 max-w-6xl mx-auto justify-center md:justify-between">
      {socials.map((social) => (
        <div
          key={social.name}
          className="px-4 py-4 bg-[#131315] rounded-3xl flex flex-row items-center gap-2 w-full"
        >
          <social.icon size={30} color="#FFF" />
          <Link
            href={social.url}
            className="text-white ml-2"
            isExternal
            showAnchorIcon
          >
            {social.name} 
          </Link>
        </div>
      ))}
    </div>
  );
}
