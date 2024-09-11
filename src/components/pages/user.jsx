import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { Navigate, useNavigate,Link } from 'react-router-dom';
const UserPage = () => {
  const [sendamout,setSendamount]=useState(0);
    const [name,setname]=useState('');
    const [userid,setuserid]=useState('');
    const [alluser,setallusers]=useState([]);
    const [reciverid,setreciverid]=useState('');
    const [Balance,setBalance]=useState(0);
    const [username,setusername]=useState('')

    const navigate=useNavigate()
    
  useEffect(()=>{
    const fetchData = () => {
      try {
        const data = localStorage.getItem("userAuth");
        console.log(`the data is ${data}`);
  
        if (data) {
          const adminInfo = JSON.parse(data);
          setuserid(adminInfo?.user?._id);
          setBalance(adminInfo?.user?.amount);
          setusername(adminInfo?.user?.name);
          console.log(`the info is ${adminInfo}`);
        }
        if(!data){
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  },[])

  // fetching all user data 

  useEffect(()=>{
    const fetchAll=async()=>{
      try {
        const {data}= await axios.get(`https://bank-api-l3t9.onrender.com/api/allUser`);
        setallusers(data?.user);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAll();
  },[])

    // handle payment function

    const handlPayment=async()=>{
try {
  const conform=window.confirm(`are you sure to transfer RS ${sendamout} to ${name}`);
if (conform){
  const {data} = await axios.post(`https://bank-api-l3t9.onrender.com/api/payment`,{userid,reciverid,sendamout: Number(sendamout)});
console.log(`the data is ${JSON.stringify(data)}`);
setBalance(data?.user?.MyBalance);

}
} catch (error) {
  console.log(error);
}
    }

    //logout functionality 


    //handle select change 

    const handleSelectChange = (e) => {
      const selectedUserId = e.target.value;
      setreciverid(selectedUserId);
      const selectedUser = alluser.find(user => user._id === selectedUserId);
      setname(selectedUser ? selectedUser.name : '');
    };


  return (
   <div>


<nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="navbar__area ">
        <Link className='fs-1' to={"/"}>Back</Link>
        </div>
      </nav>

<div className='admin_pannel'>
     <div  >
     {

     }
      <h1 className='text-center'>Hello {username}</h1>
      <div className='d-felx'  >
      <div className='text-center fs-3'>your Current Balance</div>
     <h1 className='text-success' >&#8377; {Balance}</h1>
      </div>
      <select class="form-select form-select-lg mb-3" onChange={handleSelectChange} >
        <option>select user</option>
      {
            alluser.length > 0 && alluser.map(user => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))
          }
</select>
      <div className='input-group w-100 text-center' >
        <button className='btn btn-secondary' onClick={(e)=>setSendamount(100)}>100</button>
        <button className='btn btn-secondary' onClick={(e)=>setSendamount(200)}>200</button>
        <button className='btn btn-secondary' onClick={(e)=>setSendamount(500)}>500</button>
      </div>
      <div className='mt-4' >
        <input type='number' className='form-control my-3' value={sendamout} onChange={(e) => setSendamount(e.target.value)} ></input>
        <button className='w-100 btn btn-success' onClick={handlPayment} >Send</button>
      </div>
    </div>
   </div>
   </div>
  )
}

export default UserPage
