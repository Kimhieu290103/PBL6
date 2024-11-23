import { Link } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios"
const Register = () => {
  const [inputs,setInputs]= useState({
    username:"",
    email:"",
    password:"",
    name:""
  })
  const [err, setErr]=useState(null)
  const handleChange= (e) =>{
    setInputs(prev=>({
      ...prev,[e.target.name]:e.target.value
    }))
  }
  const handleClick =async e=>{
    e.preventDefault()
    
    try{
      await axios.post("http://localhost:8800/api/auth/register",inputs)
    }catch(err){setErr(err.response.data)}
  }
  console.log(err)
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Character AI</h1>
          <p>
          Tham gia cùng chúng tôi để sống lại những câu chuyện lịch sử Việt Nam qua những cuộc trò chuyện trực tiếp cùng các nhân vật huyền thoại. Đăng ký ngay để khám phá quá khứ!
          </p>
          <span>Bạn đã có tài khoản?</span>
          <Link to="/login">
          <button>Đăng nhập ngay</button>
          </Link>
        </div>
        <div className="right">
          <h1>Đăng kí</h1>
          <form>
            <input type="text" placeholder="Tên tài khoản" name="username" onChange={handleChange} />
            <input type="email" placeholder="Email"  name="email" onChange={handleChange} />
            <input type="password" placeholder="Mật khẩu" name="password" onChange={handleChange}  />
            <input type="text" placeholder="Tên người dùng"  name="name" onChange={handleChange} />
          {err && err}
            <button onClick={handleClick}>Đăng kí</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
