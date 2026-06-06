"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Code2 } from "lucide-react";
import styles from "./Navbar.module.css";

const navLinks = [
  { label: "Visualizer", href: "/visualizer" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <Code2 size={16} color="#3B82F6" />
          </div>
          <span className={styles.logoText}>Tracer</span>
        </Link>

        <div className={styles.links}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${pathname === link.href ? styles.navLinkActive : ""}`}
            >
              {link.label}
            </Link>
          ))}

          <a          
            href="https://github.com/ryanluongLL/AlgoTracer"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubButton}
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}