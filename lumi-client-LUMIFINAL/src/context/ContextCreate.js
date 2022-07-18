import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, createContext,useEffect } from "react";
import { useTranslation } from "react-i18next";
import swal from "sweetalert";
export const ContextCreate = createContext();
export const CreateQuizProvider = ({ children }) => {
////show add question 

const {t} = useTranslation();
const { user } = useAuth0()
const [QuizId,setCurrentQuizId] = useState()
///// id from user table 
///////quiz name details category
const [title,setQuizTitle] = useState()
const [details,setQuizDetails] = useState()
const [category,setCategory] = useState("Other")
///////quiz name details category
const [list, setList] = useState([]);
////input states
const [answer1, setAnswer1] = useState("");
const [answer2, setAnswer2] = useState("");
const [answer3, setAnswer3] = useState("");
const [answer4, setAnswer4] = useState("");
const [question, setQuestion] = useState("");
const [correct, setCorrectAnswer] = useState("");
const [userId, setuserId] = useState(); ///this state helps us to get the user's id of the clicked user
const [isEditEnabled, setisEditEnabled] = useState(false); ///if you click the edit symbol the "save edit" button  will appear else add button will be active
const [isAnswerMacthing,setIsAnswerMacthing] = useState(true)
const [isEditBtnEnabled, setIsEditBtnEnabled] = useState(false)
const LIMIT = 60;
const QUIZ_LENGTH = 50;
const editQuizTableButton = () => {
  setIsQuizCreated(false)
  setIsEditBtnEnabled(true)
}
const [isQuizCreated, setIsQuizCreated] = useState(false)
////////duration 
const [durationValue, setValue] = React.useState(5);
const handleSliderChange = (event, newValue) => {
  setValue(newValue);
};
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
  const handleDelete = (pPersonId) => {
    fetch("http://localhost:8080/api/v1/Question/" + pPersonId, {
      method: "DELETE",
    }).then(() => getData());
    console.log("delete" + pPersonId)
  };
  const cleanInputField = () => {
    setAnswer1("");  ////////this will clear the input fields
    setAnswer2("");
    setAnswer3("");
    setAnswer4("");
    setQuestion("");
    setCorrectAnswer("")
    console.log(correct)
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (list.length >= QUIZ_LENGTH) {
      swal({
        icon: 'error',
        title: 'Oops...',
        text: t("longQuiz"),
      })
    }else if((question.length <= LIMIT && correct.length <= LIMIT && answer2.length <= LIMIT &&
      answer3.length <= LIMIT && answer4.length <=LIMIT)){

      if ((correct ===  answer1 ||correct ===  answer2 ||
        correct ===  answer3||correct ===  answer4) ) {
          console.log("cevap uyusuyor")
          const oneQuestion = { answer1, answer2, answer3, answer4, question ,correct};
            const questionWithQuizId = {...{oneQuestion},...{ QuizId}}
          fetch("http://localhost:8080/api/v1/Question", {
            method: "POST", ////use the POST method to save the infos in the db
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(questionWithQuizId),
          }).then(() => getData());
          console.log("questionWithQuizId",questionWithQuizId,1 +1 )
          cleanInputField();
          setIsAnswerMacthing(true)
          console.log(correct.length ,answer1.length,answer2.length,answer3.length,answer4.length)
      }else{
        setIsAnswerMacthing(false)
      }
    }else{
      swal({
        icon: 'error',
        title: 'Oops...',
        text: t("longText") ,
      })
    }
  };
  /////GET DATA WHEN THE PAGE LOADS (BUT FIRST YOU HAVE TO TYPE json-server --watch data/db.json --port 8000 IN THE TERMINAL )
  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/Question/questions?QuizId=${QuizId}` );
      const data = await response.json();
      setList(data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    if (QuizId !== undefined) {
      getData();
    }
  }, []);
  const handleEdit = (id) => {
    setisEditEnabled(true);  // when you click the edit symbol you will get back to the entered input data to change the user's data
    setAnswer1(id.answer1);
    setAnswer2(id.answer2);
    setAnswer3(id.answer3);
    setAnswer4(id.answer4);
    setQuestion(id.question);
    setCorrectAnswer(id.correct)
  };
  const handleEditSave = async () => {
    if(
        (correct ===  answer1 ||correct ===  answer2 ||
      correct ===  answer3||correct ===  answer4)
      &&( answer1 !== "" &&  answer2 !== ""  && answer3 !== "" && answer4 !== "" && question !== "" && correct !== "" )
      ){
        if (((correct.length >= LIMIT || answer2.length >= LIMIT ||
          answer3.length >= LIMIT || answer4.length >= LIMIT))) {
            swal({
              icon: 'error',
              title: 'Oops...',
              text: t("longText"),
            })
            console.log(correct.length ,answer1.length,answer2.length,answer3.length,answer4.length)
        }else{
          const editedQuestionList = { answer1, answer2, answer3, answer4, question, correct };
          await fetch("http://localhost:8080/api/v1/Question/" + userId, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editedQuestionList),
          }).then(() => getData());
          console.log("put" + userId)
          cleanInputField();
          setisEditEnabled(false);
          setIsAnswerMacthing(true)
          console.log(correct.length ,answer1.length,answer2.length,answer3.length,answer4.length)
        }
      }else{
        setIsAnswerMacthing(false)
      }

  };
////////////////////QUIZ DETAILS  TITLE CATEGORY
const handleSaveQuizTable =async (e,userIdUserDB) => {
  e.preventDefault();
  console.log('quiz kaydedtim')
  if ((title !== "" || undefined) && details !==  "" && category !== "" && userIdUserDB !== undefined) {
    if (title.length >= LIMIT ||details.length >= LIMIT ||category.length >= LIMIT || userIdUserDB.length >= LIMIT) {
      swal({
        icon: 'error',
        title: 'Oops...',
        text:  t("longText"),
      })
    }else{
      const userAvatar = user.picture
      const descriptionList = { title,details,category,userIdUserDB,userAvatar,durationValue};
      const response = await fetch("http://localhost:8080/api/v1/Quiz", {
        method: "POST", ////use the POST method to save the infos in the db
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(descriptionList),
      });
      const data = await response.json()
      setCurrentQuizId(data.id)
      console.log(data.id,"quizden gelen response data")
      console.log("quiz saved "+ title + details + category +userIdUserDB)
      setIsQuizCreated(true)
    }
  }else{
    console.log('please enter title details or')
    isQuizCreated(false)
  }
};
///////////edit quiz details title category editQuizTable
const editQuizTable = async () => {
  if(((title !== "" || undefined) && details !==  "" && category !== "")){
    if (title.length >= LIMIT || details.length >= LIMIT || category.length >= LIMIT) {
      swal({
        icon: 'error',
        title: 'Oops...',
        text: t("longText"),
      })
    }else{
      const editedDescriptionList = { title,details,category,durationValue};
      await fetch("http://localhost:8080/api/v1/Quiz/"+ QuizId, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedDescriptionList),
      });
      console.log("edit quiz table")
      setIsQuizCreated(true)
    }
  }else{
    swal({
      icon: 'error',
      title: 'Oops...',
      text:t('emptyError'),
    })
  }
};
  return (
    <ContextCreate.Provider
      value={{
        handleSubmit,
        answer1,
        answer4,
        setAnswer1,
        setAnswer2,
        answer2,
        setAnswer3,
        answer3,
        question,
        setQuestion,
        setAnswer4,
        handleEdit,
        handleEditSave,
        isEditEnabled,
        list,
        handleDelete,
        setuserId,
        correct,
        setCorrectAnswer,
        isAnswerMacthing,
        setQuizTitle,
        setQuizDetails,
        setCategory,
        title,
        details,
        category,
        handleSaveQuizTable,
        isQuizCreated,
        editQuizTable,
        QuizId,
        editQuizTableButton,isEditBtnEnabled,
        handleSliderChange,
        handleInputChange,
        handleBlur,
        durationValue
      }}>
      {children}
    </ContextCreate.Provider>
  );
};