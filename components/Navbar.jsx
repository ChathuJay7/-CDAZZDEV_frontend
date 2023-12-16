"use client";

import { logout } from "@/app/redux/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/login");
  };

  return (
    <nav className="flex justify-between items-center bg-slate-800 px-8 py-3">
      <Link className="text-white font-bold" href={"/"}>
        Blog Posts
      </Link>

      {user && (
        <>
          <p className="text-white">{user?.username}</p>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white hover:bg-white hover:text-red-600 rounded-md font-bold px-6 py-2"
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
}
