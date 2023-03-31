import { FC, SVGProps } from 'react';

const Add: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
    </svg>
  );
};

export default Add;
