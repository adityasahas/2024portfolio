import { Link } from "@nextui-org/react";

const Navbar = () => {
  return (
    <nav className=" ">
      <div className="bg-[#131315] transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] mt-5 rounded-xl px-5 py-3 max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-white text-lg font-bold">
          adityasahas.tech
        </Link>

        <div className="flex space-x-4">
          <Link
            href="/"
            className=" text-white py-2 px-4 rounded-lg hidden md:flex"
          >
            Home.
          </Link>
          <Link
            href="/"
            className=" text-white py-2 px-4 rounded-lg hidden md:flex"
          >
            Works.
          </Link>
          <Link
            href="/"
            className=" text-white py-2 px-4 rounded-lg hidden md:flex"
          >
            Contact.
          </Link>{" "}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
