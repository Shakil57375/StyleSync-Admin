import { assets } from "../assets/assets"
const Navbar = () => {
  return (
    <div>
        <img className="w-[80px]" src={assets.logo} alt="" />
        <button>Logout</button> 
    </div>
  )
}

export default Navbar