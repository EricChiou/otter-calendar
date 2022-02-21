import { FunctionComponent, SVGProps } from 'react';

export const Left: FunctionComponent<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" {...props}>
      <path d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6l1.41-1.42z" fill="currentColor"></path>
    </svg>
  );
};

export default Left;