import React,{useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom';

function Hidenavbar({children}) {
    const location=useLocation();
    const [shownavbar,setshownavbar]=useState(true)
    useEffect(()=>{
        if(location.pathname=='/retailer'){
            setshownavbar(false)
        }else{setshownavbar(true)}
    },[location])
  return (
    <div>
      {shownavbar && children}
    </div>
  )
}

export default Hidenavbar