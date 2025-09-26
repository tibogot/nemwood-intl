import { forwardRef } from "react";

const Logo = forwardRef((props, ref) => {
  return (
    <svg
      // @ts-ignore
      ref={ref}
      width="129"
      height="83"
      viewBox="0 0 129 83"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 0.999999L33.8572 54.7016L64.234 6.81841L73.6491 35.8214L95.3511 16.971L120.665 82.25L126.468 16.971"
        stroke="white"
        strokeWidth="3"
      />
    </svg>
  );
});

export default Logo;
