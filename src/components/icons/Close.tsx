
import { FunctionComponent, SVGProps } from 'react';

const Close: FunctionComponent<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
      ></path>
    </svg>
  );
};

export default Close;
