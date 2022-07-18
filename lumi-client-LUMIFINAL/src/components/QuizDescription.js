import React,{ useContext }  from "react";
import {IconButton, Input, Slider, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { FormControl } from "@mui/material";
import { Select } from "@mui/material";
import { Button } from "@mui/material";
import { Paper } from "@mui/material";
import { MenuItem } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ContextCreate } from "../context/ContextCreate";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const QuizDescription = ({userIdUserDB}) => {
  const { 
    setCategory,setQuizTitle,setQuizDetails,
    category,title,details,handleSaveQuizTable,
    editQuizTable ,editQuizTableButton,
    isQuizCreated,isEditBtnEnabled,
    handleSliderChange,
    handleInputChange,
    handleBlur,
    durationValue
  } = useContext(ContextCreate);
  const { t } = useTranslation();
  return (
    <Container>
      {!isQuizCreated ? 
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
              label={t("quizTitle")}
              variant="outlined"
              color="primary"
              fullWidth
              value={title || ''}
              required
                onChange={(e)=> setQuizTitle(e.target.value)}
            />
            <TextField
              sx={{ background: "white" }}
              label={t("Details")} 
              variant="outlined"
              color="secondary"
              multiline
              rows={4}
              fullWidth
              value={details}
              required
                onChange={(e)=> setQuizDetails(e.target.value)}
            />
          </form>
        </Grid>
        <Grid item xs={12} md={6} >
            <FormControl
              fullWidth
              className="inputWidth"
              sx={{ background: "white", mt: 2 }}
            >
              <InputLabel id="demo-simple-select-label" >{t('Category')}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Age"
              >
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
          <Grid item xs={12} md={6}   >
      <Typography id="input-slider" gutterBottom>
          {t('duration')} (1-60 min)
      </Typography>
      <Grid container  sx={{background:'white',borderRadius:'8px'}}  alignItems="center" >
        <Grid item xs >
          <Slider
            value={typeof durationValue === 'number' ? durationValue : 0}
            onChange={handleSliderChange}
            marks={true}
            aria-labelledby="input-slider"
            min={1}
            max={60}
          />
        </Grid>
        <Grid item > 
          <Input
            value={durationValue}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
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
        {!isEditBtnEnabled ? <IconButton  variant='contained' color='success'  disabled={((title === "" ||title === undefined )|| (details === "" ||details === undefined)) ? true : false} onClick={(e) => {handleSaveQuizTable(e,userIdUserDB)}} ><AddCircleIcon sx={{fontSize:"200%"}}/></IconButton>: <Button variant='contained' color='primary' onClick={() => editQuizTable() }>{t('save')}</Button>  }
        </Grid>
      </Grid>
          : 
          <>
          <Paper elevation={10} >
          <Typography variant='h4'>{t("quizTitle")} : {title}</Typography>
          <Typography variant='h4'>{t('Details')} : {details}</Typography>
          <Typography variant='h4'>{t("Category")} : {category} </Typography>
          <Typography variant='h4'>{t('durationValue')} : {durationValue}</Typography>
          <Button sx={{m:3}} onClick={() => editQuizTableButton()} variant='contained' color="secondary">{t('EditDescription')}</Button>
          </Paper>
          <br />
          </>
          }
    </Container>
  );
}
export default QuizDescription;