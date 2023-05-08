import React, { useState, useEffect } from 'react';
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,

} from 'firebase/firestore';
import { auth, db } from '../firebase';
import SendIcon from '@mui/icons-material/Send';

const Chat = (props) => {
  const { room } = props;

  const [newmessage, setnewmessage] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [messages, setMessages] = useState([]);

  const newmessageRef = collection(db, 'newmessages');

  useEffect(() => {
    const querynewmessage = query(newmessageRef, where('room', '==', room),orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(querynewmessage, (snapshot) => {
      const messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return unsubscribe;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newmessage === '') return;
    await addDoc(newmessageRef, {
      text: newmessage,
      createdAt: serverTimestamp(),
      user: displayName,
      room,
    });

    setnewmessage('');
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setDisplayName(user.displayName);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <div className='relative left-[20rem] '>
      <div><h1 className='font-extrabold text-xl '>Welcome to {room} !!</h1></div>
      <div className='bg-[#d09ae6] m-2 w-[32rem] rounded-lg'>
        {messages.map((message) => (
          <div className='p-2' key={message.id}>
            <span className='font-bold'>{message.user} : </span>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} action="">
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setnewmessage(e.target.value)}
          value={newmessage}
          className='rounded-md p-1 m-2 '
        />
        <button type="submit"><SendIcon/></button>
      </form>
    </div>
  );
};

export default Chat;
