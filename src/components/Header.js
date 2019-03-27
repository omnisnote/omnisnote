/** @jsx jsx */
import { css, jsx } from '@emotion/core'

export default function Header(props) {
  return (
    <header css={ css`
      position: fixed;
      height: 56px;
      width: 100%;
      background-color: #fff;
      box-shadow: 0 8px 12px -4px rgba(0,0,0,0.2);
    ` }>
      
    </header>
  )
}
