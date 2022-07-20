import { nanoid } from 'nanoid'
import React, { Fragment, useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../App/hooks'
import reactLogo from '../assets/react.svg'
import {
  addCounter,
  Counter as CounterInterface, decrement,
  deleteCounter, increment
} from '../features/counter/counter-slice'

export const Counter: React.FC = () => {
  const [noBtns, setNoBtns] = useState<CounterInterface[]>([])

  const { counters } = useAppSelector(
    (state) => ({
      counters: state.counters.counters,
    }),
    shallowEqual
  )

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
    const filterSubscribe = noBtns.filter((c) => c.subscribeToUpdate === true)
    if (!filterSubscribe.length) return
    const timer = setInterval(function () {
      filterSubscribe.forEach((el) => {
        dispatch(increment(el.id))
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [noBtns.length])

  return (
    <>
      <div>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="container">
        <h1>Супер счётчик</h1>
        {counters.map((c, idx) => {
          if (
            (idx + 1) % 4 === 0 &&
            !noBtns.find((counter) => counter.id === c.id)
          ) {
            setNoBtns((prev) => [...prev, c])
          }
          return (
            <Fragment key={c.id}>
              <div className="card">
                <button
                  style={{
                    display:
                      c.subscribeToUpdate || ((idx + 1) % 4 === 0 && c.subscribeToUpdate)
                        ? 'none'
                        : 'block',
                  }}
                  onClick={() => handleSubtr(c.id)}
                >
                  -
                </button>
                <p className="counter">{c.value}</p>
                <button
                  style={{
                    display:
                      c.subscribeToUpdate || ((idx + 1) % 4 === 0 && c.subscribeToUpdate)
                        ? 'none'
                        : 'block',
                  }}
                  onClick={() => handleAdd(c.id)}
                >
                  +
                </button>
                <button onClick={() => handleDeleteCounter(c.id)}>
                  Удалить
                </button>
              </div>
              <button
                className="button-more"
                style={{
                  display: counters.length === idx + 1 ? 'block' : 'none',
                }}
                onClick={() => {
                  addMoreCounters((idx + 2) % 4 === 0)
                }}
              >
                Добавить еще!
              </button>
            </Fragment>
          )
        })}
        {counters.length === 0 && (
          <button
            onClick={() => {
              addMoreCounters(false)
            }}
          >
            Добавить счётчик!
          </button>
        )}
      </div>
    </>
  )
}
