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
import { AuthContext } from "../../context/authContext";
const Navbar = () => {
  const { logout } = useContext(AuthContext);
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
  navigate("/changepass");
};
const handleChangeRecharge = () => {
  navigate("/recharge");
};
const handeLogout = () => {
   logout(); // Xóa thông tin người dùng
    navigate("/login"); // Chuyển hướng về trang login
};
console.log({currentUser})
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Đại Việt</span>
        </Link>
        {/* <HomeOutlinedIcon onClick={handleHome} /> */}
        {darkMode ?(
          <DarkModeOutlinedIcon onClick={toggle} />
        ): (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) }
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
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBhARBxMRFRITFhcVFRgVERUSFRoZFhgWGBUTFRgYHSggGBolGxYVITEiJSkrLi4uFyIzODMsNygtLisBCgoKDg0OFRAQFS0dHR0rNy0tKy0tLS0tNy0tNy0rKzctKy0rKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUCAwYBB//EADMQAQACAQICBgkEAgMAAAAAAAABAgMEEQUhEjFBcbHBEyJRYYGRodHwFDI04ULxI3KC/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwD6YA0yAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAypS2S21I3kGL2ImZ2hMpw3NaPWmI+srHT6bHgr6kc+2e00xW4uH57/u2r39fyhvrwuNvWt8oWImriunhdey0/JhbheSI9S0T3xMLQNMUWXS58X76zt7Y5+DQ6RF1Ohx5o3ryt7Y8zTFKM8uK+G+2SOf5zhgqAAAAAAAAAAAAgAAAAAAvNDp4wYY3/dPOfsp9PXp56xPbMOgStQARQAAAAAGjWaeNRi27Y6pUcxMTtPY6NU8VxdDPFo/y8Y/IWJUEBWQAAAAAAAAAAAAAAAEnh8b6yvx8JXal4b/ADK/HwldJWoAIoAAAAAAh8Vp0tLv7JifLzTEbiO36O2/u8YBSANMAAAAAAAAAAoAAAAACTw7+ZX4+ErtR6CdtZTv8pXiVYAIoAAAAAApeJWtOrtEzyjbb5QulHrp31l+/wAoWJUcBUAAAAAAAAABAAAAAAG/Rxb9TWYieuOxetOjrFNLTo+yJ+fNuZagAKAAAAAAKHVxP6m3S3658V8i8SpFtJMz2bTHzWJYpQFZAAAAAAAAABQAAAAAF5w+/T0lfdy+SQruEZOVqz3+U+SxZaAAAAAAAAELit+jpto7Zj7+SaqeLZOlmisdkfWfyFhUEBWQAAAAAAAAAAAAAAAGzT5rYMsWqu9NmjUYYtEbe7rUCz4Rk5Wr8fKfJKsWICKAAAAAA06vP+nxb7b89vYpMl7Zck2t1yn8YvzrWPfPlHmrWolABAAAAAAAAAAAAAAAABu0ub0GeJ7Oqe6WkB0kTvHIQuFZLXwTFv8AGdo+yay0AAAAAjcQvamlno93zBV6zL6bUTMdXVHdDQDTIAAAAAAAAAAAIAAAAAAACrfhUbabvtPlCaj8Pp0NJXfv+c7pDLQAAAAj8QjpaO3wn5TCQ156ekwWiO2JgHPgNMgAgAAAAAAAAAKAAAAAAMqUnJeIr1zyKUte21ImZ9y10Oi9DPSyfu8P7CJlaxWsRHZyegy0AAAAAAoNVj9FqLR7+XdPU1LrW6SNRXevK0dX2lUZcd8VtskTE/nU1GawAAAAAAAAAAAEAAB7ETadq9adp+G3vzzco9nb/QuINaze21Y3n3J+n4ba3PPy90daww4ceGNscbePxlsTVxhixY8NdscRDMEUAAAAAAAAY5KUyV2vETDIBW6jhnbgn4T5Sr8mO2O22SJiXRMMmOmWu2SImF1Mc8LHUcNmOenn4T5SgXpaltrxtPvVMYgCAAAAAPY5zyB4l6bQ5M3O3Kv1nuhK0Wgim1s3OfZ2R95T01rGrBp8WCP+OPj2toIoAAAAAAAAAAAAAAAAwy4ceau2SN/zsZgKnU8Pvj54vWj6/wBoLpETWaKueN6crfSe9dTFMMrVtS0xblMMVZAAFlwvTxPr3/8APnKurE2tER28nQ46RjxxFeqI2StRkAigAAAAAAAAAAAAAAAAAAAAAIPE9PF8fTr1x1++FS6Tr63P58fos1q+yf8ASxK1gKjdpP5NP+0L4EqwARQAAAAAAAAAAAAAAAAAAAAABS8S/mW+HhALEqKAqP/Z"
            alt=""
          />
          <span>User</span>
          <MenuIcon onClick={toggleDropdown} style={{ cursor: "pointer", marginLeft: '8px' }} /> {/* Nút biểu tượng menu */}
          {dropdownOpen && (
            <div className="dropdown">
              <div onClick={handleUpdateUser}>Update user</div>
              <div onClick={handleChangePassword}>Change password</div>
              <div onClick={handleChangeRecharge}>Recharge</div>
              <div onClick={handeLogout}>Log out</div>
            </div>
          )}
        </div>
        {/* <LogoutOutlinedIcon onClick={handleHome} />  */}
      </div>
    </div>
  );
};

export default Navbar;
