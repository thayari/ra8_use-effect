import React from 'react'

export default function ListItem(props) {
  const handleClick = () => {
    props.itemActive(props.id);
  }

  return (
    <li className={props.active ? 'list-group-item active' : 'list-group-item'} onClick={handleClick}>
      {props.children}
    </li>
  )
}
