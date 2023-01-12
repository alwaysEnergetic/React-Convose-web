import styled, { keyframes } from "styled-components/macro"

const sound = keyframes`
0% {
    opacity: 0.3;
     height: 5px; 
 }
 100% {
     opacity: 1;       
     height: 20px;        
 }
`
export const StyledVoiceAnimation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
`
export const StyledBar = styled.div`
  background: #fff;
  bottom: 1px;
  height: 30px;
  width: 5px;
  margin: 0px 4px;
  border-radius: 5px;
  animation: ${sound} 0ms -600ms linear infinite alternate;
  animation-duration: ${(props) => props.duration}ms;
  left: ${(props) => props.left}px;
`
