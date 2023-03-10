import { FunctionComponent, SVGProps } from 'react';

export const Login: FunctionComponent<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5l-5-5zm9
           12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z">
      </path>
    </svg>
  );
};

export default Login;
