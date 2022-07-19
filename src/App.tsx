import React, { Fragment, useEffect, useState } from 'react'
import './App.css'
import { useAppDispatch, useAppSelector } from './App/hooks'
import { increment, decrement, deleteCounter, addCounter, Counter } from './features/counter/counter-slice'
import { nanoid } from 'nanoid'
import { shallowEqual } from 'react-redux'

function App() {
  const [noBtns, setNoBtn] = useState<Counter | null>(null)


  const { counters } = useAppSelector((state) => ({
    counters: state.counters.counters
  }), shallowEqual)


  console.log(`counters`, counters)

  const dispatch = useAppDispatch()

  // get all data from state

  // handle add counter => add counter to state 

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

  const addMoreCounters = (): void => {
    const id = nanoid()
    dispatch(addCounter({ id, value: valueAdder() }))
  }

  useEffect(() => {
    if (noBtns === null) return
    console.log(`useEffect`,)
    const countInterval = setInterval(() => {

      dispatch(increment(noBtns.id))
    }, 1000)
    setNoBtn(null)
    return () => clearInterval(countInterval)
  }, [noBtns])

  console.log('noBtns', noBtns)

  return (
    <div className="App">
      <div className='container'>

        <h1>Супер счетчик</h1>
        {counters.map((c, idx) => {
          if ((idx + 1) % 4 === 0) {
            setNoBtn(c)
          }
          return (
            <div className="card" key={c.id}>
              <button style={{ display: (idx + 1) % 4 === 0 ? 'none' : 'block' }} onClick={() => handleSubtr(c.id)}>-</button>
              <p className='counter'>{c.value}</p>
              <button style={{ display: (idx + 1) % 4 === 0 ? 'none' : 'block' }} onClick={() => handleAdd(c.id)}>+</button>
              <button onClick={() => handleDeleteCounter(c.id)}>Удалить</button>
            </div>
          )
        })}
        <p>
          <button onClick={addMoreCounters}>Добавить еще!</button>
        </p>

        <div className="read-the-docs">
          <p>· Каждый четвертый счетчик на странице не содержит кнопок + и - , а каждую секунду увеличивает свое значение на один; </p>
          <p>· При добавлении нового счетчика на страницу его значение будет равно сумме значений всех других счетчиков на странице (например, на странице два счетчика со значениями 3 и 7, у нового счетчика будет значение 10); </p>
          <p>· Данные счетчиков должны храниться в глобальном state (reducer); Дизайн не важен. Результатом выполнения задания должен быть npm-пакет с реализованным приложением. Файл package.json должен содержать команду для запуска приложения для просмотра в браузере. Важно: приложение должно быть написано с использованием синтаксиса ES6 (и выше)/Typescript. Результат можно выслать в виде архива или в виде ссылки на внешний ресурс (например, github)</p>
        </div>
      </div>
    </div>
  )
}

export default App
