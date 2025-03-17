import "../css/Login.css";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [email1, setEmail1] = useState("");
  const [password1, setPassword1] = useState("");
  const [name, setName] = useState("");
 
  const [login, setLogin] = useState(true);
  const [signup, setSignup] = useState(false);

 const handleSuccess=(event)=>{
      event.preventDefault();
      var success=document.getElementById('success');
      success.classList.add('show');
      setTimeout(() => {
        success.classList.add('hide');
        success.classList.remove('show')
      }, 3000);
     
 }
 const handleWrong=(event)=>{
  event.preventDefault();
  var wrong=document.getElementById('wrong');
  wrong.classList.add('show');
  setTimeout(() => {
    wrong.classList.add('hide');
    wrong.classList.remove('show')
  }, 3000);
 
}

const handleCheck=(event)=>{
  event.preventDefault();
  if(email=="boopathi.v2023cse@sece.ac.in" && password=='12345'){
    handleSuccess(event);
  }
  else{
    handleWrong(event);
  }
}


  return (
    <div className="Login_body">
      <div className="circle one"></div>
      <div className="circle two"></div>
      <div className="circle three"></div>
      <div className="circle four"></div>
      <div className="success" id="success" >
         <i class="fa-solid fa-circle-check"></i>
         <h3>Success : successfully Login ! </h3>
         <i class="fa-solid fa-xmark"></i>
      </div>
      <div className="wrong" id="wrong" >
         <i class="fa-solid fa-circle-xmark"></i>
         <h3>Wrong : wrong Email / Password </h3>
         <i class="fa-solid fa-xmark"></i>
      </div>
      

      {/* login container area */}
      {login && (
        <div className="Login_container">
          <div className="Login_left_side">
            <h3>Bank Flow</h3>
            <div className="img"></div>
          </div>

          <div className="login_right_side">
            <form className="login_form"  onSubmit={handleCheck} action="">
              <h1>Welcome Back!</h1>
              <h3 className="demo">Login to Continue</h3>
              <div className="input_contiainer_login">
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <i class="fa-solid fa-envelope"></i>
              </div>

              <div className="input_contiainer_login">
                <input
                  type="password"
                  placeholder="*************"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <i class="fa-solid fa-lock"></i>
              </div>

              <div className="login_others">
                <div className="left_others">
                  <input type="checkbox" />
                  <h3>Remember Me</h3>
                </div>
                <h3>Forgot password?</h3>
              </div>

              <div className="buttons_and_others">
                <button type="submit">Sign In</button>
                <h3>
                  New User ?{" "}
                  <span
                    onClick={() => {
                      setLogin(false);
                      setSignup(true);
                    }}
                  >
                    Sign Up
                  </span>
                </h3>
                <div className="admin_login">
                <input type="checkbox" name="" id=""  />
                <h3>Admin Login</h3>
                </div>
               

              </div>
            </form>
          </div>
        </div>
      )}





      {signup && <div className="signup_container">

          <div className="signup_left_side">
            <form className="signup_form" action="">
              <h1>Welcome To BankFlow!</h1>
              <h3 className="demo">Signup to Continue</h3>
              <div className="input_contiainer_signup">
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  onChange={(e) => {
                    setEmail1(e.target.value);
                  }}
                />
                <i class="fa-solid fa-envelope"></i>
              </div>


              <div className="input_contiainer_login">
                <input
                  type="text"
                  placeholder="username123"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <i class="fa-solid fa-user"></i>
              </div>

              <div className="input_contiainer_login">
                <input
                  type="password"
                  placeholder="*************"
                  onChange={(e) => {
                    setPassword1(e.target.value);
                  }}
                />
                <i class="fa-solid fa-lock"></i>
              </div>

              <div className="buttons_and_others">
                <button>Sign Up</button>
                <h3>
                  Old User ?{" "}
                  <span
                    onClick={() => {
                      setLogin(true);
                      setSignup(false);
                      
                    }}
                  >
                     Sign In
                  </span>
                </h3>
                <div className="admin_login">
                <input type="checkbox" name="" id=""  />
                <h3>Admin Signup</h3>
                </div>
              </div>
            </form>
          </div>
          
        <div className="signup_right_side">
            <h3>Bank Flow</h3>
            <div className="img1"></div>
          </div>
        
        </div>}
    </div>
  );
};
export default Login;
