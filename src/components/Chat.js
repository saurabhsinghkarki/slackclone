import styled from "styled-components";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined"
import InfoIcon from '@material-ui/icons/Info';
import { useSelector } from "react-redux";
import ChatInput from "./ChatInput";
import { useCollection, useDocument } from "react-firebase-hooks/firestore"
import { db } from "../firebase";
import Message from "./Message";
import { useRef } from "react";
import { useEffect } from "react";

const Chat = () => {

   const roomId = useSelector((state) => state.counter.roomId);
   // console.log(roomId);
   const [roomDetails] = useDocument(roomId && db.collection("rooms").doc(roomId));

   const [roomMessage, loading] = useCollection(roomId && db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp", "asc"));

   // console.log(roomDetails?.data());
   // console.log(roomMessage);
   useEffect(() => {
      chatRef?.current?.scrollIntoView({
         behavior: "smooth"
      });

   }, [roomId, loading]);

   const chatRef = useRef(null);
   return (
      <ChatContainer>
         {roomDetails && roomMessage &&
            <>
               <Header>
                  <HeaderLeft>
                     <h4><strong>#{roomDetails?.data().name}</strong></h4>
                     <StarBorderOutlinedIcon />
                  </HeaderLeft>
                  <HeaderRight>
                     <p>
                        <InfoIcon /> Details
                     </p>
                  </HeaderRight>
               </Header>

               <ChatMessages>
                  {roomMessage?.docs.map((doc) => {
                     const { message, timestamp, user } = doc.data()

                     return <Message
                        key={doc.id}
                        message={message}
                        timestamp={timestamp}
                        user={user}
                     />
                  })}

                  <ChatBottom ref={chatRef} />
               </ChatMessages>
               <ChatInput
                  channelName={roomDetails?.data().name}
                  channelId={roomId}
               />
            </>}

      </ChatContainer>
   )
}

export default Chat;

const ChatBottom = styled.div`
padding-bottom:200px;
`;

const ChatMessages = styled.div``;

const ChatContainer = styled.div`
flex: 0.7;
flex-grow:1;
overflow-y:scroll;
margin-top:60px;
`;

const Header = styled.div`
display: flex;
justify-content: space-between;
padding: 20px;
border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
display: flex;
align-items: center;

>h4 {
   display: flex;
   text-transform: lowercase;
   margin-right: 10px;
}

>h4 >MuiSvgIcon-root{
   margin-left: 10px;
   font-size: 18px;
}
`;

const HeaderRight = styled.div`
>p{
   display: flex;
   align-items: center;
   font-size: 14px;
}

>p > MuiSvgIcon-root{
   margin-right:  5px !important;
   font-size:16px;
}
`;