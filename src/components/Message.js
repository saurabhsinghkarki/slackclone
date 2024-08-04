
import styled from "styled-components";

const Message = ({ message, user, timestamp }) => {
   return (
      <MessageContainer>
         <MessageInfo>
            <Heading>
               {user}{" "}
               <span>
                  {new Date(timestamp?.toDate()).toUTCString()}
               </span>
            </Heading>
            <p>
               {message}
            </p>
         </MessageInfo>
      </MessageContainer>
   )
}
export default Message;

const MessageContainer = styled.div`
display: flex;
align-items: center;
padding: 20px;
`;

const MessageInfo = styled.div`
padding-left:10px;

`;

const Heading = styled.h4`
color: gray;
   font-weight: 300;
   margin-left: 4px;
   font-size: 10px;

`;