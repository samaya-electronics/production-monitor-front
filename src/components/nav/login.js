import React, { useState, useContext } from "react";
import globalContext from "../../context/global-context";

const Login = (props) => {
  const initialCredentials = {
    name: "",
    password: "",
  };

  const globalContextLocal = useContext(globalContext);
  const [credentials, setCredendials] = useState(initialCredentials);
  console.log(globalContextLocal);
  const handleLogin = (event) => {
      
    event.preventDefault();

    fetch('http://localhost:8080/auth/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name:credentials.name,
            password:credentials.password
        })
    }).then(res => {
        res.json().then(body=>{
            if(!body.error){
                globalContextLocal.setAuthorization({
                    token:body.token,
                    userName:body.userName,
                    links:body.links
                })
                console.log(globalContextLocal);
            }
        })
        

    })
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredendials({ ...credentials, [name]: value });
  };

  return (
    <div className="hero-foot">
      <nav className="tabs is-boxed is-fullwidth">
        <div className="container">
          <form onSubmit={handleLogin} className="login-form">
            <div className="field">
              <label className="label has-text-white">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={credentials.name}
                  placeholder="Username"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label has-text-white">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="password"
                  value={credentials.password}
                  placeholder="Password"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="field">
              <button type="submit" className="button is-fullwidth">
                Login
              </button>
            </div>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Login;
