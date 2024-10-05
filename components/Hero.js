'use client'
import React, { useEffect } from 'react';
import Image from 'next/image';
import backgroundImage from '@/public/banner-image.jpeg'; // Update this path to your background image
import btnSvg1 from '@/public/student-svgrepo-com.jpeg';
import btnSvg2 from '@/public/teacher-svgrepo-com.jpeg'; 
import AOS from 'aos';
import Link from 'next/link';

const Hero = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize AOS with custom options
    }, []);

    return (
        <>
            <section  data-aos="fade-up" className="relative flex items-center justify-center h-[87vh] w-[96vw] m-auto mt-5 ">
                {/* Background Image */}
                <div className="absolute inset-0 bg-cover bg-center  rounded-2xl "
                    style={{
                        backgroundImage: `url(${backgroundImage.src})`,
                        opacity: 0.8,
                    }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-2xl"/> {/* Optional overlay */}
                <div className="relative z-10 w-[60vw] mx-auto text-center text-white px-4 py-24">
                    <h1 className="text-4xl font-bold mb-4">Your Heading Here</h1>
                    <h2 className="text-2xl mb-4">Your Subheading Here</h2>
                    <p className="mb-8">
                        This is some content that describes the purpose of this section. It can be a few sentences long and should convey your message effectively.
                    </p>
                </div>
            </section>
            <div data-aos="fade-up" className="flex flex-wrap gap-4 justify-around items-center space-x-4 m-10 font-poppins text-md font-bold">
                <Link href ='/Student' className='flex flex-col items-center bg-orange-200 py-8 gap-1 px-28 rounded-md shadow-xl w-[370px]'>
                    <Image src={btnSvg1} alt='Book Educator' width={80} height={60} />
                     <p>Book Educator</p></Link>
                
                <Link href ='/Signin' className='flex flex-col items-center bg-blue-200 gap-1 py-8 px-28 rounded-md shadow-xl w-[370px]'>
                    <Image src={btnSvg2} alt='Become Educator' width={80} height={60} />
                    <p>Become Educator</p>
                </Link>
            </div>
        </>
    );
};

export default Hero;
;
