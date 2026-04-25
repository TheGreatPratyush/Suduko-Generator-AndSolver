import React from 'react'
import "./index.css"
const Frontpage = ({handleStartGame}) => {
  return (
    <div className="background">
      <button className='playButton buttonGame' onClick={()=>{
        handleStartGame()
        console.log("button clicked")

      }}>Play Suduko</button>
      <button className='uploadSuduko buttonGame'>Upload Suduko</button>
    </div>
  )
}

export default Frontpage
