import React, { useContext } from 'react'
import { Context } from '..'

export const ItemList = (props) => {
  const store = useContext(Context)

  return (
    <ul className='todo-list'>
      {
        store.items.filter(item => store.filter === 'all' || store.filter === item.status).map(item => {
          return (
            <Item item={item} key={item.id}></Item>
          )
        })
      }
    </ul>
  )
}

const Item = props => {
  const { item } = props
  const isCompleted = item.status === 'completed'
  const store = useContext(Context)

  const toggleComplete = () => {
    item.status = item.status === 'completed'? 'pending': 'completed'
    store.update()
  }

  return (
    <li className={item.status + ' view'}>
      <input type="checkbox" className='toggle' checked={isCompleted} onChange={toggleComplete} />
        <label>{item.name} </label>
        <button className='destroy' onClick={() => store.remove(item)}></button>
    </li>
  )
}
