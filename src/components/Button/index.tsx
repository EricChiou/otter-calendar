import { FunctionComponent, SyntheticEvent } from 'react';

type Props = {
  text: string;
  click?(e: SyntheticEvent): void;
}

const Button: FunctionComponent<Props> = ({ text, click }) => {
  return (
    <button
      className="py-0.5 px-1 text-white bg-green active:bg-green-2"
      onClick={click}
    >{text}</button>
  );
};

export default Button;
