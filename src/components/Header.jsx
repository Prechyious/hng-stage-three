import { Link } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { FaImages } from "react-icons/fa";

const Header = ({ searchInput, searchByTag, token }) => {
    return (
        <header
            className={`flex items-center justify-between py-3 px-5 md:px-10 ${
                token ? "gap-5" : "gap-6"
            } md:gap-44 mb-5 w-full`}
        >
            <h1 className="font-bold text-xl tracking-wide text-slate-800 flex items-center gap-2">
                <FaImages size={25} className="text-slate-600" />
                Gallery
            </h1>

            <input
                className="flex-1 border border-gray-400 px-2 py-1 rounded-md md:px-10 focus:outline-none focus:shadow-lg w-full"
                name="search"
                value={searchInput}
                type="text"
                placeholder="Search...."
                onChange={(e) => searchByTag(e.target.value)}
            />

            {!token ? (
                <Link
                    className="font-bold border px-4 py-1 rounded-lg bg-slate-500 text-gray-100 hover:bg-slate-600 duration-300"
                    to="/login"
                >
                    Sign In
                </Link>
            ) : (
                <ProfileButton token={token} />
            )}
        </header>
    );
};

export default Header;
