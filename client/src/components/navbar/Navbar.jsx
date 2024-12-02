import "./navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MenuIcon from "@mui/icons-material/Menu"; // Biểu tượng menu
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link,useNavigate } from "react-router-dom";
import { useContext,useState , useEffect  } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import axios from "axios";
import config from "../../config"
import coinImage from '../../assets/rice.png'
const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const navigate = useNavigate()
  useEffect(() => {
    const fetchUserData = async () => {
      console.log("đây là hàm gọi để biêys giá")
      if (currentUser && currentUser.access_token) {
        try {
          const response = await axios.get(`${config.API_BASE_URL}/api/v1/auth/me`, {
            headers: {
              "Authorization": `Bearer ${currentUser.access_token}`// Sending the access token
            },
          });
          setUserData(response.data); 
          console.log("thanh cong ")
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);
  
  // const handleLogout = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:8800/api/auth/logout", {}, {
  //        withCredentials: true,
  //     });

  //     if (response.status === 200) {
  //       console.log("Logout successful");
  //       localStorage.removeItem("user"); 
  //       navigate("/login");

  //     } else {
  //       console.error("Logout failed");
  //     }
  //   } catch (error) {
  //     console.error("Error during logout:", error);
  //   }
  // };
const handleHome=async()=>{
   navigate("/login")
}
const handleSelect = async()=>{
  navigate("/select")
}
const handleUpdateUser = () => {
  navigate("/update-user");
};

const handleChangePassword = () => {
  navigate("/change-password");
};
console.log({currentUser})
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Đại Việt</span>
        </Link>
        {/* <HomeOutlinedIcon onClick={handleHome} /> */}
        {/* {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )} */}
        {/* < ChatBubbleOutlineIcon  onClick={handleSelect}/> */}
        {/* <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div> */}
      </div>
      <div className="right">
        {/* <PersonOutlinedIcon /> */}
        <div className="balance">
        {userData.balance?.toLocaleString('vi-VN')}
        <img src={coinImage} alt="Product Image" class="product-image"></img>
        </div>

        {/* <NotificationsOutlinedIcon /> */}
        <div className="user">
          <img
            src="https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/09/23/478/anh-dai-dien-zalo-11.jpg"
            alt=""
          />
          <span>User</span>
          <MenuIcon onClick={toggleDropdown} style={{ cursor: "pointer", marginLeft: '8px' }} /> {/* Nút biểu tượng menu */}
          {dropdownOpen && (
            <div className="dropdown">
              <div onClick={handleUpdateUser}>Update user</div>
              <div onClick={handleChangePassword}>Change password</div>
              <div >Log out</div>
            </div>
          )}
        </div>
        {/* <LogoutOutlinedIcon onClick={handleHome} />  */}
      </div>
    </div>
  );
};

export default Navbar;
