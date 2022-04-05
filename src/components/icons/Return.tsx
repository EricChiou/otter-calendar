import { FunctionComponent, SVGProps } from 'react';

export const Return: FunctionComponent<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="M19 7v4H5.83l3.58-3.59L8 6l-6 6l6 6l1.41-1.41L5.83 13H21V7z"></path>
    </svg>
  );
};

export default Return;
