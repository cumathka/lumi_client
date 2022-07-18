import React from 'react';
import comingSoon from '../assets/uc.svg'
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
const  ComingSoon = () => {
  let navigate = useNavigate();
  return (
<>
  <img src={comingSoon} alt="coming soon" style={{height: "70%",width: "70%"}}/>
  <IconButton onClick={() => navigate('/')} ><ArrowBackIcon sx={{fontSize:'250%'}}/></IconButton>
</>
  )
}
export default ComingSoon