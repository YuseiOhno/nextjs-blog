"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { signOut } from "../lib/auth/actions";
import { authClient } from "../lib/auth/client";

export default function Navigation() {
  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session?.user;

  const pathname = usePathname();
  const router = useRouter();

  const navLinkClasses = (href: string) =>
    clsx("text-sm text-gray-950", {
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
    <header className="border-b border-gray-900/10">
      <nav className="flex h-14 justify-between items-center px-4 sm:px-6">
        <Link href="/" className="flex items-center">
          <span className="text-2xl text-gray-950">TEST</span>
        </Link>
        <ul className="flex items-center gap-6">
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
