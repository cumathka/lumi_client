import React from 'react';
import Settings from '../components/Settings';
import { CreateSettingsProvider } from '../context/ContextSettings';
function UserSettings({userIdUserDB,setEditQuizId}) {
  return (
    <CreateSettingsProvider>
      <Settings userIdUserDB={userIdUserDB} setEditQuizId={setEditQuizId}/>
    </CreateSettingsProvider>
  )
}
export default UserSettings