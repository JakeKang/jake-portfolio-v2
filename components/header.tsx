"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { navItems } from "@/lib/data"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault()
    const target = document.querySelector(href)
    target?.scrollIntoView({ behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="px-5 md:px-10 lg:px-20 xl:px-28 2xl:px-36 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <a href="#" className="text-xl font-bold text-foreground">
          Portfolio<span className="text-primary">.</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium cursor-pointer"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle className="h-9 w-9" />
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle className="h-9 w-9" />
          <button
            type="button"
            className="p-2 text-foreground cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
          <ul className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block text-foreground hover:text-primary transition-colors font-medium cursor-pointer"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <ThemeToggle className="h-9 w-9" />
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
