import React from 'react';
import "./style.scss";

export const LoadingButton = ({label, onClick, loading, color, bcolor, width, icon, style, className, title}) => {
  if (loading) return (
    <div
      className='truth-btn'
      style={{ backgroundColor: bcolor, width: width, ...style }}
      onClick={() => {}}>
      <i class="pi pi-spin pi-spinner" />
    </div>
  )
  return(
    <div
      className={`truth-btn ${className}`}
      title={title}
      style={{ backgroundColor: bcolor, width: width, ...style }}
      onClick={onClick}>
      <i className={icon} />
      <span>{label}</span> 
    </div>
  )
}