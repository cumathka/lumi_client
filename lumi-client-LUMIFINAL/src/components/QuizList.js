import React from 'react';
import { useContext } from "react";
import { ContextCreate } from "../context/ContextCreate";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import  {useTranslation} from 'react-i18next'
import { Box } from "@mui/material";
import { Paper } from "@mui/material";
import { Button } from "@mui/material";
import LOGO from "../assets/LUMI.png"
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import '../components/settings.css'
/////PERSON TABLE 
const  PersonList = ()=> {
    const { t } = useTranslation();
    const  { list, handleDelete,handleEdit,setuserId,isQuizCreated } = useContext(ContextCreate);
    return (
<>
{isQuizCreated ? <Container className='settings'>
    {list.length === 0 ? 
       <Grid container spacing={1}>
       <Grid item xs={12} md={12}>
       <img  src={LOGO} alt="logo"  width={"50%"} / >
       </Grid>
       </Grid>
       : 
       <Paper style={{maxHeight: 640, overflow: 'auto'}} elevation={7} >
        {list.map((x) => (
            <div key={x.id}>
            <Box sx={{ flexGrow: 1 ,border:" 10px solid #C4C4C4",overflow:'scroll'} } p={3} m={3}  className='settings' >
            <Grid container spacing={3}>  
            <Grid item xs={12} md={12} >
        <Typography component='h1' variant='inherit' sx={{background:'#fcb603',borderRadius:2,overflowWrap:'break-word',height:'100%'}}>
            {x.question}
            </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
            <Typography component='div' variant='h5' sx={{background:'#e9723d',borderRadius:2,overflowWrap:'break-word',height:'100%'}}>
            {x.answer1}
            </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
        <Typography component='div' variant='h5' sx={{background:'#e9723d',borderRadius:2,overflowWrap:'break-word',height:'100%'}}>
            {x.answer2}
            </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
        <Typography component='div' variant='h5' sx={{background:'#e9723d',borderRadius:2,overflowWrap:'break-word',height:'100%'}}>
            {x.answer3}
            </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
        <Typography component='div' variant='h5' sx={{background:'#e9723d',borderRadius:2,overflowWrap:'break-word',height:'100%'}}>
            {x.answer4}
            </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
        <Typography  variant='overline' color='darkgreen' sx={{overflowWrap:'break-word',height:'100%'}} >
            {x.correct}
            </Typography>
        </Grid>
        <Grid item xs={12} md={12} >
        <Button sx={{margin:1}} onClick={() => handleDelete(x.id)} color='error'  variant="contained"  startIcon={<DeleteIcon />}>{t('Delete')}</Button>
        <Button onClick={() => {handleEdit(x);setuserId(x.id)} } variant='contained' color='secondary' startIcon={<ModeEditIcon/>}>{t('Edit')}</Button>
        </Grid>
        </Grid>
            </Box>
            </div>
        ))}
</Paper>
}
</Container>: null} 
</>
);
}
export default PersonList;