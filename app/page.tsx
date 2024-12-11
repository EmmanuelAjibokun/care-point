"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="layout-container">
      {/* Header */}
      <header className="admin-header w-full flex flex-col justify-center">
        <div className="items-center w-full flex justify-between">
          <Link href="/" className="cursor-pointer">
            <Image
              src="/assets/icons/carepoint-logo.png"
              height={1000}
              width={1000}
              alt="logo"
              className="h-8 w-fit"
            />
          </Link>

          {/* Hamburger Menu Button */}
          <Button
            className="lg:hidden flex flex-col justify-center items-center gap-1.5"
            onClick={toggleMenu}
          >
            <span className={`ham ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`ham ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`ham ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </Button>

          {/* Desktop Navigation */}
          <ul className="nav-list">
            <li className="nav-item">
              <Link href={`/business/register`}>Register Business</Link>
            </li>
            <li className="nav-item">
              <Link href={`/contact`}>Contact</Link>
            </li>
          </ul>
        </div>


        {/* Mobile Navigation */}
        <div className={`
        top-[60px] w-full shadow-lg transition-all duration-300 lg:hidden
        ${isMenuOpen ? 'translate-y-0 ' : 'translate-y-full hidden'}
        `}>
          <ul className="flex flex-col items-center">
            <li className="nav-item p-2">
              <Link href={`/business/register`} onClick={toggleMenu}>
                Register Business
              </Link>
            </li>
            <li className="nav-item">
              <Link href={`/contact`} onClick={toggleMenu}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </header>

      {/* <header className="header-container">
        <h1 className="logo">CarePoint</h1>
        <nav>
          <ul className="nav-list">
            <li className="nav-item">
              <Link href={`/business`}>Register Business</Link>
            </li>
            <li className="nav-item">
              <Link href={`/contact`}>Contact</Link>
            </li>
          </ul>
        </nav>
      </header> */}

      {/* Hero Section */}
      <main className="hero-container">
        {/* Text Content */}
        <div className="hero-text">
          <h2 className="header mb-4">
            Modern Patient Management at Your Fingertips
          </h2>
          <p className="#5A5A5A mb-6">
            Streamline your healthcare operations with CarePoint. Manage patient
            profiles, schedules, and analytics, all in one place.
          </p>
          <Button variant="outline" className="shad-primary-btn" asChild>
            <Link href={`/user`}>Get Started</Link>
          </Button>
        </div>

        {/* Image Content */}
        <div className="hero-image-container">
          <Image
            src="/assets/images/landing-page.png"
            width={1000}
            height={1000}
            alt="CarePoint Dashboard"
            className="hero-image"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="footer-container">
        <p className="footer-text">© 2024 CarePoint. All Rights Reserved.</p>
      </footer>
    </div>

  );
};

export default Home;
