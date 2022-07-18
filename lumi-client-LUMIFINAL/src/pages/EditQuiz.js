import React from 'react';
import Editor from '../components/Editor';
import { CreateEditProvider } from '../context/EditContext';
function EditQuiz({editQuizId,userIdUserDB}) {
  return (
    <CreateEditProvider>
        <Editor editQuizId={editQuizId} userIdUserDB={userIdUserDB}/>
    </CreateEditProvider>
  )
}
export default EditQuiz