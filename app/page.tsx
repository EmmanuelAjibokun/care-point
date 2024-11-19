import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <div className="layout-container">
      {/* Header */}
      <header className="admin-header w-full flex justify-between">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/carepoint-logo.png"
            height={1000}
            width={1000}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>

        <ul className="nav-list">
          <li className="nav-item">
            <Link href={`/business/register`}>Register Business</Link>
          </li>
          <li className="nav-item">
            <Link href={`/contact`}>Contact</Link>
          </li>
        </ul>
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
          <p className="text-dark-700 mb-6">
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
