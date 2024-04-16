import React from 'react'
import './LoginSignup.css'

function LoginSignup() {
  const handleSignupClick = () => {
    const loginForm = document.querySelector("form.login");
    const loginText = document.querySelector(".header .login");
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
  };
  const handleLoginClick = () => {
    const loginForm = document.querySelector("form.login");
    const loginText = document.querySelector(".header .login");
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
  };
  const handleSignupLinkClick = (e) => {
    e.preventDefault();
    const signupBtn = document.querySelector("label.signup");
    signupBtn.click();
  };
  return (
    <div className="wrapper">
      <div className="header">
        <div className="title login">Login </div>
        <div className="title signup">Sign Up </div>
      </div>
      <div className="form-container">
        <div className="slider-controls">
          <input type="radio" name="slide" id="login" defaultChecked />
          <input type="radio" name="slide" id="signup" />
          <label htmlFor="login" className="slide login" onClick={handleLoginClick}>Login</label>
          <label htmlFor="signup" className="slide signup" onClick={handleSignupClick}>Signup</label>
          <div className="slider-tab"></div>
        </div>
        <div className="form-details">
          <form action="#" className="login">
            <pre></pre>
            <div className="field">
              <input type="text" placeholder="Email Address" required />
            </div>
            <div className="field">
              <input type="password" placeholder="Password" required />
            </div>
            <div className="pass-link"><a href="#">Forgot password?</a></div>
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value="Login" />
            </div>
            <div className="signup-link">Don't have an account <a href="#" onClick={handleSignupLinkClick}>Signup now</a></div>
          </form>
          <form action="#" className="signup">
            <div className="field">
              <input type="text" placeholder="Name" required />
            </div>
            <div className="field">
              <input type="text" placeholder="Email Address" required />
            </div>
            <div className="field">
              <input type="password" placeholder="Password" required />
            </div>
            <div className="field">
              <input type="password" placeholder="Confirm password" required />
            </div>
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value="Signup" />
            </div>
            <div className="signup-link">Already have an account? <a href="#" onClick={handleLoginClick}>Login</a></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup