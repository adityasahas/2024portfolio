import React from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "@nextui-org/react";
import { IoDocumentText } from "react-icons/io5";

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
    {
      name: "Resume",
      url: "/resume.pdf",
      icon: IoDocumentText,
    },
  ];

  return (
    <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-none md:flex md:flex-row md:space-x-4 md:space-y-0 max-w-6xl mx-auto justify-center md:justify-between">
      {socials.map((social, index, arr) => (
        <div
          key={social.name}
          className={`px-4 py-4 transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] rounded-xl flex flex-row items-center gap-2 w-full ${
            arr.length % 2 !== 0 && index === arr.length - 1 ? "col-span-2" : ""
          }`}
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
