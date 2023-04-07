import { CSSProperties, FC, SyntheticEvent, PropsWithChildren, useMemo } from 'react';

type Props = {
  type?: 'default' | 'inline';
  className?: string;
  text?: string;
  style?: CSSProperties;
  click?(e: SyntheticEvent): void;
}

const Button: FC<PropsWithChildren<Props>> = ({ type = 'default', children, className, text, style, click }) => {
  const buttonClass = useMemo(() => {
    switch (type) {
      case 'inline':
        return 'px-0.5 text-green active:text-green-2';
      default:
        return 'px-1.5 text-white bg-green active:bg-green-2';
    }
  }, [type]);

  return (
    <button
      className={`py-0.5 ${buttonClass} ${className}`}
      style={style}
      onClick={click}
    >
      {text}{children}
    </button>
  );
};

export default Button;
