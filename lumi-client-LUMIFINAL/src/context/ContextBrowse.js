import React, { useState,createContext,useEffect } from "react";
export const ContextBrowse = createContext();
export const CreateBrowseProvider = ({ children }) => {
const [allQuizzes, setAllQuizzes] = useState([])
const [offset,setOffset] = useState(0)
const [pageNum,setPageNum] = useState(0)
const [category,setCategory]= useState('all')
const [sortBy,setSortBy]= useState('newest')
const [userInp,setUserInp]= useState('')
const [arrowBackAllowed,setArrowBackAllowed]= useState(false)
const [arrowForwardAllowed,setarrowForwardAllowed]= useState(true)
useEffect(() => {
  getMyQuizzes()
  setarrowForwardAllowed(true)
}, [pageNum,sortBy,category])
const getMyQuizzes = async (pInput) => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/Quiz/allQuizzes?limit=9&&offset=${offset}&&sortBy=${sortBy}&&category=${category}&&userInp=${userInp}` );
        const data = await response.json();
        setAllQuizzes(data);
        console.log(data)
        if (data.length === 0) {
          setarrowForwardAllowed(false)
          console.log("bos")
        }
      } catch (err) {
        console.log(err.message);
      }
    };
const handleDecreaseOffset = (pOffset) => {
if (pageNum === 1) {
setArrowBackAllowed(false)
}else{
setArrowBackAllowed(true)
setarrowForwardAllowed(true)
console.log('oldii')
}
    if (offset === 0) {
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
const handleCategoryChange = (pTargetValue) =>  setCategory(pTargetValue)
const handleSortChange = (pTargetValue) => setSortBy(pTargetValue)
const handleInputChange = (pTargetValue) => setUserInp(pTargetValue)
const handleQuizSearch = () => getMyQuizzes(userInp)
    return (
        <ContextBrowse.Provider
          value={{
            allQuizzes,
            handleDecreaseOffset,
            handleIncreaseOffset,
            pageNum,
            getMyQuizzes,
            handleCategoryChange,
            category,
            sortBy,
            handleSortChange,
            handleInputChange,
            handleQuizSearch,
            arrowBackAllowed,
            arrowForwardAllowed,
          }}
        >
          {children}
        </ContextBrowse.Provider>
      );
}