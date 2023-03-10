import { FunctionComponent, ReactNode } from 'react';

interface Props {
  title: string;
  className?: string;
  extra?: ReactNode;
}

const Modal: FunctionComponent<Props> = ({ className, title, extra }) => {
  return (<>
    <div className={`relative ${className}`}>
      <div className={`mb-1 text-2xl font-bold ${className}`}>{title}</div>
      {extra && <div className="absolute top-0 right-0 bottom-0">{extra}</div>}
      <hr></hr>
    </div>
  </>);
};

export default Modal;
