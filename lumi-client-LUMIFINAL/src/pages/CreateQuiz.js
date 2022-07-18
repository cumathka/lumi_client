import React from 'react';
import AddQuiz from '../components/AddQuiz'
import QuizList from '../components/QuizList'
import { CreateQuizProvider } from "../context/ContextCreate";
import QuizDescription from '../components/QuizDescription';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LoginError from './LoginError';
function CreateQuiz({userIdUserDB}) {
  return (
    <CreateQuizProvider>
      {userIdUserDB !== undefined ?  <QuizDescription userIdUserDB={userIdUserDB} /> : <LoginError/> }
    <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={7}lg={6} xl={6}> 
        <AddQuiz/>
        </Grid>
        <Grid item xs={12} sm={6} md={5} lg={6} xl={6}>
        <QuizList/>
        </Grid>
      </Grid>
    </Box>
    </CreateQuizProvider>
  )
}
export default CreateQuiz