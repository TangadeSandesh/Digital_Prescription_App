import { Youtube, Linkedin, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-indigo text-center text-indiawhite py-4 mt-6 text-sm flex flex-col items-center gap-3">
      
      {/* 🌐 Social Media Icons */}
      <div className="flex gap-5">
        <a
          href="https://www.youtube.com/@yourchannel"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-saffron transition-colors"
        >
          <Youtube size={22} />
        </a>

        <a
          href="https://www.linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-saffron transition-colors"
        >
          <Linkedin size={22} />
        </a>

        <a
          href="https://www.instagram.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-saffron transition-colors"
        >
          <Instagram size={22} />
        </a>

        <a
          href="https://github.com/yourgithub"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-saffron transition-colors"
        >
          <Github size={22} />
        </a>
      </div>
      <p>© 2025 Dr.Prescribe | Inspired by the "Swadeshi" moment</p>

    </footer>
  );
}
