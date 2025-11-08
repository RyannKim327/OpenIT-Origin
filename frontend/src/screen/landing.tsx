export default function Landing() {
  return (
    <div className="min-h-screen ">
      <section className="relative bg-gradient-to-br from-red-400 via-[#CE2503] to-orange-100 min-h-screen flex items-center justify-start overflow-x-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="src/assets/map.png" 
            alt="World Map" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 pl-6 lg:pl-16 xl:pl-24">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              <span className="text-black">Stay</span> Ahead of the{" "}
              <span className="block"><span className="text-black">Shakes</span> with</span>
              <span className="block text-white/90"><span className="text-black">Quake</span>Watch</span>
            </h1>
            
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Real-time earthquake alerts, live tracking, and safety resources all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-gray-800 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg">
                View Map
              </button>
              <button className="border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-gray-800 transition-colors duration-200">
                Know More
              </button>
            </div>
          </div>
        </div>

        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl transform translate-x-1/2"></div>
      </section>
    </div>
  );
}
