import styled from "styled-components";
import { Button } from "@material-ui/core"
import { useState } from "react";
import { db } from "../firebase";
import firebase from "firebase/compat/app";
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from "../firebase";


const ChatInput = ({ channelName, channelId }) => {
   const [input, setInput] = useState("")
   const [user] = useAuthState(auth);

   const sendMessage = (event) => {

      event.preventDefault();
console.log(channelId)

      if (!channelId) {
         return false;
      }

      if(input === ""){
         return ;
      }

      db.collection("rooms").doc(channelId).collection("messages").add({
         message: input,
         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
         user:user.displayName
      });

      setInput("");

   }

   return (
      <ChatInputContainer>
         <form>
            <input
               onChange={(event) => { setInput(event.target.value) }}
               value={input}
               placeholder={`Message #${channelName}`} />
            <Button hidden type="submit" onClick={sendMessage}>
               Send
            </Button>
         </form>
      </ChatInputContainer>
   )
}

export default ChatInput;

const ChatInputContainer = styled.div`
border-radius: 20px;

>form{
   position: relative;
   display: flex;
   justify-content:center;
}

>form > input{
   position: fixed;
   bottom: 30px;
   width: 60%;
   border: 1px solid gray;
   border-radius:3px;
   padding: 20px;
   outline: none;
}

>form >button{
   position: fixed;
   bottom: 30px;
margin-left: 1050px;
}

`;