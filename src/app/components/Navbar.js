import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/NexSys_Labs_logo.png"
            alt="NexSys Labs"
            width={100}
            height={24}
            priority
          />
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://www.nex-sys.tech/"
            className="text-sm font-medium text-white/90 hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Main Nexsys Website
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
