import logo from "../assets/magic-book.png";

const Navbar = () => {
  return (
    <div className="bg-blue-600">
      <div className="flex h-20 items-center justify-center">
        <img className="h-10 w-auto" src={logo} alt="React Jobs" />
        <span className="pt-2 md:block text-white text-2xl font-bold ml-2">
          Data Story Telling
        </span>
      </div>
    </div>
  );
};

export default Navbar;
