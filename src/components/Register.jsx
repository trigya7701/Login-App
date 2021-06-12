import React from "react";
import Axios from "axios";


function Register(){

  const [contact, setContact] = React.useState({
   uName: "",
   mobile: "",
   email: "",
   address:"",
   uNameErr:"",
   mobileErr:"",
   emailErr:"",
   addressErr:""
 });


 const [data, setData] = React.useState([]);
 const [btn,setBtn]=React.useState();


   function handleChange(event) {
     const value = event.target.value;
     const inputName = event.target.name;

     setContact(() => {
       if (inputName === "uName") {
         return {
           uName: value,
           mobile: contact.mobile,
           email: contact.email,
           address:contact.address,
           uNameErr:"",
           mobileErr:"",
           emailErr:"",
           addressErr:""
         };
       } else if (inputName === "mobile") {
         return {
           uName: contact.uName,
           mobile: value,
           email: contact.email,
           address:contact.address,
           uNameErr:"",
           mobileErr:"",
           emailErr:"",
           addressErr:""
         };
       } else if (inputName === "email") {
         return {
            uName: contact.uName,
            mobile: contact.mobile,
           email: value,
           address:contact.address,
           uNameErr:"",
           mobileErr:"",
           emailErr:"",
           addressErr:""

         };
       }
       else if(inputName ==="address"){
         return{
             uName: contact.uName,
           mobile: contact.mobile,
           email: contact.email,
           address:value,
           uNameErr:"",
           mobileErr:"",
           emailErr:"",
           addressErr:""
         };
       }
     });
   }

   function validate(){
     var uName=contact.uName;
     var mobile=contact.mobile;
     var email=contact.email;
     var address=contact.address;

     var uNameErr=contact.uNameErr;
     var mobileErr=contact.mobileErr;
     var emailErr=contact.emailErr;
     var addressErr=contact.addressErr;

     var uNameRegex=/^[a-z0-9]+$/i;
     if(uNameRegex.test(uName)===false){
       uName="";
       uNameErr="Invalid User Name";

     }
     var mobileRegex=/^(\+\d{1,3}[- ]?)?\d{10}$/;
     if(mobileRegex.test(mobile)===false || mobile.length!==10){
       mobile="";
       mobileErr="Invalid Mobile Number";
     }
     if(email===""){
       emailErr="Invalid Email Address";
     }
     if(address===""){
       addressErr="Invalid Address";
     }

     setContact(()=>{
       return{
         uName:uName,
         mobile: mobile,
         email: email,
         address:address,
         uNameErr: uNameErr,
         mobileErr:mobileErr,
         emailErr: emailErr,
         addressErr: addressErr

       }
     });
     if(uNameErr==="" && mobileErr==="" && emailErr==="" && addressErr===""){
       return true;
     }
     return false;
   }

  function submit(event){

    event.preventDefault();


    if (validate() === true) {
      alert("User Added Successfully !");

      // console.log(contact.uName);
      // console.log(contact.mobile);
      // console.log(contact.email);
      // console.log(contact.address);


      Axios.post("http://localhost:5000/register",{
        username:contact.uName,
        mobile:contact.mobile,
        email:contact.email,
        address:contact.address
      }).then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });

      setContact(()=>{
      return{

       uName: "",
        mobile: "",
        email: "",
        address:"",
        uNameErr:"",
        mobileErr:"",
        emailErr:"",
        addressErr:""
      }
      });
    }
  }
  function getRegister(e){
    setBtn(true);
  }

  function getdata(event){
    setBtn(false);

        fetch("http://localhost:5000/getdata").then(data=>data.json()).then( data=>{
          setData(data);

        });

  }

function showRegisterData(){
  return(
    <form>
      <input
        onChange={handleChange}
        name="uName"
        placeholder="User Name"
        value={contact.uName} required
      />
      <p>{contact.uNameErr}</p>
      <input
        onChange={handleChange}
        name="mobile"
        placeholder="Mobile"
        value={contact.mobile} required
      />
      <p>{contact.mobileErr}</p>
      <input
        onChange={handleChange}
        name="email"
        type="email"
        placeholder="Email"
        value={contact.email} required
      />
      <p>{contact.emailErr}</p>
      <input
        onChange={handleChange}
        name="address"
        placeholder="Address"
        value={contact.address} required
      />
      <p>{contact.addressErr}</p>
      <button onClick={submit}>Submit</button>

    </form>
  )
}

  function deleteData(event){
    var val=event.target.value;

    const newData=data.filter((dataItem)=>{
      return dataItem._id!==val;
    });
    setData(newData);
    Axios.post("http://localhost:5000/deltedata",{
      id:val
    }).then((response) => {
      alert("Data Deleted Succesfully!");
    }, (error) => {
      console.log(error);
    });
  }


function showGetData(){
  if(btn===false){
    return (

      <div className="dataContainer">
        <table>
          <thead>
              <tr>
              <th><strong>Username</strong></th>
              <th><strong>Mobile</strong></th>
              <th><strong>Email</strong></th>
              <th><strong>Address</strong></th>
              </tr>
          </thead>
          <tbody>

                {data.map(item=>{
                  return(
                    <tr key={item._id}>
                  <td ><strong> {item.Username}</strong></td>
                  <td ><strong>{item.Mobile}</strong></td>
                  <td ><strong> {item.Email}</strong></td>
                  <td ><strong> {item.Address}</strong></td>
                  <td ><button onClick={deleteData}value={item._id} className="btn-data">Delete</button></td>
                  </tr>
                )})}


          </tbody>
        </table>
      </div>


    );
  }
}


  return (
    <div>
    <h1>Nemesis Consultants LLP </h1>
    <div className="container">

      <button onClick={getRegister}>Register</button><br /><br />
      <button onClick={getdata}>Get Data</button>
      {btn===true?showRegisterData():showGetData()}

    </div>
    </div>

  );




}
export default Register;
