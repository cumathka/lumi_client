import { t } from "i18next";
import React, { useState, createContext } from "react";
import swal from 'sweetalert';
export const ContextEdit = createContext();
export const CreateEditProvider = ({ children }) => {
const [questionList,setquestionList] =useState([])
const [quiz,setQuiz] =useState([])
const [title,setQuizTitle] = useState()
const [details,setQuizDetails] = useState()
const [category,setCategory] = useState("Other")
const [userId, setuserId] = useState();
const [answer1, setAnswer1] = useState("");
const [answer2, setAnswer2] = useState("");
const [answer3, setAnswer3] = useState("");
const [answer4, setAnswer4] = useState("");
const [question, setQuestion] = useState("");
const [correct, setCorrectAnswer] = useState("");
const [isEditEnabled, setisEditEnabled] = useState(false);
const [isAnswerMacthing,setIsAnswerMacthing] = useState(true)
const [isQuizEditted, setIsQuizEditted] = useState(false)
const LIMIT =60;
const QUIZ_LENGTH = 50;
////////duration 
const [quizDuration,setQuizDuration] = useState(4)
const [durationValue, setValue] = React.useState(5);
const handleSliderChange = (event, newValue) => setValue(newValue);
const handleInputChange = (event) => {
  setValue(event.target.value === '' ? '' : Number(event.target.value));
};
const handleBlur = () => {
  if (durationValue <= 0) {
    setValue(1);
  } else if (durationValue > 60) {
    setValue(60);
  }
};
//////duration ends
const getData = async (QuizId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/Question/questions?QuizId=${QuizId}` );
      const data = await response.json();
      setquestionList(data);
    } catch (err) {
      console.log(err.message);
    }
  };
  const getQuiz = async (QuizId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/Quiz/` + QuizId );
      const data = await response.json();
      setQuiz([data]);
      setQuizTitle(data.title)
      setQuizDetails(data.details)
      setCategory(data.category)
      setValue(data.durationValue)
      console.log(data,"quiz bu")
    } catch (err) {
      console.log(err.message);
    }
  };
////////////////////QUIZ DETAILS  TITLE CATEGORY
const editQuizTable = async (e,userIdUserDB,editQuizId) => {
  if(((title !== "" || undefined) && details !==  "" && category !== "")){
    if(title.length >= LIMIT || details.length >= LIMIT|| category.length >= LIMIT) {
      swal({
        icon: 'error',
        title: 'Oops...',
        text: t('longText'),
      })
    }else{
      const personList = { title,details,category,durationValue};
      await fetch("http://localhost:8080/api/v1/Quiz/"+ editQuizId, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(personList),
      });
      console.log("edit quiz table oba")
      setIsQuizEditted(true)
    }
    }else{
      swal({
        icon: 'error',
        title: 'Oops...',
        text: t('emptyError'),
      })
    }
};
const cleanInputField = () => {
  setAnswer1("");  ////////this will clear the input fields
  setAnswer2("");
  setAnswer3("");
  setAnswer4("");
  setQuestion("");
  setCorrectAnswer("")
};
const handleEdit = (id) => {
  setisEditEnabled(true);  // when you click the edit symbol you will get back to the entered input data to change the user's data
  setAnswer1(id.answer1);
  setAnswer2(id.answer2);
  setAnswer3(id.answer3);
  setAnswer4(id.answer4);
  setQuestion(id.question);
  setCorrectAnswer(id.correct)
};
const handleEditSave = async (editQuizId) => {
  if((correct ===  answer1 ||correct ===  answer2 ||
    correct ===  answer3||correct ===  answer4)
    &&( answer1 !== "" &&  answer2 !== ""  && answer3 !== "" && answer4 !== "" && question !== "" && correct !== "" )
    ){
      if (((correct.length >= LIMIT || answer2.length >= LIMIT ||
        answer3.length >= LIMIT || answer4.length >= LIMIT || question.length >= LIMIT))) {
          swal({
            icon: 'error',
            title: 'Oops...',
            text: t('longText'),
          })
      }else{
        const editedPeronList = { answer1, answer2, answer3, answer4, question, correct };
        await fetch("http://localhost:8080/api/v1/Question/" + userId, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedPeronList),
        }).then(() => getData(editQuizId));
        cleanInputField();
        setisEditEnabled(false);
        setIsAnswerMacthing(true)
      }
    }else{
      setIsAnswerMacthing(false)
    }
};
const handleSubmit = (e,QuizId) => {
  e.preventDefault();
  if (questionList.length >=  QUIZ_LENGTH) {
    swal({
      icon: 'error',
      title: 'Oops...',
      text: t("longQuiz"),
    })
  }else{
    console.log(QuizId)
    if ((correct ===  answer1 ||correct ===  answer2 ||
      correct ===  answer3||correct ===  answer4)  ) {
        if (((correct.length >= LIMIT || answer2.length >= LIMIT ||
          answer3.length >= LIMIT || answer4.length >= LIMIT || question.length >= LIMIT))) {
            swal({
              icon: 'error',
              title: 'Oops...',
              text: t('longText'),
            })
        }else{
          console.log("cevap uyusuyor")
          const oneQuestion = { answer1, answer2, answer3, answer4, question ,correct};
            const questionWithQuizId = {...{oneQuestion},...{ QuizId}}
          fetch("http://localhost:8080/api/v1/Question", {
            method: "POST", ////use the POST method to save the infos in the db
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(questionWithQuizId), 
          }).then(() => getData(QuizId));
          console.log("questionWithQuizId",questionWithQuizId,1 +1 )
          cleanInputField();
          setIsAnswerMacthing(true)
        }
    }else{
      setIsAnswerMacthing(false)
    }
  }
};
const handleDelete = (pPersonId,QuizId) => {
  fetch("http://localhost:8080/api/v1/Question/" + pPersonId, {
    method: "DELETE",
  }).then(() => getData(QuizId));
  console.log("delete" + pPersonId)
};
  return (
    <ContextEdit.Provider
      value={{
        getData,
        getQuiz,
        quiz,
        questionList,
        title,
        details,
        category,
        setCategory,
        setQuizTitle,
        setQuizDetails,
        editQuizTable,
        handleSubmit,
        handleDelete,
        setuserId,
        handleEdit,
        setAnswer1,
        handleEditSave,
        answer1,
        answer4,
        setAnswer2,
        answer2,
        setAnswer3,
        answer3,
        question,
        setQuestion,
        setAnswer4,
        isEditEnabled,
        correct,
        setCorrectAnswer,
        isAnswerMacthing,
        isQuizEditted,
        setIsQuizEditted,
        setQuizDuration,
        quizDuration,
        handleSliderChange,
        handleInputChange,
        handleBlur,
        durationValue
      }}>
      {children}
    </ContextEdit.Provider>
  );
};