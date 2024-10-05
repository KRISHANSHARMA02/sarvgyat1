
import Image from 'next/image';
import Link from 'next/link';
import picture from '@/public/image.jpeg';

const Navbar = () => (
    <nav className="w-full flex items-center">
        <Link href="/" className="px-5 flex justify-between w-full items-center shadow-md">
            {/* Heading with orange 'O' */}
            <h1 className=" text-[1.6em] font-bold">
                Learn<span className="text-orange-600">O</span>sphere.in
            </h1>

            {/* Logo next to the heading */}
            <div className="ml-2 mx-7 mb-3 rounded-full">
                <Image
                    src={picture}
                    alt="LearnOsphere Logo"
                    width={180}
                    height={100}
                />

            </div>
        </Link>
    </nav>
);

export default Navbar;
