"use client";

import { useState, useEffect } from 'react';
import Modal from './components/Modal';
import { CgNotes } from "react-icons/cg";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transcriptName, setTranscriptName] = useState('');
  const [navbarColor, setNavbarColor] = useState('bg-black');

  useEffect(() => {
    const handleScroll = () => {
      const firstSection = document.querySelector('.first-section');
      if (firstSection) {
        const rect = firstSection.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          setNavbarColor('bg-black');
        } else {
          setNavbarColor('bg-white');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className={`w-full py-4 ${navbarColor} flex justify-between items-center px-8 sticky top-0 transition-colors duration-300`}>
        <div className="flex items-center">
          <h1 className={`text-xl font-bold ${navbarColor === 'bg-black' ? 'text-white' : 'text-black'}`}>clearcut</h1>
        </div>
        <div className="flex items-center px-6 py-3">
          <button
            className="px-12 py-2 bg-gray-200 text-gray-700 text-sm font-bold rounded mr-4 transition duration-300 hover:bg-pink-700 hover:text-white"
            onClick={() => setIsModalOpen(true)}
          >
            Say Hello
          </button>
          <button className={`flex items-center px-4 py-2 text-gray-400 font-bold text-sm rounded transition duration-300 hover:text-gray-600`}>
            Menu <CgNotes className={`ml-2 text-lg ${navbarColor === 'bg-white' ? 'text-black' : 'text-gray-400'} transition duration-300 hover:text-gray-600`} />
          </button>
        </div>
      </header>

      <main className="flex-1 bg-black">
        <section className="bg-black text-white pb-8 pt-32 first-section">
          <h1 className="text-7xl font-bold px-32 py-0">Great Ideas</h1>
          <h1 className="text-7xl mt-2 px-32 py-0 font-bold text-gray-400">Deserve Great </h1>
          <h1 className="text-7xl mt-2 px-32 py-0 font-bold text-gray-400">Products</h1>
        </section>

        <div className="bg-black pt-16">

          <section className="py-32 px-8 mt-8 rounded-t-3xl bg-white shadow-md">
            <h1 className="text-7xl font-bold ml-64 pt-16 py-0 text-gray-900">Strategic UX Design & Brand Studio.</h1>
            <h2 className="text-xl font-bold ml-64 py-0 text-gray-400">We help entrepreneurs and businesses achieve ambitious dreams by building design centric products and brands.</h2>
            
          </section>

          <section className="py-16 px-8 bg-white shadow-md">
            <h2 className="text-2xl font-bold mb-8 text-black">Featured Work.</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-purple-500 p-16 rounded-lg transition duration-300 hover:shadow-lg hover:scale-105">
                <img src="https://cdn.dribbble.com/users/1333728/screenshots/13988492/autofleet_3d_cars_dribbble.png?compress=1&resize=400x300"
                     width={400}
                     height={300}
                     alt="Picture of the author"
                />
              </div>
              <div className="bg-black p-16 rounded-lg transition duration-300 hover:shadow-lg hover:scale-105">
                <video className="w-full h-full" preload="auto" src="//videos.ctfassets.net/b62jgkkofmz2/6Jtrf2ZLxdzj4iKvU7mFcg/b69a6ff8af4f0fd176d48c37a0e69b43/Intro_Movie_for_AHL_Product_Design.mp4" alt="Video"></video>
              </div>
            </div>
          </section>

          <section className="py-16 px-8 bg-gray-100 rounded-b-3xl">
            <h2 className="text-4xl font-bold pl-16 text-gray-900">Pick Our Brains</h2>
            <h3 className="text-3xl text-gray-600 pl-16 mb-8">News, Blogs, Good Intentions etc.</h3>
            <div className="grid grid-cols-1 my-8 md:grid-cols-3 gap-8">
              <div className="bg-blue-500 p-16 rounded-lg text-white transition duration-300 hover:shadow-lg hover:scale-105">
                <h3 className="text-xl font-bold">Why the Rebrand?</h3>
              </div>
              <div className="bg-gray-400 p-16 rounded-lg border border-gray-200 transition duration-300 hover:shadow-lg hover:scale-105">
                <h3 className="text-xl font-bold">Construction of Logo Typeface & Symbol</h3>
              </div>
              <div className="bg-orange-400 p-16 rounded-lg border border-gray-200 transition duration-300 hover:shadow-lg hover:scale-105">
                <h3 className="text-xl font-bold">News & Updates</h3>
              </div>
            </div>
            <div className='my-16'>
              <h3 className='text-xl font-bold text-gray-400'>Lesser bullshit leads to larger impact.</h3>
              <button className='text-md my-8 font-bold text-gray-700 transition duration-300 hover:text-gray-900'>Know more about us</button>
            </div>
          </section>
        </div>

      </main>

      <footer className="w-full py-4 bg-black shadow-lg overflow-hidden">
        <div className="container mx-auto px-4">
          <p className="text-center my-8 text-white">© 2023 Clearcut Design</p>
        </div>
      </footer>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStartTranscription={(name) => setTranscriptName(name)}
        transcriptName={transcriptName}
      />
    </div>
  );
}
