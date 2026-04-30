export default function PageOrnament() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 w-full h-full z-5"
      viewBox="0 0 1440 15000"
      preserveAspectRatio="xMidYMin slice"
      fill="none"
    >
      {/* Mobile Path: High Density */}
      <path
        className="md:hidden"
        d="M 850 -50 
           C 1600 400, -400 800, 720 1200
           S 1800 1600, 400 2000
           S -200 2400, 800 2800
           S 1600 3200, 500 3600
           S 0 4000, 720 4400
           S 1800 4800, 400 5200
           S -200 5600, 800 6000
           S 1600 6400, 500 6800
           S 0 7200, 720 7600
           S 1800 8000, 400 8400
           S -200 8800, 800 9200
           S 1600 9600, 500 10000
           S 0 10400, 720 10800
           S 1800 11200, 400 11600
           S -200 12000, 800 12400
           S 1600 12800, 500 13200
           S 0 13600, 720 14000
           S 1800 14400, 400 14800
           S -200 15200, 800 15600"
        stroke="rgba(193, 154, 91, 0.45)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Desktop Path: Original Elegant Flow */}
      <path
        className="hidden md:block"
        d="M 850 -50 
           C 1600 600, -400 1400, 720 2200
           S 1800 3200, 400 4200
           S -200 5200, 800 6200
           S 1600 7200, 500 8200
           S 0 9200, 720 10200
           S 1800 11200, 400 12200
           S -200 13200, 800 14200
           S 1600 15200, 500 16200"
        stroke="rgba(193, 154, 91, 0.45)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
