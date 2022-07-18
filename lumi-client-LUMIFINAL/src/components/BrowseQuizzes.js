import React,{useContext} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Container} from "@mui/material";
import { Typography } from "@mui/material";
import { CardActions } from "@mui/material";
import { IconButton } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardHeader } from "@mui/material";
import { Card } from "@mui/material";
import { Avatar } from "@mui/material";
import { CardMedia } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { Button } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { InputLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import { TextField } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ContextBrowse } from "../context/ContextBrowse";
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
import { Link } from "react-router-dom";
import { RWebShare } from "react-web-share";
import { useTranslation } from "react-i18next";
export default function BrowseQuizzes() {
  const { t } = useTranslation();
  const {allQuizzes,handleDecreaseOffset,handleIncreaseOffset,pageNum,category,handleCategoryChange,sortBy,handleSortChange,handleInputChange,handleQuizSearch,arrowBackAllowed,arrowForwardAllowed} = useContext(ContextBrowse);
  return (
    <Container>
      <Paper>
        <Grid container  columnGap={16} rowGap={3} sx={{display:'flex',justifyContent:'center',pt:3}}> 
          <Grid item xs={12} sm={4} md={3}>
            <FormControl className="inputWidth" fullWidth>
              <InputLabel id="demo-simple-select-label">{t('Category')}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                label="Age"
                >
                <MenuItem value="all"> {t('All')}</MenuItem>
                <MenuItem value="Language"> {t('language')}</MenuItem>
                <MenuItem value="Art">{t('Art')}</MenuItem>
                <MenuItem value="Geography">{t('Geography')}</MenuItem>
                <MenuItem value="Math">{t('Math')}</MenuItem>
                <MenuItem value="Literature">{t('Literature')}</MenuItem>
                <MenuItem value="Music">{t('Music')}</MenuItem>
                <MenuItem value="History">{t('History')}</MenuItem>
                <MenuItem value="Science">{t('Science')}</MenuItem>
                <MenuItem value="Sport">{t('Sport')}</MenuItem>
                <MenuItem value="Movie">{t('Movie')}</MenuItem>
                <MenuItem value="GeneralKnowledge">{t('GeneralKnowledge')}</MenuItem>
                <MenuItem value="Other">{t('Other')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <FormControl className="inputWidth" sx={{ background: "white" }} fullWidth >
              <InputLabel id="demo-simple-select-label">{t('sortBy')}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <MenuItem value="newest">{t('Newest')}</MenuItem>
                <MenuItem value="oldest">{t('Oldest')}</MenuItem> 
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
          <TextField
                id="standard-bare"
                variant="outlined"
                placeholder={t('search')}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={(e) => (e.key === "Enter" && handleQuizSearch())}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => handleQuizSearch()}>
                      <SearchOutlinedIcon />
                    </IconButton>
                  ),
                }}
              />
          </Grid>
          <Grid item xs={12} sm={12} md={12}  sx={{mb:3}}>
            <Typography sx={{bgcolor:'primary.main'}} p={2} variant='h4' color='AppWorkspace' > {t('QuizList')}</Typography>
          </Grid>
        </Grid>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {allQuizzes.map((quiz,index) => (
              <Grid item xs={12} sm={4} md={4} key={index} >
                <Card elevation={6} sx={{height:'100%'}}>
                  <CardHeader
                    avatar={<Avatar aria-label="recipe" src={quiz.userAvatar} >R</Avatar>}
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
                    loading="lazy"
                    image={
                      quiz.category === 'Language' ? Language : quiz.category === 'Art' ? Art : quiz.category === "Geography" 
                      ? Geography : quiz.category === "Math" ?  Math : quiz.category === "Literature" ? Literature : quiz.category === "Music" 
                      ? Music : quiz.category === "History" ? History: quiz.category === "Science" ? Science : quiz.category ==="Sport" 
                      ? Sport: quiz.category === "Movie" ? Movie : quiz.category === "GeneralKnowledge" ? GKNOWLEDGE : Other
                    }
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary" sx={{overflowWrap:'break-word',height:'100%'}}>
                    {quiz.details}
                    </Typography>
                    <CardActions>
                      <IconButton aria-label="share">
                      <RWebShare
                      data={{
                          text: "Web Share - GfG",
                          url: `http://localhost:3000/Quiz/${quiz.id}`,
                          title: t('share'),
                        }}>
                          <ShareIcon/>  
                          </RWebShare>
                      </IconButton>
                    </CardActions>
                    <Link to={`/Quiz/${quiz.id}`} style={{ textDecoration: 'none' }}>
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<PlayCircleIcon />}
                    >
                      {t('play')}
                    </Button>
                    
                    </Link>
                  </CardContent>
                  
                  {quiz.durationValue} Min.
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
        </Box>
          {pageNum}
      </Paper>
      <br />
    </Container>
  );
}
