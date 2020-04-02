import React, { useContext } from 'react'
import { Context } from '..'

export const Footer = (props) => {
  const store = useContext(Context)
  const count = store.items.reduce(
    (total, item) => total + (item.status === 'completed'? 0: 1), 0)

  return (
    <div className='footer'>
        <span className='todo-count'>{count} items left</span>
    </div>
  )
}
