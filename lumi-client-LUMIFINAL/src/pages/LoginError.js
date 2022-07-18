import React from 'react';
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Lottie from 'react-lottie'
import LOGIN from "../animations/login.json"
const LoginError =()=> {
  const  animation = {
    loop: true,
    autoplay: true, 
    animationData: LOGIN,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  const { t } = useTranslation();
  return (
    <>
    <Typography variant='h5' color='white' >{t('login')}</Typography>
<Lottie options={animation}
              height={320}
              width={320}/> 
  </>
  )
}

export default LoginError