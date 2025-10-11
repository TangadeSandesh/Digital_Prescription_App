import { Link, NavLink } from 'react-router-dom';

export default function Home() {
  const navLinks = [
    { to: '/prescribe', label: 'Prescribe' },
  ];

  return (
    <section className="flex flex-col mt-6 items-center justify-center min-h-[60vh] gap-6 text-center px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-saffron">
        Welcome to Dr.Prescribe
      </h1>

      <p className="text-base md:text-lg max-w-xl text-indigo">
        India’s simplest way to generate digital prescriptions—accessible for busy doctors, secure for professionals. Mobile-friendly, fast, and always available!
      </p>

      {/* ✅ YouTube Video (Autoplay + Muted) */}
      <div className="w-full max-w-3xl aspect-video mt-6 rounded-2xl overflow-hidden shadow-lg">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/zL98IVIzjGU?autopla y=1&rel=0&modestbranding=1"
          title="DR.Prescribe Introduction"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      {/* 🩺 Start Prescribing Button */}
      <Link
        to="/prescribe"
        className="mt-4 bg-saffron text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-orange-500 transition-all duration-300"
      >
        Start Prescribing
      </Link>
    </section>
  );
}
