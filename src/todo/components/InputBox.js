import React, { useState, useContext } from 'react'
import { Context } from '..'

export const InputBox = (props) => {
  const [ value , setValue ] = useState('')
  const store = useContext(Context)

  const onChange = (ev) => {
    setValue(ev.target.value)
  }
  const onKeyUp = ev => {
    if (ev.keyCode === 13 && value) {
      store.add({
        id: Date.now(),
        name: value,
        status: 'pending'
      })
      setValue('')
    }
  }
  return (
    <input type="text" className="new-todo" value={value} onChange={onChange} onKeyUp={onKeyUp} />
  )
}
