import React, { Fragment, useEffect } from 'react'
import './App.css'
import { useAppDispatch, useAppSelector } from './App/hooks'
import { increment, decrement, deleteCounter, addCounter, Counter } from './features/counter/counter-slice'
import { nanoid } from 'nanoid'
import { shallowEqual } from 'react-redux'
import reactLogo from './assets/react.svg'


function App() {

  const { counters } = useAppSelector((state) => ({
    counters: state.counters.counters
  }), shallowEqual)


  console.log(`counters`, counters)

  const dispatch = useAppDispatch()

  const handleAdd = (id: string): void => {
    dispatch(increment(id))
  }

  const handleSubtr = (id: string): void => {
    dispatch(decrement(id))
  }

  const handleDeleteCounter = (id: string): void => {
    dispatch(deleteCounter(id))
  }

  const valueAdder = (): number => {
    const sum = counters.reduce((acc, val) => {
      return acc + val.value
    }, 0)
    return sum
  }

  const addMoreCounters = (subscribeToUpdate: boolean): void => {
    const id = nanoid()
    dispatch(addCounter({ id, value: valueAdder(), subscribeToUpdate }))
  }

  useEffect(() => {
    const filterSubscribe = counters.filter(c => c.subscribeToUpdate === true)
    if (!filterSubscribe.length) return
    console.log(`filterSubscribe`, filterSubscribe)
    const timer = setInterval(function () {
      filterSubscribe.forEach(el => {
        dispatch(increment(el.id))
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [counters.length])


  return (
    <div className="App">
      <div>  <a href="https://reactjs.org" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a></div>
      <div className='container'>
        <h1>Супер счётчик</h1>
        {counters.map((c, idx) => {
          if ((idx + 2) % 4 === 0) {
            console.log(`idx`, idx)
          }
          return (
            <Fragment key={c.id}>
              <div className="card" >
                <button style={{ display: ((idx + 1) % 4 === 0 || c.subscribeToUpdate) ? 'none' : 'block' }} onClick={() => handleSubtr(c.id)}>-</button>
                <p className='counter'>{c.value}</p>
                <button style={{ display: ((idx + 1) % 4 === 0 || c.subscribeToUpdate) ? 'none' : 'block' }} onClick={() => handleAdd(c.id)}>+</button>
                <button onClick={() => handleDeleteCounter(c.id)}>Удалить</button>
              </div>
              <button className='button-more' style={{ display: (counters.length === idx + 1) ? 'block' : 'none' }} onClick={() => {
                addMoreCounters((idx + 2) % 4 === 0)
              }}>Добавить еще!</button>

            </Fragment>
          )
        })}
        {counters.length === 0 && <button onClick={() => {
          addMoreCounters(false)
        }}> Добавить счётчик! </button>}
        <div className="read-the-docs">
          <p>Здесь мой GitHub c портфолио и пэт проектами: <a href="https://github.com/Taneros">GitHub</a></p>
          <p>Здесь мое резюме на: <a href="https://spb.hh.ru/resume/78455b42ff0b10b6b70039ed1f496c3554514b?hhtmFrom=resume_list">HH </a></p>
          <p>Здесь мое резюме на : <a href="https://docs.google.com/document/d/1N3HXmzZawJsJQuCbZbTWzZiILi47BsBvA-H4N9WEujo/edit?usp=sharing">английском</a></p>
        </div>
      </div>
    </div >
  )
}

export default App
