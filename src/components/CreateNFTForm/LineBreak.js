import React from 'react';


function LineBreak({ color,marginTop }) {
  return (
    <hr
    style={{
        color: color,
        backgroundColor: color,
        height: 1,
    }}
/>
  )
}

export default LineBreak