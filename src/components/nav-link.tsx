import { Link, LinkProps, useLocation } from "react-router-dom";

interface NavLinkProps extends LinkProps {}

export function NavLink({ ...rest }: NavLinkProps) {
  const { pathname } = useLocation();
  return (
    <Link
      {...rest}
      data-active={pathname === rest.to}
      className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[active=true]:text-foreground"
    />
  );
}
