import React,{ useContext } from "react";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";
import { Alert } from "@mui/material";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import { ContextCreate } from "../context/ContextCreate";
const AddPerson = () => {
    const { t } = useTranslation();
    const CreateSection = useContext(ContextCreate);
return (
<>
{CreateSection.isQuizCreated ?  <Container>
      <Paper elevation={7}>
        <Box
          component="form"
          onSubmit={CreateSection.handleSubmit}
          sx={{ background: "white", borderRadius: 2 }}
          p={2}>
          <Typography variant='h3'>{t('addQuestion')}</Typography>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
          {!CreateSection.isAnswerMacthing && (
            <Alert severity="error">{t('doesNotMatch')} <strong>{t('checkItOut')}</strong></Alert>
          )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                className="col-12 p-2 m-1"
                placeholder={t('Question')}
                required
                value={CreateSection.question}
                onChange={(e) => CreateSection.setQuestion(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className="col-12  p-2 m-1"
                type="text"
                placeholder={t('Answer1')}
                required
                value={CreateSection.answer1}
                onChange={(e) => CreateSection.setAnswer1(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className="col-12 p-2 m-1"
                type="text"
                placeholder={t('Answer2')}
                required
                value={CreateSection.answer2}
                onChange={(e) => CreateSection.setAnswer2(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className="col-12 p-2 m-1"
                type="text"
                placeholder={t('Answer3')}
                required
                value={CreateSection.answer3}
                onChange={(e) => CreateSection.setAnswer3(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className="col-12 p-2 m-1"
                type="text"
                placeholder={t('Answer4')}
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
                placeholder={t('correctAnswer')}
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
                  {t('Add')}
                </Button>
              )}
              {CreateSection.isEditEnabled ? (
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  onClick={CreateSection.handleEditSave}
                  className="bg-btn btn"
                >
                 {t('saveChange')}
                </Button>
              ) : null}
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <br />
      <br />
    </Container>
: null}
</> 
);
};
export default AddPerson;