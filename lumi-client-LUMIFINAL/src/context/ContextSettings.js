import React, { useState, createContext } from "react";
import { useTranslation } from "react-i18next";
import swal from 'sweetalert';
export const ContextSettings = createContext();
export const CreateSettingsProvider = ({ children }) => {
  const { t ,i18n} = useTranslation();
  const [lang, setLang] = React.useState("");
  const handleChange = (event) => {
    setLang(event.target.value);
    console.log(lang)
    i18n.changeLanguage(event.target.value)
  };
const [toggle, setToggle] = useState(false)
const [myQuizzes,setMyQuizzes] = useState([])
const [offset,setOffset] = useState(0)
const [pageNum,setPageNum] = useState(0)
const [userInp,setUserInp]= useState('')
const [arrowBackAllowed,setArrowBackAllowed]= useState(false)
const [arrowForwardAllowed,setarrowForwardAllowed]= useState(true)
const [deleteEffect,setdeleteEffect] = useState(0)
const [joke,setJoke] = useState('')
const getMyQuizzes = async (pUserId,userInp) => {
  console.log(pUserId,"id bu")
  if (pUserId) {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/Quiz/myQuizzes?UserId=${pUserId}&&limit=9&&offset=${offset}&&userInp=${userInp}` );
      const data = await response.json();
      setMyQuizzes(data);
      if (data.length === 0) {
        setarrowForwardAllowed(false)
        console.log("bos")
      }
      // console.log(data)
    } catch (err) {
      console.log(err.message);
    }
  }
  };
  // handleDeleteQuizAndQuestions
  const handleDeleteQuizAndQuestions = (pQuizId) => {
    swal({
      title: t('sure'),
      text: t('deleteWarning'),
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        setdeleteEffect(deleteEffect + 1)
        fetch("http://localhost:8080/api/v1/Quiz/" + pQuizId, {
          method: "DELETE",
        });
        swal(t('deleted'), {
          icon: "success",
        });
        // console.log("delete" + pQuizId)
      } else {
        swal(t('safe'));
      }
    });
  };  
  const handleDecreaseOffset = (pOffset) => {
    if (pageNum === 1) {
      setArrowBackAllowed(false)
    }else{
      setArrowBackAllowed(true)
      setarrowForwardAllowed(true)
      // console.log('oldii')
    }
          if (offset === 0) {
            // console.log("inme")
            return
          }
          else{
            setPageNum(pageNum - 1)
            setOffset(offset- pOffset )
          }
        }
  const handleIncreaseOffset = (pOffset) => {
    console.log(typeof allQuizzes)
        setArrowBackAllowed(true)
          setOffset(offset + pOffset )
          setPageNum(pageNum + 1)
        }
const getAJoke = async ()=> {
  if (toggle === false) return
  // console.log(lang,'dil')
  try {
    const response = await fetch(`https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single&&lang=${lang}` );
    const data = await response.json();
    setJoke(data.joke)
  } catch (err) {
    console.log(err.message);
  }
}
    return (
        <ContextSettings.Provider
          value={{
            getMyQuizzes,
            myQuizzes,
            handleDeleteQuizAndQuestions,
            setOffset,
            offset,
            handleDecreaseOffset,
            handleIncreaseOffset,
            pageNum,setUserInp,userInp,arrowBackAllowed,
            arrowForwardAllowed,
            setarrowForwardAllowed,deleteEffect
            ,getAJoke,
            handleChange,
            t,
            lang,
            joke,
            setToggle,
            toggle,
          }}
        >
          {children}
        </ContextSettings.Provider>
      );
}