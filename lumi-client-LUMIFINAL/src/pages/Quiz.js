import  React,{ useEffect, useState } from 'react'
import { Button, Card, CardContent, CardMedia, Container, Grid, IconButton, Paper, Rating, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import Lottie from 'react-lottie';
import fiveStars from '../animations/monkey.json'
import fourStars from '../animations/fourStarts.json'
import threeStars from '../animations/threeStarts.json'
import twoStars from '../animations/astronaut.json'
import oneStar from '../animations/oneStar.json'
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useTranslation } from 'react-i18next';
const fmtMSS = ({ remainingTime }) => (remainingTime-(remainingTime%=60))/60+(9<remainingTime?':':':0')+remainingTime
const Quiz = () => {
const { t } = useTranslation();
let navigate = useNavigate();
const [resultAnimation,setResultAnimation] = useState(oneStar)
const {id} = useParams()
const[startQuizById,setQuizById] = useState([])
const [currentQuestion,setCurrentQuestion] = useState([])
const [quizDescription,setQuizDescription] = useState([])
const [userAnswer,setUserAnswer] = useState([])
const [isQuizFinished,setIsQuizFinished] = useState(false)
const [correctAnswerCount,setCorrectAnswerCount] = useState(0)
const [ratingValue, setRatingValue] = useState(0);
const [quizDuration, setQuizDuration] = useState(2);
const [userWantsToSeeRes,setUserWantsToSeeRes] = useState(false)
const [isPlaying,setIsPlaying] = useState(true)

const startQuiz = async () => {
if (id === undefined ) return
try {
const response = await fetch(`http://localhost:8080/api/v1/Question/questions?QuizId=${id}` );
const data = await response.json();
setQuizById(data);
// setQuizById(data.sort((a, b) => 0.5 - Math.random()));
} catch (err) {
console.log(err.message);
}
};
const getQuizDescription = async (id) => {
  if (id === undefined )return
  try {
    const response = await fetch(`http://localhost:8080/api/v1/Quiz/${id}` );
    const data = await response.json();
    setQuizDescription([data])
    setQuizDuration(data.durationValue * 60)
  } catch (err) {
    console.log(err.message);
  }
};
useEffect(() => {
    startQuiz(id)
    getQuizDescription(id)
}, [id])
const handleAnswer =  (pIndex) => setCurrentQuestion([...currentQuestion,pIndex])
const handleUserAnswers = (pAnswer,pCorrect,pAnswer1,pAnswer2,pAnswer3,pAnswer4,pQuestion) => {
  setUserAnswer([...userAnswer,{answer:pAnswer,correct:pCorrect,answer1:pAnswer1,answer2:pAnswer2,answer3:pAnswer3,answer4:pAnswer4,question:pQuestion}])
}  
const [feedBack,setFeedBack] = useState(0)

const showResult =() => {
  setIsQuizFinished(true)
  const sumWithInitial = userAnswer.filter((x) => x.answer === x.correct).length
  setCorrectAnswerCount(sumWithInitial)
  let star =  sumWithInitial  *  5
  let stars = star / startQuizById.length 
  console.log(stars,"stars")
  setRatingValue(stars)
  if (stars >= 0 && stars < 1 ) {
    setFeedBack(t('oneStar'))
    setRatingValue(0)
    setResultAnimation(oneStar)
  }else if (stars >= 1 && stars < 2) {
    setRatingValue(1)
    setFeedBack(t('oneStar'))
    setResultAnimation(oneStar)
  }else if (stars >= 2 && stars < 3){
    setFeedBack(t('twoStars'))
    setRatingValue(2)
    setResultAnimation(twoStars)
  }else if (stars >= 3 && stars < 4){
    setRatingValue(3)
    setFeedBack(t('threeStars'))
    setResultAnimation(threeStars)
  }else if (stars >= 4 && stars < 5){
    setFeedBack(t('fourStars'))
    setRatingValue(4)
    setResultAnimation(fourStars)
  }else if (stars === 5 ){
    console.log('deneme')
    setRatingValue(5)
    setFeedBack(t('fiveStars'))
    setResultAnimation(fiveStars)
  }else{
    setFeedBack(t('oneStar'))
    setRatingValue(0)
    setResultAnimation(oneStar)
  }
  setIsPlaying(false)
}
const QuizResult = {
    loop: true,
    autoplay: true,
    animationData: resultAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
return ( 
    <Container>
        <>
            { (startQuizById.length === 0 && quizDescription.length=== 0) ? 
            <>
            <Typography variant='h2' m={3}>
               {t('noQuiz')}
                {/* {id} */}
            </Typography>
            <Typography typography='h5' color='white' p={3}>
                {t('notFound')}
            </Typography>
            <Link to='/browsequizzes' style={{ textDecoration: 'none' }}>
            <Button variant='contained' >
               {t('back')}
            </Button>
            </Link>
            </>
            :
            <>
            {quizDescription.map((quiz,index) => (
            <Card key={index}  >
        <>
        <CardMedia
          component="img"
          sx={{height:'20vh'}}
          image={
            quiz.category === 'Language' ? Language : quiz.category === 'Art' ? Art : quiz.category === "Geography" 
            ? Geography : quiz.category === "Math" ?  Math : quiz.category === "Literature" ? Literature : quiz.category === "Music" 
            ? Music : quiz.category === "History" ? History: quiz.category === "Science" ? Science : quiz.category ==="Sport" 
            ? Sport: quiz.category === "Movie" ? Movie : quiz.category === "GeneralKnowledge" ? GKNOWLEDGE : Other
          }
          alt="Quiz Description"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {quiz.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {quiz.details}
          </Typography>
        </CardContent>
        <Grid
            container
        >
        <Grid item xs={6} sm={6} md={6}  sx={{display:'flex',justifyContent:'start',alignItems:'end'}}pl={6}  >
        {!isQuizFinished && <Typography variant='overline'> {t('Question')} {startQuizById.length}  / {currentQuestion.length}</Typography>}
        {isQuizFinished && <Typography>{correctAnswerCount} {t('caoo')}  {startQuizById.length} {t('Questions')}</Typography>}
        </Grid>
        <Grid item xs={6} sm={6} md={6}  sx={{display:'flex',justifyContent:'end',alignItems:'center'}}pr={6}  >
          <CountdownCircleTimer
        size={115}
          duration={quizDuration}
          colors={["#004777", "#F7B801", "#A30000"]}
          colorsTime={[quizDuration, quizDuration / 2, 0]}
          isPlaying={isPlaying} 
            onComplete={() => {
              showResult()
              return { shouldRepeat: false, delay: 1.5 } 
            }}
        >
          {fmtMSS}
        </CountdownCircleTimer>
        </Grid>
        </Grid>
      </>
    </Card>
            ))}
<br />
<br />
          {!isQuizFinished && <>
            {startQuizById.map((x,index) => (
            <Box key={index} m={ {xs: 6, sm: 5, md: 4,lg:4 }}>
        <Paper  elevation={10}>
            <Grid
             wrap="wrap"
            container
            // spacing={{ xs: 3, md: 5}}
            // columns={{ xs: 4, sm: 12, md: 12 }}
            p={9}
            spacing={1}
            sx={{wordWrap: "break-word"}}
        >
        <Grid item xs={12} sm={12} md={12} >
                <Typography variant='h4'      sx={{fontSize: {lg: 30,md: 20,sm: 15,xs: 15}}}>
                    {x.question}
                </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6}  >
            <Button    fullWidth    sx={{ whiteSpace: "normal",display:'block',height:'100%',fontSize: {lg: 30,md: 20,sm: 15,xs: 15}}}  variant='contained' color='secondary'   onClick={() => {handleAnswer(index);handleUserAnswers(x.answer1,x.correct,x.answer1,x.answer2,x.answer3,x.answer4,x.question)} }  disabled={currentQuestion.includes(index) ? true : false } >
        {x.answer1}
            </Button>
        </Grid>
        <Grid  sx={{wordWrap: "break-word",fontSize: {lg: 30,md: 20,sm: 15,xs: 15}}} item xs={12} sm={12} md={6}  >
        <Button fullWidth variant='contained' color='primary' sx={{ whiteSpace: "normal",display:'block',height:'100%',fontSize: {lg: 30,md: 20,sm: 15,xs: 15}}}   onClick={() => {handleAnswer(index);handleUserAnswers(x.answer2,x.correct,x.answer1,x.answer2,x.answer3,x.answer4,x.question)}}  disabled={currentQuestion.includes(index)? true : false } >
            {x.answer2}
            </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={6} >
        <Button fullWidth variant='contained' color='primary'  sx={{ whiteSpace: "normal",display:'block',height:'100%',fontSize: {lg: 30,md: 20,sm: 15,xs: 15}}}   onClick={() => {handleAnswer(index);handleUserAnswers(x.answer3,x.correct,x.answer1,x.answer2,x.answer3,x.answer4,x.question)}} disabled={currentQuestion.includes(index)? true : false }   >
            {x.answer3}
            </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={6} >
        <Button fullWidth variant='contained' color='secondary' sx={{ whiteSpace: "normal",display:'block',height:'100%',fontSize: {lg: 30,md: 20,sm: 15,xs: 15}}}   onClick={() => {handleAnswer(index);handleUserAnswers(x.answer4,x.correct,x.answer1,x.answer2,x.answer3,x.answer4,x.question)}}  disabled={currentQuestion.includes(index)? true : false } >
            {x.answer4}
            </Button>
        </Grid>
        </Grid>
        </Paper>
            </Box>
        ))}
                  <Button  variant='contained' onClick={() =>{ showResult()}}>{t('endQuiz')}</Button>
          </>}
            </>
            }
            {isQuizFinished && <>
                <Grid container
                sx={{background:'whitesmoke',borderRadius:'20px'}}
                          p={7}>
                      <Grid item xs={12} sm={12} md={12}>
                      <Lottie options={QuizResult}
                        height={380}
                        width={310}
                        /> 
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} p={2}>
                      <Typography variant='body1'>{feedBack}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} >
                      <Rating  name="read-only" value={ratingValue} readOnly sx={{fontSize:"200%"}}  precision={0.5}  defaultValue={2.5} />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                      <IconButton aria-label="delete" onClick={() => {window.location.reload(true)}}><RestartAltIcon/></IconButton>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                  {userAnswer.length !== 0 && <Button variant='contained' onClick={() => setUserWantsToSeeRes(userWantsToSeeRes => !userWantsToSeeRes)}>{t('myAnswers')}</Button>}
                      </Grid>
          </Grid>
          {
            userWantsToSeeRes && 
            <>
              {userAnswer.map((x,index) => (
              <Box key={index} m={ {xs: 6, sm: 5, md: 4,lg:4 }}>
          <Paper  elevation={10}>
              <Grid
              sx={{wordWrap: "break-word"}}
              container
              spacing={{ xs: 3, md: 2}}
              columns={{ xs: 4, sm: 12, md: 12 }}
              p={7}
              rowGap={5}
          >
          <Grid item xs={12} sm={12} md={12}  m={3} >
                  <Typography variant='h4' >
                      {x.question}
                  </Typography> 
                 <hr />
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
              <Typography variant='h5'   sx={(x.answer === x.correct && x.answer === x.answer1) ?  {borderBottom:'5px solid #82DD55',color:'#82DD55'} :( x.answer === x.answer1 && x.answer !== x.correct ) ? {borderBottom:' 5px solid #E23636',color:'#E23636'}:  {background:'white'}} >
          {x.answer1}
              </Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6}  >
          <Typography variant='h5'   sx={(x.answer === x.correct && x.answer === x.answer2) ?  {borderBottom:'5px  solid #82DD55',color:'#82DD55'} :( x.answer === x.answer2 && x.answer !== x.correct ) ? {borderBottom:'5px solid #E23636',color:'#E23636'}:  {background:'white'}} >
              {x.answer2}
              </Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6}   >
          <Typography variant='h5'   sx={(x.answer === x.correct && x.answer === x.answer3) ?  {borderBottom:'5px solid #82DD55',color:'#82DD55'} :( x.answer === x.answer3 && x.answer !== x.correct ) ? {borderBottom:' 5px solid #E23636',color:'#E23636'}:  {background:'white'}}  >
              {x.answer3}
              </Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6}  >
          <Typography variant='h5'  sx={(x.answer === x.correct && x.answer === x.answer4) ?  {borderBottom:'5px  solid #82DD55',color:'#82DD55'} :( x.answer === x.answer4 && x.answer !== x.correct ) ? {borderBottom:' 5px solid #E23636',color:'#E23636'}:  {background:'white'}} >
              {x.answer4}     
              </Typography>
          </Grid>
          </Grid>
          <Grid item xs={6} sm={6} md={6} >
          <hr />
  <Typography  variant='h5' sx>  {t('correctAnswer')}: {x.correct}
          </Typography>
          </Grid>
          </Paper>
              </Box>
          ))}
            </>
          }
          <br />
          <Button variant='contained' color='primary' onClick={() => navigate('/')}>{t('goToMainMenu')}</Button>
          <br />
          <br />
            </>
            }      
        </>
    </Container>
)
}
export default Quiz