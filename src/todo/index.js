import React, { createContext, useReducer } from 'react'
import 'todomvc-common/base.css'
import 'todomvc-app-css/index.css'
import { Footer } from './components/Footer'
import { InputBox } from './components/InputBox'
import { ItemList } from './components/ItemList'

const defaultValue = load() || {
  items: [],  
  filter: 'all' // 'completed' | 'pending'
}

/**
 * Item
 * - id 
 * - name 
 * - status
 *
 */

export const Context = createContext(defaultValue)

export const TodoApp = (props) => {
  const [store, dispatch] = useReducer(reducer, defaultValue)

  return (
    <Context.Provider value={{
      ...store,
      add: item => dispatch({ type: 'add', item }),
      remove: item => dispatch({ type: 'remove', item }),
      update: () => dispatch({ type: 'update' }),
      changeFilter: (filter) => dispatch({ type: 'change-filter', filter }),
      }} >
      <div className='todoapp'>

          <h1>Ninja Todo</h1>
        <header>
          <InputBox />
        </header>

        <div className='main'>
            <ItemList></ItemList>
        </div>

        <Footer></Footer>
      </div>
    </Context.Provider>
  )
}


function reducer(state, action) {
  let ret = state
  switch (action.type) {
    case 'add': {
      const { item } = action
      ret.items.push(item)
      ret = Object.assign({}, ret)
      break
    }
    case 'remove': {
      const { item } = action
      const idx = ret.items.indexOf(item)
      if (idx >= 0) {
        ret.items.splice(idx, 1)
        ret = Object.assign({}, ret)
      }
      break
    }
    case 'update': {
      ret = Object.assign({}, ret)
      break
    }
    case 'change-filter': {
      const { filter } = action
      ret.filter = filter
      break
    }
  }
  save(ret)
  return ret
}

function save(obj) {
  localStorage.setItem('s', JSON.stringify(obj))
}

function load() {
  try {
    return JSON.parse(localStorage.getItem('s'))
  } catch(e) {
    return null
  }
}


