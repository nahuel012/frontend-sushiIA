import React from "react";
import {
  Navbar as Nav,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Switch,
} from "@nextui-org/react";
import { useTheme } from "../../context/ThemeContext";
import { SunIcon } from "./SunIcon";
import { MoonIcon } from "./MoonIcon";

export const Navbar = () => {
  const { isDark, setIsDark } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: "Menú", href: "#menu" },
    { name: "Nosotros", href: "#about" },
    { name: "Contacto", href: "#contact" },
  ];

  return (
    <Nav
      maxWidth="xl"
      className="shadow-custom bg-background/70 backdrop-blur-md overflow-hidden fixed"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand>
        <Link href="#home" className="font-bold text-inherit text-xl">
          <span className="text-primary">Sushi</span>
          <span className="text-secondary">IA</span>
          <span className="ml-2">🍣</span>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.name}>
            <Link
              href={item.href}
              className="text-content hover:text-primary transition-theme"
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <div className="hidden sm:flex">
          <Switch
            isSelected={isDark}
            size="lg"
            color="secondary"
            onChange={(e) => setIsDark(e.target.checked)}
            startContent={<SunIcon />}
            endContent={<MoonIcon />}
          />
        </div>

        <NavbarMenuToggle
          className="sm:hidden p-3"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarMenu className="bg-background/70 backdrop-blur-md pt-6 overflow-hidden">
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.name}>
            <Link
              href={item.href}
              className="w-full text-content hover:text-primary transition-theme py-2"
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <div className="flex items-center gap-2 py-2">
            <span className="text-content">Tema</span>
            <Switch
              isSelected={isDark}
              size="lg"
              color="secondary"
              onChange={(e) => setIsDark(e.target.checked)}
              startContent={<SunIcon />}
              endContent={<MoonIcon />}
            />
          </div>
        </NavbarMenuItem>
      </NavbarMenu>
    </Nav>
  );
};
