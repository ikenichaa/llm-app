import logo from "../assets/magic-book.png";

const Navbar = () => {
  return (
    <nav className="bg-cherry-blossom">
      <div className="max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-15 items-center">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <img className="h-10 w-auto" src={logo} alt="React Jobs" />
            <span className="hidden pt-2 md:block text-white text-2xl font-bold ml-2">
              Data Story Telling
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
