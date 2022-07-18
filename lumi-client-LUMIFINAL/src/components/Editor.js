import React,{ useContext, useEffect } from 'react'
import { Alert, AlertTitle, Box, Button, Container, FormControl, Grid, IconButton, Input, InputLabel, MenuItem, Paper, Select, Slider, TextField, Typography } from '@mui/material';
import { ContextEdit } from '../context/EditContext';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useTranslation } from 'react-i18next';
function Editor({editQuizId,userIdUserDB}) {
  const { t } = useTranslation();
  const CreateSection = useContext(ContextEdit);
  useEffect(() => {
    CreateSection.getData(editQuizId)
    CreateSection.getQuiz(editQuizId)
  }, [])
  return (
  <>
  {
    editQuizId ? 
    <>
<div>Editor {editQuizId}
<Container >
    {!CreateSection.isQuizEditted && 
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} md={12}>
          <Typography
            variant="h6"
            color="textSecondary"
            component="h2"
            gutterBottom
          >
             {t('title')}
          </Typography>
          <form noValidate autoComplete="off">
            <TextField
              sx={{ background: "white", marginBottom: 2 }}
              // label={t("quizTitle")}
              variant="outlined"
              color="primary"
              fullWidth
              required
              value={CreateSection.title}
                onChange={(e)=> CreateSection.setQuizTitle(e.target.value)}
            />
            <TextField
              sx={{ background: "white" }}
              // label={t("Details")}
              variant="outlined"
              color="secondary"
              multiline
              rows={4}
              fullWidth
              required
              value={CreateSection.details}
                onChange={(e)=> CreateSection.setQuizDetails(e.target.value)}
            />
          </form>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl
              fullWidth
              className="inputWidth"
              sx={{ background: "white", mt: 2 }}
            >
              <InputLabel id="demo-simple-select-label">{t('Category')}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={CreateSection.category}
                onChange={(e) => CreateSection.setCategory(e.target.value)}
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
                <MenuItem value="General Knowledge">{t('GeneralKnowledge')}</MenuItem>
                <MenuItem value="Other...">{t('Other')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} >
      <Typography id="input-slider" gutterBottom>
          {t('duration')} (1-60 min)
      </Typography>
      <Grid container  alignItems="center"  sx={{background:'white',borderRadius:'8px'}} >
        <Grid item xs >
          <Slider
            value={typeof CreateSection.durationValue === 'number' ? CreateSection.durationValue : 0}
            onChange={CreateSection.handleSliderChange}
            marks={true}
            aria-labelledby="input-slider"
            min={1}
            max={60}
          />
        </Grid>
        <Grid item > 
          <Input
            value={CreateSection.durationValue}
            size="small"
            onChange={CreateSection.handleInputChange}
            onBlur={CreateSection.handleBlur}
            step={60}
            inputProps={{
              step: 10,
              min: 1,
              max: 60,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
        <IconButton  variant='contained'  onClick={(e) => {CreateSection.editQuizTable(e,userIdUserDB,editQuizId)}} sx={{fontSize:'300%'}} ><ModeEditIcon fontSize="300px"/></IconButton>
        </Grid>
      </Grid>
  }
          {CreateSection.isQuizEditted && <>
          <Paper elevation={10} >
          <Typography variant='h4'>{t('Category')} : {CreateSection.category} </Typography>
          <Typography variant='h4'>{t('quizTitle')} : {CreateSection.title}</Typography>
          <Typography variant='h4'>{t('Details')} : {CreateSection.details}</Typography>
          <Typography variant='h4'>{t('durationValue')} : {CreateSection.durationValue}</Typography>
          <Button sx={{m:3}} onClick={() => CreateSection.setIsQuizEditted(false)} variant='contained' color="secondary">{t('EditDescription')}</Button>
          </Paper>

          <br />
          </>}
    </Container>
    <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={7}lg={6} xl={6}> 
           {/* add quiz */}
        <Container>
      <Paper elevation={7}>
        <Box
          component="form"
          onSubmit={(e) => CreateSection.handleSubmit(e,editQuizId)}
          sx={{ background: "white", borderRadius: 2 }}
          p={2}>
          <Typography variant='h3'>{t('addQuestion')}</Typography>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
          {!CreateSection.isAnswerMacthing && (
            <Alert severity="error" >
              <AlertTitle>Error</AlertTitle>
              Question value does not match any of the option values <strong>check it out!</strong>
            </Alert>
          )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                className="col-12 p-2 m-1"
                placeholder={t("Question")}
                required
                value={CreateSection.question}
                onChange={(e) => CreateSection.setQuestion(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className="col-12  p-2 m-1"
                type="text"
                placeholder={t("Answer1")}
                required
                value={CreateSection.answer1}
                onChange={(e) => CreateSection.setAnswer1(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className="col-12 p-2 m-1"
                type="text"
                placeholder={t("Answer2")}
                required
                value={CreateSection.answer2}
                onChange={(e) => CreateSection.setAnswer2(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className="col-12 p-2 m-1"
                type="text"
                placeholder={t("Answer3")}
                required
                value={CreateSection.answer3}
                onChange={(e) => CreateSection.setAnswer3(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className="col-12 p-2 m-1"
                type="text"
                placeholder={t("Answer4")}
                name="password"
                required
                value={CreateSection.answer4}
                onChange={(e) => CreateSection.setAnswer4(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                className="col-12 p-2 m-1"
                type="text"
                placeholder={t("correctAnswer")}
                required
                value={CreateSection.correct}
                onChange={(e) => CreateSection.setCorrectAnswer(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              {CreateSection.isEditEnabled ? null : (
                <Button
                  type="submit"
                  color="success"
                  variant="contained"
                  className="bg-btn btn"
                >
                  { t('Add')}
                </Button>
              )}
              {CreateSection.isEditEnabled ? (
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  onClick={() => CreateSection.handleEditSave(editQuizId)}
                  className="bg-btn btn"
                >
                  {t('saveChange')}
                </Button>
              ) : null}
            </Grid>
          </Grid>
        </Box>
      </Paper>
      {/* {CreateSection.list.length === 0 ? null : <Button fullWidth variant='contained' onClick={(e) => CreateSection.handleSaveQuizTable(e)}> save Quiz</Button>} */}
      <br />
      <br />
    </Container>
{/* add quiz */}
        </Grid>
        <Grid item xs={12} sm={6} md={5} lg={6} xl={6}>
        {/* <QuizList/> */}
        <Container>
        <Paper style={{maxHeight: 640, overflow: 'auto'}} elevation={7} >
        {CreateSection.questionList.map((x) => (
            <div key={x.id} >
            <Box sx={{ flexGrow: 1 ,border:" 10px solid #C4C4C4",overflow:'scroll'} } p={3} m={3}   >
            <Grid container spacing={3}>  
            <Grid item xs={12} md={12}>
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
        <Typography  variant='overline' color='darkgreen' sx={{overflowWrap:'break-word',height:'100%'}}>
            {x.correct}
            </Typography>
        </Grid>
        <Grid item xs={12} md={12} >
        <Button  sx={{margin:1}} onClick={() => CreateSection.handleDelete(x.id,editQuizId)} color='error'  variant="contained"  startIcon={<DeleteIcon />}>{t('Delete')}</Button>
        <Button onClick={() => {CreateSection.handleEdit(x);CreateSection.setuserId(x.id)} } variant='contained' color='secondary' startIcon={<ModeEditIcon/>}>{t('Edit')}</Button>
        </Grid>
        </Grid>
            </Box>
            </div>
        ))}
</Paper>
</Container>
        </Grid>
      </Grid>
    </Box>
    </div>
    </>
    :
    <h1>an error has occurred </h1>
  }
  </>
  )
}
export default Editor