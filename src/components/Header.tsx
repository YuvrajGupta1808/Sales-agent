import { ChevronDown, Hexagon, Search, ShoppingBag } from "lucide-react";
import { Button } from "./Button";

type HeaderProps = {
  cartCount: number;
  isUsersPage?: boolean;
};

export function Header({ cartCount, isUsersPage = false }: HeaderProps) {
  const homePrefix = isUsersPage ? "/" : "";

  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="CourseCraft home">
        <span className="brand-mark">
          <Hexagon size={21} />
        </span>
        <span>CourseCraft</span>
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        <a href={`${homePrefix}#courses`}>Courses</a>
        <a href={`${homePrefix}#paths`}>Paths</a>
        <a href={`${homePrefix}#pricing`}>For Teams</a>
        <a href="/users">Users</a>
        <a href={`${homePrefix}#community`}>Resources <ChevronDown size={13} /></a>
        <a href={`${homePrefix}#pricing`}>Pricing</a>
      </nav>
      <div className="header-actions">
        <label className="header-search" aria-label="Search courses">
          <input placeholder="Search courses..." />
          <Search size={19} />
        </label>
        <button className="cart-button" type="button" aria-label={`${cartCount} selected courses`}>
          <ShoppingBag size={18} />
          {cartCount > 0 && <span>{cartCount}</span>}
        </button>
        <Button variant="secondary">Sign in</Button>
      </div>
    </header>
  );
}
