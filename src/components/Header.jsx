import { Link } from "react-router-dom";

const Header = ({ searchInput, searchByTag }) => {
    return (
        <header className="flex items-start md:items-center justify-between py-3 px-5 md:px-10 gap-10 mb-5 w-full">
            <h1 className="font-bold text-lg tracking-wide ">Gallery</h1>

            <input
                className="flex-1 border border-gray-400 px-2 py-1 rounded-md md:px-10 focus:outline-none focus:shadow-lg w-full"
                name="search"
                value={searchInput}
                type="text"
                placeholder="Search...."
                onChange={(e) => searchByTag(e.target.value)}
            />

            <Link to="/login">Sign In</Link>
        </header>
    );
};

export default Header;
