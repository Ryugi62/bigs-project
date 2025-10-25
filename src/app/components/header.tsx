"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
      className={`px-3 py-2 text-sm rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ${
        isActive ? "text-blue-600" : "text-gray-700 hover:text-gray-900"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      {item.label}
    </Link>
  );
}

export default function HeaderComponent() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white text-blue-600 px-3 py-2 rounded shadow"
      >
        본문으로 건너뛰기
      </a>
      <div className="max-w-[1400px] h-[64px] flex items-center mx-auto px-4">
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
          className="hidden md:flex items-center gap-1 ml-auto"
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

        <button
          type="button"
          className="md:hidden ml-auto inline-flex items-center justify-center p-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">
            {open ? "모바일 메뉴 닫기" : "모바일 메뉴 열기"}
          </span>
          <span
            aria-hidden="true"
            className={
              `relative block h-4 w-6 border-b border-current transition-all duration-200 ` +
              `${open ? "border-transparent" : ""} ` +
              `before:content-[''] before:absolute before:left-0 before:top-0 before:block before:w-full before:border-b before:border-current before:transition-transform before:duration-200 ` +
              `${open ? "before:translate-y-0 before:rotate-45" : "before:-translate-y-[6px]"} ` +
              `after:content-[''] after:absolute after:left-0 after:bottom-0 after:block after:w-full after:border-b after:border-current after:transition-transform after:duration-200 ` +
              `${open ? "after:translate-y-0 after:-rotate-45" : "after:translate-y-[6px]"} `
            }
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} md:hidden overflow-hidden transition-[max-height,opacity] duration-300 border-t border-gray-200 bg-white`}
      >
        <nav
          className="max-w-[1400px] mx-auto px-4 py-2 flex flex-col gap-1"
          aria-label="모바일 메뉴"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`px-3 py-2 rounded-md ${isActive(item.href) ? "text-blue-600" : "text-gray-700 hover:text-gray-900"}`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
