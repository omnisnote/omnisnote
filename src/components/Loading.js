/** @jsx jsx */
import { css, jsx, keyframes } from '@emotion/core'

const loader = keyframes`
  from {
    width: 0;
    left: 0;
  }

  50% {
    width: 60%;
  }
  
  to {
    width: 0%;
    left: 100%;
  }
`

const Bar = ({ opacity, delay, time, theme }) => (
  <div css={ th => ({ 
    backgroundColor: (theme && theme.main) || th.main || "#000",
    animation: `${loader} ${time} infinite ease-in-out ${delay}`,
    position: "absolute",
    height: "2px",
    opacity
  })}></div>
)

export default function Loading(props) {
  if(props.center) document.body.style.backgroundColor = props.theme ? props.theme.body : ""
  return (
    <div css={ theme => ({
      position: "fixed",
      top: props.center ? "50vh" : 0,
      left: 0,
      height: "2px",
      width: "100%",
      zIndex: 100000000,
      backgroundColor: (props.theme && props.theme.body) || theme.body || "#fff"
    })}>
      <Bar theme={ props.theme } opacity="0.6" delay="0.5s" time="1.8s"/>
      <Bar theme={ props.theme } opacity="0.6" delay="1s"   time="1s"/>
      <Bar theme={ props.theme } opacity="0.6" delay="1.5s" time="1.5s"/>
    </div>
  )
}
