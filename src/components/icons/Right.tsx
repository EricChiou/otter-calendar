import { FunctionComponent, SVGProps } from 'react';

export const Right: FunctionComponent<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" {...props}>
      <path d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.42z" fill="currentColor"></path>
    </svg>
  );
};

export default Right;
