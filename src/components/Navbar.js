

"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "../../app/context/CartContext";
import { useUser } from "../../app/context/Usercontext";
import { useTheme } from "../../app/context/ThemeContext";
import { useState } from "react";

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useUser();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-pink-500 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link href="/" className="text-2xl font-extrabold text-white tracking-wide">
          MyShop
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-white hover:text-gray-100 font-medium transition">
            Home
          </Link>
          <Link href="/products" className="text-white hover:text-gray-100 font-medium transition">
            Products
          </Link>
          <Link href="/cart" className="relative text-white hover:text-gray-100 font-medium transition">
            <img src="/cart.png" alt="Cart" className="w-7 h-7 inline-block" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          <button onClick={toggleTheme} className="p-2 rounded-full bg-white/80 hover:bg-white transition">
            {theme === "light" ? (
              <img src="/moon.webp" alt="Dark mode" className="w-5 h-5" />
            ) : (
              <img src="/sun.webp" alt="Light mode" className="w-5 h-5" />
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <Link href="/profile" className="font-semibold text-white hover:text-gray-100 transition">
                {user.name}
              </Link>
              <button
                onClick={logout}
                className="bg-white text-pink-600 px-3 py-1 rounded-md font-medium hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="bg-white text-pink-600 px-3 py-1 rounded-md font-medium hover:bg-gray-100 transition">
                Login
              </Link>
              <Link href="/signup" className="bg-white text-pink-600 px-3 py-1 rounded-md font-medium hover:bg-gray-100 transition">
                Signup
              </Link>
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggleTheme} className="p-2 rounded-full bg-white/80 hover:bg-white transition">
            {theme === "light" ? (
              <img src="/moon.webp" alt="Dark mode" className="w-5 h-5" />
            ) : (
              <img src="/sun.webp" alt="Light mode" className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-pink-500 px-4 pt-2 pb-4 space-y-2">
          <Link href="/" className="block text-white font-medium hover:text-gray-100">
            Home
          </Link>
          <Link href="/products" className="block text-white font-medium hover:text-gray-100">
            Products
          </Link>
          <Link href="/cart" className="relative block text-white font-medium hover:text-gray-100">
            Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-0.5 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <Link href="/profile" className="block text-white font-semibold hover:text-gray-100">
                {user.name}
              </Link>
              <button
                onClick={logout}
                className="w-full text-pink-600 bg-white px-3 py-1 rounded-md font-medium hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="w-full text-pink-600 bg-white px-3 py-1 rounded-md font-medium hover:bg-gray-100 transition">
                Login
              </Link>
              <Link href="/signup" className="w-full text-pink-600 bg-white px-3 py-1 rounded-md font-medium hover:bg-gray-100 transition">
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
