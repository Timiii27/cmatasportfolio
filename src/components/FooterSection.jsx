const FooterSection = () => {
  return (
    <footer id="contact" className="w-full bg-white text-black py-20 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-12">
        <div className="space-y-4">
          <h2 className="font-serif text-4xl md:text-5xl italic">Let's create together</h2>
          <a 
            href="mailto:contact@claramatas.com" 
            className="block text-xl md:text-2xl hover:text-gray-500 transition-colors border-b border-black pb-1"
          >
            contact@claramatas.com
          </a>
        </div>

        <div className="flex gap-8 text-sm uppercase tracking-widest">
          <a href="#" className="hover:text-gray-500 transition-colors">Instagram</a>
          <a href="#" className="hover:text-gray-500 transition-colors">LinkedIn</a>
        </div>

        <div className="pt-20 w-full flex justify-between text-xs text-gray-400 uppercase tracking-widest">
          <span>© {new Date().getFullYear()} CMATAS</span>
          <span>Madrid, Spain</span>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
