// components/Header.js
import logo from "../assets/logo_header.svg";

const Header = () => {
    return (
      <header className="text-center w-full flex items-center bg-gradient-to-r from-lightgreen to-green text-greentext font-extrabold h-[138px]">
        <img src={logo} className="px-10 w-40"></img>
        <h1 className="text-4xl font-bold pl-14">SISTEM INPUT SUSU CV. SAHABAT TERNAK</h1>
      </header>
    );
  };
  
  export default Header;
  