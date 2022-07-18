import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import "../pages/UserSettings.css"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { IconButton } from '@mui/material';
import { TextField } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { Switch } from '@mui/material';
import { Avatar } from '@mui/material';
import "../translations/i18n"
import { useAuth0} from "@auth0/auth0-react";
import { CardHeader } from '@mui/material';
import { ContextSettings } from "../context/ContextSettings";
import { useContext } from 'react';
import { useEffect } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import Language from "../assets/language.png"
import Art from "../assets/art.jpg"
import Geography from "../assets/geography.png"
import Math from "../assets/math.jpg"
import Literature from "../assets/literature.jpg"
import Music from "../assets/music.jpg"
import History from "../assets/history.jpg"
import Science from "../assets/science.jpg"
import Sport from "../assets/sport.jpg"
import Movie from "../assets/movie.jpg"
import GKNOWLEDGE from "../assets/gknowledge.jpg"
import Other from "../assets/other.jpg"
import { Link, useNavigate } from 'react-router-dom';
import './settings.css'
function Settings({userIdUserDB,setEditQuizId}) {
  let navigate = useNavigate();
    const {user,isAuthenticated} = useAuth0()
      const {getMyQuizzes,myQuizzes,
        handleDeleteQuizAndQuestions,
        offset,handleDecreaseOffset,
        handleIncreaseOffset
        ,pageNum
        ,setUserInp,userInp,deleteEffect
        ,arrowBackAllowed,arrowForwardAllowed
        ,setarrowForwardAllowed,getAJoke,
        handleChange,
        t,
        lang,
        joke,
        toggle,
        setToggle
      } = useContext(ContextSettings);
      useEffect(() => {
        const  response = async ()=> await getMyQuizzes(userIdUserDB,userInp)
        setarrowForwardAllowed(true)
        response()
      }, [userIdUserDB,offset,deleteEffect])
  return (
    <div className='settings'>
        <Typography
        variant="h6" 
        color="info"
        component="h2"
        gutterBottom>
         {t('navbarSetting')}
      </Typography>
      <Container >
      <FormControl fullWidth >
  <InputLabel id="demo-simple-select-label">{t('language')}</InputLabel>
  <Select  
  sx={{backgroundColor:'white'}}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={lang}
    label="lang"
    onChange={handleChange}>
    <MenuItem value='de'>{t('german')}</MenuItem>
    <MenuItem value='en'>{t('english')}</MenuItem>
    <MenuItem value='fr'>{t('french')}</MenuItem>
    <MenuItem value='it'>{t('italian')}</MenuItem>
  </Select>
      </FormControl>
  {isAuthenticated && (
    <>     
    <div className='favoriteBar'>
    <FormControlLabel
          value="start"
          control={<Switch color="primary" />}
          label={t('darkMode')}
          labelPlacement="start"
          onClick={() => {setToggle(!toggle);getAJoke()}}
        />
            {toggle && (
      <div>{joke}</div>
      )}
    </div>
      <Box sx={{ flexGrow: 1 ,background: 'white',marginTop:10,padding:2,height:500 ,overflow:"scroll"}}>
      <div className='favoriteBar'>
      <h5> {t('myQuizzes')} </h5>
        <TextField
                onChange={(e) => setUserInp(e.target.value)}
                id="standard-bare"
                variant="outlined"
                placeholder={t('search')}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => {getMyQuizzes(userIdUserDB,userInp);setarrowForwardAllowed(true)}}>
                      <SearchOutlinedIcon />
                    </IconButton>
                  ),
                }}
              />
        </div>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        
      {myQuizzes.map((quiz, index) => (
              <Grid item xs={12} sm={4} md={4} key={index}>
                <Card>
                  <CardHeader
                    avatar={<Avatar aria-label="recipe" src={user.picture}>R</Avatar>}
                    action={
                      <Typography aria-label="settings">
                        {t(quiz.category)}
                      </Typography>
                    }
                    title={quiz.title}
                    subheader={new Date(quiz.createdAt).toLocaleDateString()}
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={
                      quiz.category === 'Language' ? Language : quiz.category === 'Art' ? Art : quiz.category === "Geography" 
                      ? Geography : quiz.category === "Math" ?  Math : quiz.category === "Literature" ? Literature : quiz.category === "Music" 
                      ? Music : quiz.category === "History" ? History: quiz.category === "Science" ? Science : quiz.category ==="Sport" 
                      ? Sport: quiz.category === "Movie" ? Movie : quiz.category === "GeneralKnowledge" ? GKNOWLEDGE : Other
                  }
                    alt={quiz.category}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {quiz.details}
                    </Typography>
                    <Button
                      sx={{m:1}}
                      variant="contained"
                      size="large"
                      endIcon={<EditIcon />}
                      onClick={() => {setEditQuizId(quiz.id);navigate('/edit')}}
                    >
                      {t('Edit')}
                    </Button>
                    <Button
                    color='error'
                        sx={{m:1}}
                      variant="contained"
                      size="large"
                      onClick={() => handleDeleteQuizAndQuestions(quiz.id)}
                      endIcon={<DeleteIcon />}
                    >
                      {t('Delete')}
                    </Button>
                    <Link to={`/Quiz/${quiz.id}`} style={{ textDecoration: 'none' }}>
                    <Button
                        sx={{m:1}}
                      variant="contained"
                      color='success'
                      size="large"
                      endIcon={<PlayCircleFilledWhiteIcon />}
                    >
                      {t("Start")}
                    </Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            ))}   
            <Grid item xs={12} sm={12} md={12} sx={{display:'flex',justifyContent:'flex-end',alignItems:'start',m:3}} >
            {arrowBackAllowed &&
          <IconButton aria-label="fingerprint" color="primary"  onClick={() => handleDecreaseOffset(9)}>
          <ArrowBackIosNewIcon />
              </IconButton > 
                }
                {
                  arrowForwardAllowed &&
                  <IconButton aria-label="fingerprint" color="primary"  onClick={() => handleIncreaseOffset(9)}> 
                  <ArrowForwardIosIcon />
                      </IconButton> 
                }
            </Grid>
      </Grid>
      {pageNum}
    </Box>
    </>
  )}
  <br />
  <br />
      </Container>
    </div>
  )
}
export default Settings