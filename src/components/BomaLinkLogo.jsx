// BomaLinkLogo.jsx - Add this as a new component file

export const BomaLinkLogo = ({ width = 40, height = 40 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* Outer B shape */}
      <path
        d="M 20 15 L 50 15 Q 65 15 65 30 Q 65 40 52 42 L 65 42 Q 75 42 75 55 Q 75 70 50 70 L 20 70 L 20 15 Z"
        fill="#FF007F"
        stroke="#FF007F"
        strokeWidth="0"
      />
      
      {/* Inner cutout for B (left side) */}
      <path
        d="M 32 25 L 50 25 Q 58 25 58 32 Q 58 38 50 38 L 32 38 Z"
        fill="#6E10A6"
      />
      
      {/* Inner cutout for B (right side) */}
      <path
        d="M 32 45 L 50 45 Q 60 45 60 55 Q 60 62 50 62 L 32 62 Z"
        fill="#6E10A6"
      />
      
      {/* House shape inside (roof) */}
      <path
        d="M 42 35 L 52 35 L 47 28 Z"
        fill="#6E10A6"
      />
      
      {/* House shape inside (body) */}
      <rect
        x="42"
        y="35"
        width="10"
        height="10"
        fill="#6E10A6"
      />
    </svg>
  );
};

export default BomaLinkLogo;