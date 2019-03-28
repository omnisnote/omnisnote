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

const Bar = ({ opacity, delay, time }) => (
  <div css={ theme => ({ 
    backgroundColor: theme.main || "#7a42a5",
    animation: `${loader} ${time} infinite ease-in-out ${delay}`,
    position: "absolute",
    height: "4px",
    opacity
  })}></div>
)

export default function Loading(props) {
  return (
    <div css={ theme => ({
      position: "fixed",
      top: 0,
      left: 0,
      height: "4px",
      width: "100%",
      zIndex: 100000000,
    })}>
      <Bar opacity="0.4" delay="0.5s" time="2s"/>
      <Bar opacity="0.4" delay="1s"   time="1s"/>
      <Bar opacity="0.4" delay="1.5s" time="1.5s"/>
    </div>
  )
}
