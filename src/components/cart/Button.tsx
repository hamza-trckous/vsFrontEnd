export const Button = ({
  text,
  onClick,
  className,
  children,
}: {
  text: string;
  onClick: () => void;
  className: string;
  children?: React.ReactNode;
}) => {
  return (
    <button className={className} onClick={onClick}>
      {children} {text}
    </button>
  );
};
