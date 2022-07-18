import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
export default function MenuCard({
    title,
  text,
  path,
  animation
}) {
  const navigateTo = useNavigate();
  return (
    <Card sx={{ height:'100%',  boxShadow:"inset 0 0 0 0 #54b3d6",
      transition:" background .3s ease-in-out, box-shadow .3s ease-in-out",'&:hover': {
        background: " rgba(82, 89, 91, 0.387)",
        color:"white",
      }}}>
      <CardActionArea  onClick={() => navigateTo(path)}>
          <Lottie options={animation}
              height={120}
              width={120}/> 
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
          {title}
          </Typography>
          <Typography variant="body1" >
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}