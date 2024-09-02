import React,{useState,useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import OtpComponent from '../../components/otpComponent/OtpComponent';


function Reset() {
  const [open,setOpen]= useState(true)


  return (
  //  <OtpComponent emailId='shahilmohammed7@gmail.com' setOpen={setOpen}/>
  <>reset</>
  )
}

export default Reset