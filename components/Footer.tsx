export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-100 bg-white mt-12 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-[14px] text-gray-500 font-medium">
          © {new Date().getFullYear()} Portal Berita. All rights reserved.
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[14px] text-gray-500 font-medium">
          <a href="#" className="hover:text-black transition-colors">Help</a>
          <a href="#" className="hover:text-black transition-colors">Status</a>
          <a href="#" className="hover:text-black transition-colors">About</a>
          <a href="#" className="hover:text-black transition-colors">Careers</a>
          <a href="#" className="hover:text-black transition-colors">Press</a>
          <a href="#" className="hover:text-black transition-colors">Privacy</a>
          <a href="#" className="hover:text-black transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
