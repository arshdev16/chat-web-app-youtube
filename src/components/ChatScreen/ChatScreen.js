import React, { useState, useEffect, useRef } from 'react';
import { auth, firestore, ServerTimestamp } from '../../firebase';
import "./ChatScreen.css";
import { useLocation } from 'react-router-dom';
import { IoIosSend } from 'react-icons/io'

const ChatScreen = () => {
    const location = useLocation();
    const userId = location.pathname.split('/')[1];
    const [messages, setMessages] = useState([]);
    const messageRef = useRef(null);

    useEffect(() => {
        let unsubscribe;
        if (auth.currentUser) {
            const userRef = firestore.collection('users').doc(auth.currentUser.uid).collection("chats").doc(userId).collection("messages");
            unsubscribe = userRef.onSnapshot(snapshot => {
                let messages = [];
                snapshot.forEach(doc => {
                    if (doc.data().createdAt) {
                        messages.push({
                            id: doc.id, ...doc.data()
                        });
                    }
                })
                setMessages(messages);
            })
        }
        return () => unsubscribe();
    }, [userId])

    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
    }, [messages])


    return (
        <div className="ChatScreenContainer">
            <div ref={messageRef} className="MessagesContainer">
                {messages.map(message => (
                    <MessageItem messageItem={message} key={message.id} />
                ))}
                <MessageInput/>
            </div>
        </div>
    )
}

const MessageItem = ({ messageItem }) => {
    const { id, message, received, createdAt } = messageItem;
    const time =
        typeof createdAt === "number" ? new Date(createdAt) : createdAt.toDate();

    return (
        <div key={id} className={received === false ? "MessageSent" : "MessageReceived"}>
            <div className="Message">{message}</div>
            <div className='MessageTime'>{time.toLocaleTimeString()}</div>
        </div>
    )
}

const MessageInput = () => {

    const [message, setMessage] = useState('');
    const location = useLocation()
    const userId = location.pathname.split('/')[1];

    const sendMessage = async (e) => {
        e.preventDefault();
        try{
            const senderRef = firestore.collection("users").doc(auth.currentUser.uid).collection("chats").doc(userId).collection("messages");
            const receiverRef = firestore.collection("users").doc(userId).collection("chats").doc(auth.currentUser.uid).collection("messages");
            await senderRef({
                message: message, 
                received: false,
                createdAt: ServerTimestamp()
            })

            await receiverRef({
                message: message,
                received: true,
                createdAt: ServerTimestamp()
            })
            setMessage('');

        }catch(e){
            console.error(e.message)
        }
    }

    return (
        <div className='InputContainer'>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." className='MessageInput' />
            <button onClick={sendMessage} disabled={message.length < 1} className="SendButton">
                <IoIosSend size={30} />
            </button>
        </div>
    )

}


export default ChatScreen;