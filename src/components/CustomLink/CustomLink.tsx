import { Link, useMatch } from "react-router-dom";

type CustomLinkProps = {
  to: string;
  className?: string;
  activeClassName?: string;
  children?: React.ReactNode;
};

function CustomLink({ children, to, className = "", activeClassName = "", ...props }: CustomLinkProps) {
  const match = useMatch({ path: to, end: false });

  return (
    <Link
      to={to}
      {...props}
      className={match ? `${className} ${activeClassName}` : className}
    >
      {children}
    </Link>
  );
}

export default CustomLink;