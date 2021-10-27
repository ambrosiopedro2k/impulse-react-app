import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { api } from '../../services/api';

import styles from './styles.module.scss'

import logoImg from '../../assets/logo.svg'

type Message = {
  id: string,
  text: string,
  user: {
    name: string,
    avatar_url: string,
  }
}

let messagesQueue: Message[] = []

const socket = io('http://localhost:8090')

socket.on("new message", (newMessage: Message) => {
  messagesQueue.push(newMessage)
})

export function MessageList() {

  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    setInterval(()=> {
      if (messagesQueue.length > 0) {
        setMessages(prevState => [
          messagesQueue[0],
          prevState[0],
          prevState[1],
        ].filter(Boolean))

        messagesQueue.shift()
      }
    }, 3000)
  }, [])
  
  useEffect(() => {
     api.get<Message[]>('messages/last3').then(response => {
       console.log(response.data)
       setMessages(response.data)

     }).catch((error) => {
       console.error(`there's an error ${error}`)
     })
  }, [])

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile logo image" />

      <ul className={styles.messageList}>
        
        {
          messages.map(message => 
            <li key={message.id} className={styles.message}>
              <p className={styles.messageContent}>
                {message.text}
              </p>

              <div className={styles.messageUser}>

                <div className={styles.userImage}>
                <img src={message.user.avatar_url} alt="Ambrósio Pedro image" />
                </div>
                <span>{message.user.name}</span>

              </div>
            </li>
          )
        } 
       
      </ul>
    </div>
  )
}
