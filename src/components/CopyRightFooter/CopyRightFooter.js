import React from 'react';
import './CopyRightFooter.css'

function CopyRightFooter() {
  const year = new Date().getFullYear();
  return (
    <div className='footer '>
        <span>Copyright © {year} . All rights Reserved.</span> 
    </div>
  ) 
}

export default CopyRightFooter