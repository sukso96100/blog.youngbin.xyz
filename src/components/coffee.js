import React from 'react'
export default function BuyMeACoffee(props) {
  return (
    <a href={`https://www.buymeacoffee.com/${props.username}`} target="_blank">
      <img
        src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
        alt="Buy Me A Coffee"
        style={{height: '60px', width: '217px'}}
      />
    </a>
  )
}
//"height: 60px !important;width: 217px !important;"