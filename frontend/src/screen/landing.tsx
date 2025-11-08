import Footer from "../component/footer";
import Map from "../layout/map";

export default function Landing() {
  return (
    <div className="h-full w-full">
      <section className="relative bg-gradient-to-br from-red-400 via-[#CE2503] to-orange-100 h-full w-full flex items-center justify-start">
        <div
          className="absolute inset-0 opacity-30"
        // style={{
        //   backgroundImage: "url('src/assets/map.png')",
        //   backgroundRepeat: "no-repeat",
        //   backgroundSize: "cover",
        //   backgroundAttachment: "fixed",
        // }}
        >
          <img src="src/assets/map.png" alt="World Map" className="w-full h-full object-cover" />
          {/* <iframe */}
          {/*   src="https://www.google.com/maps/embed/v1/place?q=Ibabang+Iyam&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8" */}
          {/*   title="Location" */}
          {/*   loading="lazy" */}
          {/*   allowFullScreen={false} */}
          {/*   className="h-full w-full dark:grayscale dark:invert transition ease-in delay-100" */}
          {/* /> */}
        </div>

        {/* Content */}
        <div className="relative z-10 pl-6 lg:pl-20 xl:pl-40 ">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              <span className="text-black">Stay</span> Ahead of the
              <span className="block">
                <span className="text-black">Shakes</span> with
              </span>
              <span className="block text-white/90">
                <span className="text-black">Quake</span>Watch
              </span>
            </h1>

            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Real-time earthquake alerts, live tracking, and safety resources
              all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/map"
                className="bg-white text-gray-800 font-semibold py-4 px-8 rounded-lg hover:bg-[#CE2503] border-white transition-colors duration-200 shadow-lg"
              >
                View Map
              </a>
              <a
                href="/about"
                className="border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-gray-800 transition-colors duration-200"
              >
                Know More
              </a>
            </div>
          </div>
        </div>

        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl transform translate-x-1/2"></div>
      </section>

      <Map />

      <section className="flex flex-col items-center justify-center px-6 lg:px-20 xl:px-40 bg-white w-full py-20 mb-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 mt-10">
            Preparedness & Safety Resources
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Access expert guides and tools to prepare for earthquakes and
            protect your love ones
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-red-200 rounded-lg flex items-center justify-center mx-auto mb-6">
                <img
                  src="src/assets/home.png"
                  alt="Home Safety"
                  className="w-8 h-8"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Home Safety
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Get tips to secure your home and create safe zones for
                earthquake protection.
              </p>
              <button className="text-red-600 font-semibold text-sm hover:text-red-700 transition-colors">
                Read more
              </button>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-red-200 rounded-lg flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 bg-red-200 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <img
                    src="src/assets/aid.png"
                    alt="Community"
                    className="w-8 h-8"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Emergency Kits
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                See how to secure your home and create safe zones for earthquake
                protection.
              </p>
              <button className="text-red-600 font-semibold text-sm hover:text-red-700 transition-colors">
                Read more
              </button>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-red-200 rounded-lg flex items-center justify-center mx-auto mb-6">
                <img
                  src="src/assets/community.png"
                  alt="Community"
                  className="w-8 h-8"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Community
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Find how to secure your home and create safe zones for
                earthquake protection.
              </p>
              <button className="text-red-600 font-semibold text-sm hover:text-red-700 transition-colors">
                Read more
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
