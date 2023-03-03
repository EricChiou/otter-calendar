import { CSSProperties, FunctionComponent, SyntheticEvent, PropsWithChildren } from 'react';

type Props = {
  className?: string;
  text?: string;
  style?: CSSProperties;
  click?(e: SyntheticEvent): void;
}

const Button: FunctionComponent<PropsWithChildren<Props>> = ({ children, className, text, style, click }) => {
  return (
    <button
      className={`py-0.5 px-1.5 text-white bg-green active:bg-green-2 ${className}`}
      style={style}
      onClick={click}
    >{text}{children}</button>
  );
};

export default Button;
