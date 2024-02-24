import Image from "next/image";
import NameAndGitandSpotify from "@/components/section2";
import Socials from "@/components/socials";
import {Organizations1} from "@/components/organizations";
import Contact from "@/components/contact";
export default function Home() {
  return (
    <>
      <NameAndGitandSpotify />
      <Socials />
      <Organizations1 />
      <Contact />
    </>
  );
}
