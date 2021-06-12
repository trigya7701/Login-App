import React from "react";
import { useHistory } from "react-router-dom";
function Form(props) {

  const [loginCred, setLoginCred] = React.useState({email: "", password: "", emailErr: "", passwordErr: ""});
  let history=useHistory();
  function handleChange(event) {

    const newValue = event.target.value;
    const inputField = event.target.name;

    setLoginCred(() => {
      if (inputField === "email") {
        return {email: newValue, password: loginCred.password}
      } else {
        return {email: loginCred.email, password: newValue}
      }

    });

  }
  function validate() {
    var email = loginCred.email;
    var password = loginCred.password;
    var emailErr = "";
    var passwordErr = "";

    if (email !== "admin@namasys.co") {

      email = "";
      emailErr = "Invalid Email";

    }
    if (password !== "admin123") {

      password = "";
      passwordErr = "Invalid Password";

    }
    setLoginCred(()=>{
      return{
        email:email,
        password:password,
        emailErr:emailErr,
        passwordErr:passwordErr
      }
    });

    if(emailErr==="" && passwordErr===""){

      return true;
    }

    return false;
  }

  function submit(event) {
    event.preventDefault();


    if (validate() === true) {
      
      setLoginCred(() => {
        return {email: "", password: "", emailErr: "", passwordErr: ""};
      });
      history.push('./Register');


    }
  }

  return (
    <div>
      <h1>Nemesis Consultants LLP </h1>
    <div className="container">
      <h2>Admin Dashboard</h2>
    <form className="form" onSubmit={submit}>
    <input name="email" className="forminput" onChange={handleChange} value={loginCred.email} type="email" placeholder="Email"/>
    <p>{loginCred.emailErr}</p>
    <input onChange={handleChange} className="forminput" name="password" value={loginCred.passowrd} type=" password" placeholder="Password"/>
    <p>{loginCred.passwordErr}</p>
    <input type="submit" className="formbutton" value="Submit"/>
  </form>
</div>
</div>);
}
export default Form;
