"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { signOut } from "../lib/auth-actions";
import { authClient } from "../lib/auth-client";

export default function Navigation() {
  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session?.user;

  const pathname = usePathname();
  const router = useRouter();

  const navLinkClasses = (href: string) =>
    clsx("hover:underline", {
      "font-bold": pathname === href,
    });

  const handleLogout = async () => {
    const confirmed = window.confirm("ログアウトしますか？");
    if (!confirmed) return;

    try {
      await signOut();
      router.push("/login");
      router.refresh();
    } catch {
      window.alert("ログアウトに失敗しました。時間をおいて再度お試しください。");
    }
  };

  return (
    <header className="bg-blue-500 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="My Blog Logo" width={40} height={40} />
          <span className="text-2xl font-bold">My Blog</span>
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/blog" className={navLinkClasses("/blog")}>
              Blog
            </Link>
          </li>
          {!isPending && !isLoggedIn ? (
            <>
              <li>
                <Link href="/signup" className={navLinkClasses("/signup")}>
                  Sign Up
                </Link>
              </li>
              <li>
                <Link href="/login" className={navLinkClasses("/login")}>
                  Log In
                </Link>
              </li>
            </>
          ) : null}
          {!isPending && isLoggedIn ? (
            <>
              <li>
                <Link href="/blog/new" className={navLinkClasses("/blog/new")}>
                  New Post
                </Link>
              </li>
              <li>
                <button type="button" onClick={handleLogout} className="hover:underline">
                  Logout
                </button>
              </li>
            </>
          ) : null}
        </ul>
      </nav>
    </header>
  );
}
