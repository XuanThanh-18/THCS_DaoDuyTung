"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, Facebook, Youtube } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navLinks = [
  { name: "Trang chủ", href: "/" },
  { name: "Giới thiệu", href: "/about" },
  { name: "Tin tức", href: "/news" },
  { name: "Tài liệu", href: "/documents" },
  { name: "Liên hệ", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "sticky top-0 w-full z-50 transition-all duration-300 h-20 flex items-center px-6 md:px-12",
        isScrolled || isMobileMenuOpen
          ? "bg-white/98 backdrop-blur-md shadow-md border-b-2 border-slate-200"
          : "bg-white/90 backdrop-blur-sm",
      )}
    >
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        {/* Left side: Logo + Name + Menu */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo/Logo.jpg"
              alt="Logo trường"
              width={50}
              height={50}
              className="object-contain"
            />
            <span
              className={cn("text-2xl font-headline font-bold hidden sm:block")}
            >
              THCS Đào Duy Tùng
            </span>
          </Link>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-body text-base font-medium transition-colors hover:text-primary",
                  pathname === link.href
                    ? "text-primary font-bold border-b-2 border-primary"
                    : isScrolled
                      ? "text-slate-700"
                      : "text-slate-900",
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Right side: Search + Social Links + Mobile Menu */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Input with Animation */}
            <motion.div
              initial={false}
              animate={{ width: isSearchOpen ? "auto" : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  autoFocus={isSearchOpen}
                  className="px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="px-3 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-semibold whitespace-nowrap"
                >
                  Tìm
                </button>
              </div>
            </motion.div>

            {/* Search button */}
            <button
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                setIsMobileMenuOpen(false);
              }}
              className={cn(
                "p-2 transition-colors hover:text-primary",
                isScrolled ? "text-slate-700" : "text-slate-900",
              )}
            >
              <Search size={20} />
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
            <a
              href="https://www.facebook.com/DaoDuyTung.DongAnh"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center bg-[#1877F2] text-white rounded-lg shadow-sm hover:shadow-md hover:bg-[#165CC2] transition-all duration-200"
              aria-label="Facebook"
            >
              <Facebook size={22} strokeWidth={2.5} />
            </a>
            <a
              href="https://www.youtube.com/@DaoDuyTung"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center bg-[#FF0000] text-white rounded-lg shadow-sm hover:shadow-md hover:bg-[#CC0000] transition-all duration-200"
              aria-label="YouTube"
            >
              <Youtube size={22} strokeWidth={2.5} />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              setIsSearchOpen(false);
            }}
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-slate-700" />
            ) : (
              <Menu
                size={24}
                className={isScrolled ? "text-slate-700" : "text-slate-900"}
              />
            )}
          </button>
        </div>
      </div>
      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-4 md:hidden z-40"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "font-body text-lg font-medium py-2",
                  pathname === link.href
                    ? "text-primary font-bold"
                    : "text-slate-700",
                )}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
