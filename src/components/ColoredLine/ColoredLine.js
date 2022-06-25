import React from 'react';


function ColoredLine({ color }) {
  return (
    <hr
    style={{
        color: color,
        backgroundColor: color,
        height: 1,
        opacity:0.5,
        width:"auto",
       
        marginLeft:"-2%"
        
    }}
/>
  )
}

export default ColoredLine