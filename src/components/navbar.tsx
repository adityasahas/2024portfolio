import Link from "next/link";

const Navbar = () => {
  return (
    <nav className=" ">
      <div className="bg-[#131315] mt-5 rounded-3xl px-5 py-3 max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-white text-lg font-bold">
          adityasahas.tech
        </Link>

        <div className="flex space-x-4">
          <Link href="/home" className=" text-white py-2 px-4 rounded-lg">
            Home.
          </Link>
          <Link href="/works" className=" text-white py-2 px-4 rounded-lg">
            Works.
          </Link>
          <Link href="/contact" className=" text-white py-2 px-4 rounded-lg">
            Contact.
          </Link>{" "}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
