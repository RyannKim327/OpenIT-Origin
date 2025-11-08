import Footer from "../component/footer";

export default function About() {
  return (
    <div>
      {/* Section 1: Who We Are */}
      <section className="bg-white text-gray-800 py-16 px-6 md:px-20 mb-10 mt-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Who We Are</h2>
          <p className="text-lg mb-20">
            A dedicated team providing real-time earthquake data. Our purpose is to empower communities with accurate seismic information to reduce the impact of natural disasters.
          </p>

          <div className="grid md:grid-cols-2 gap-10 text-left">
            <div className="bg-white shadow-sm rounded-lg p-7">
              <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
              <p className="text-base">
                To deliver fast, reliable, and accessible earthquake monitoring to every corner of the globe, helping people stay informed and safe when seconds matter most.
              </p>
            </div>
            <div className="bg-white shadow-sm rounded-lg p-7">
              <h3 className="text-2xl font-bold mb-2">Our Vision</h3>
              <p className="text-base">
                A world where every individual, family, and community is equipped with the tools and knowledge to respond to seismic events swiftly and effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: What We Do */}
      <section className="bg-[#f9f9f9] text-gray-800 py-16 px-6 md:px-20">
        <div className="max-w-4xl mx-auto mb-10">
          <h2 className="text-5xl font-bold mb-6 mt-10 text-center">What We Do</h2>
          <p className="text-lg mb-10 text-center">
            Our platform combines cutting-edge technology with comprehensive data analysis to provide you with the most accurate earthquake information available.
          </p>

          <div className="grid md:grid-cols-3 gap-40">
            <div className="text-center bg-white rounded-lg p-7 w-80 shadow-md mt-8">
              <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold"></span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Monitoring</h3>
              <p className="text-base">
                Track earthquakes as they happen with live data feeds from seismic networks worldwide.
              </p>
            </div>
            <div className="text-center bg-white rounded-lg p-7 w-80 shadow-md mt-8">
              <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold"></span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Data Analysis</h3>
              <p className="text-base">
                Advanced algorithms process seismic data to provide accurate magnitude and location information.
              </p>
            </div>
            <div className="text-center bg-white rounded-lg p-7 w-80 shadow-md mt-8">
              <div className="bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold"></span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Alert System</h3>
              <p className="text-base">
                Receive instant notifications about significant seismic events in your area or globally.
              </p>
            </div>
          </div>
        </div>
      </section>

    <section className="bg-white text-gray-900 py-16 px-6 md:px-20">
      <div className="max-w-3xl mx-auto mb-10 mt-10">
        <h2 className="text-5xl font-bold mb-8 text-center">Emergency Contacts</h2>
        <ul className="space-y-8">
          <li className="border-l-4 border-red-500 pl-4 bg-white shadow-lg rounded-lg p-5">
            <h3 className="text-xl font-semibold">National Disaster Risk Reduction & Management Council (NDRRMC)</h3>
            <p>Hotline: <span className="font-medium">+63-2-8911-1406</span></p>
            <p>Emergency Number: <span className="font-medium">911</span></p>
          </li>
          <li className="border-l-4 border-yellow-500 pl-4 bg-white shadow-lg rounded-lg p-5">
            <h3 className="text-xl font-semibold">Philippine Institute of Volcanology and Seismology (PHIVOLCS)</h3>
            <p>Hotline: <span className="font-medium">+63-2-8426-1468</span></p>
          </li>
          <li className="border-l-4 border-orange-500 pl-4 bg-white shadow-lg rounded-lg p-5">
            <h3 className="text-xl font-semibold">Local Fire & Rescue</h3>
            <p>Emergency Number: <span className="font-medium">911</span></p>
          </li>
          <li className="border-l-4 border-red-600 pl-4 bg-white shadow-lg rounded-lg p-5">
            <h3 className="text-xl font-semibold">Red Cross Emergency Hotline</h3>
            <p>Hotline: <span className="font-medium">+63-2-790-2300</span></p>
            <p>Emergency Number: <span className="font-medium">143</span></p>
          </li>
        </ul>
      </div>
    </section>
    <Footer />
    </div>
  );
}