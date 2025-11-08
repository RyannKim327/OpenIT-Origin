export default function Map() {
  return (
    <div className="flex flex-col justify-evenly items-center w-full h-full snap-start">
      {/* <iframe */}
      {/*   className="pointer-events-none w-1/3 h-1/3" */}
      {/*   scrolling="yes" */}
      {/*   marginheight="0" */}
      {/*   marginwidth="0" */}
      {/*   src="https://maps.google.com/maps?&amp;hl=en&amp;t=&amp;z=2&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" */}
      {/* ></iframe> */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-2xl">Monitor Earthquake</h1>
        <h3 className="font-normal text-black">
          Track seismic activity in real time with our interactive map.
        </h3>
      </div>
      <div className="w-1/3 rounded-2xl overflow-hidden">
        <iframe
          className="w-full aspect-video"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
          id="gmap_canvas"
          src="https://maps.google.com/maps?hl=en&amp;q=Philippines&amp;t=&amp;z=6&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        ></iframe>
        <h1>Recent Earthquake Activity</h1>
      </div>
    </div>
  );
}
