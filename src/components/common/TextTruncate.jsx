import React from 'react'



const TextTruncate = ({text, numberCut }) => {
    return text.length > numberCut ? text.slice(0, numberCut) + '...' : text
}
export default TextTruncate