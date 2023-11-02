import React from 'react'

function Logo({
 width = '100px',
 className=''}) {
  return (
    <div className={`font-bold ${className}`}>CodePro</div>
  )
}

export default Logo;