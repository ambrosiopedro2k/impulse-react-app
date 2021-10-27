import React, { useContext } from 'react'
import { LoginBox } from './components/LoginBox'
import { MessageList } from './components/MessageList'
import styles from './styles/app.module.scss'
import { AuthContext } from './context/auth'
import { SendMessageForm } from './components/SendMessageForm'

export function App() { 

  const { user } = useContext(AuthContext)

  return (
    <main className={`${styles.contentWrapper} ${!!user ? styles.contentSigned : ''}`}>
      
      <MessageList />
      { !!user ? <SendMessageForm /> : <LoginBox />}
      
    </main>
  )
}

