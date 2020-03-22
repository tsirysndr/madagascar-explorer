import React, { useState } from 'react'


const Popover = (props) => {
  return (
    <div id="search-popover" className={props.popoverClass}>
      <div style={{ display: 'flex', height: 64 }} onClick={() => props.setExpanded(true) }>
        <input 
          id='search'
          placeholder='Search ...' 
          style={{ marginLeft: 50 }} 
          autoComplete='off'
        />
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14 14" className="search-icon"
          style={{ position: 'absolute', top: 20, left: 15 }}
        >
          <g fill="none" fillRule="evenodd">
          <path d="M-5-5v24h24V-5z"></path>
          <path fill="#5C5C6E" fillRule="nonzero" d="M12.003 13.657L8.96 10.616c-.016-.016-.027-.035-.042-.052a5.756 5.756 0 1 1 1.645-1.645c.017.015.036.026.052.042l3.041 3.042a1.17 1.17 0 0 1-1.654 1.654zM9.516 5.756a3.76 3.76 0 1 0-7.52 0 3.76 3.76 0 0 0 7.52 0z"></path>
          </g>
        </svg>
      </div>
    </div>
  )
}

export default Popover