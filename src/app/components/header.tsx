"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LogoImage from "@/app/assets/logo.png";

type NavItem = { label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { label: "Menu1", href: "/menu1" },
  { label: "Menu2", href: "/menu2" },
  { label: "Menu3", href: "/menu3" },
];

function NavLink({ item, isActive }: { item: NavItem; isActive: boolean }) {
  return (
    <Link
      href={item.href}
      className={`group relative inline-grid items-baseline justify-items-start pr-6 py-2 transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:block after:h-[2px] after:bg-[#333] after:w-0 after:transition-[width] after:duration-300 after:ease-out hover:after:w-full focus-visible:after:w-full ${isActive ? "text-blue-600" : "text-gray-700 hover:text-gray-900"}`}
      aria-current={isActive ? "page" : undefined}
    >
      <span
        aria-hidden="true"
        className="font-bold col-start-1 row-start-1 opacity-0 select-none transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        {item.label}
      </span>
      <span className="col-start-1 row-start-1 transition-opacity duration-150 group-hover:opacity-0 group-focus-visible:opacity-0">
        {item.label}
      </span>
    </Link>
  );
}

export default function HeaderComponent() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Lock body scroll when the drawer is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-100000 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="sticky z-1000 max-w-[1400px] h-[77px] mx-auto px-4 grid grid-cols-3 items-center">
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="홈으로 이동"
          >
            <Image
              src={LogoImage}
              alt="Logo"
              className="object-contain h-[32px] w-auto"
            />
          </Link>

          <nav
            className="hidden md:flex items-center justify-center col-start-2 gap-20 h-full"
            aria-label="주요 메뉴"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                isActive={isActive(item.href)}
              />
            ))}
          </nav>

          <span
            role="button"
            tabIndex={0}
            aria-controls="mobile-menu"
            aria-expanded={open}
            aria-label={open ? "모바일 메뉴 닫기" : "모바일 메뉴 열기"}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden col-start-3 justify-self-end inline-flex items-center justify-center w-11 h-11"
          >
            <span
              aria-hidden="true"
              className={
                `relative block w-6 h-px transition-all duration-[0.5s] ` +
                `${open ? "bg-transparent" : "bg-current"} ` +
                `before:content-[''] before:absolute before:left-0 before:top-1/2 before:block before:h-px before:w-full before:bg-current before:origin-center before:transition-transform before:duration-[0.5s] ` +
                `${open ? "before:-translate-y-1/2 before:rotate-45" : "before:-translate-y-[7px]"} ` +
                `after:content-[''] after:absolute after:left-0 after:top-1/2 after:block after:h-px after:w-full after:bg-current after:origin-center after:transition-transform after:duration-[0.5s] ` +
                `${open ? "after:-translate-y-1/2 after:-rotate-45" : "after:translate-y-[7px]"} `
              }
            />
          </span>
        </div>
      </header>

      {/* Mobile menu (overlay + sliding panel) */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 z-50 overflow-hidden transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden={!open}
      >
        {/* Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-full bg-white shadow-xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
          role="dialog"
          aria-modal="true"
        >
          <nav
            className="flex flex-col gap-2 p-6 pt-24"
            aria-label="모바일 메뉴"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`text-lg px-3 py-3 rounded-md ${isActive(item.href) ? "text-blue-600" : "text-gray-700 hover:text-gray-900"}`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
