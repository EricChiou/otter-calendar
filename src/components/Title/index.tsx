import { FC, ReactNode, PropsWithChildren, Children, isValidElement } from 'react';

interface Props extends PropsWithChildren {
  title: string;
  className?: string;
  extra?: ReactNode;
}

enum Name {
  Extra = 'extra',
}

const Extra: FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};
Extra.displayName = Name.Extra;

const Title: FC<Props> = ({ children, className, title, extra }) => {
  function renderChild(name: Name) {
    return Children.map(children, (child) => {
      if (isValidElement(child) && (child.type as FC).displayName === name) {
        return child;
      }
    });
  }

  return (<>
    <div className={`relative ${className}`}>
      <div className="mb-1 text-2xl font-bold">{title}</div>
      <div className="absolute top-0 right-0 bottom-0">
        {extra}
        {renderChild(Name.Extra)}
      </div>
      <hr></hr>
    </div>
  </>);
};

export { Extra };
export default Title;
