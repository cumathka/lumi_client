import React from 'react';
import BrowseQuizzes from '../components/BrowseQuizzes'
import { CreateBrowseProvider } from '../context/ContextBrowse';
const  BrowsePage = ()=>{
  return (
    <CreateBrowseProvider>
        <BrowseQuizzes />
    </CreateBrowseProvider>
  )
}
export default BrowsePage