import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Counter {
  id: string
  value: number
  subscribeToUpdate: boolean
}

interface CounterState {
  counters: Array<Counter>
}

const initialState: CounterState = {
  counters: [
    { id: 'lsdkfjs-898-szxczxdf', value: 1, subscribeToUpdate: false },
  ],
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state, action: PayloadAction<string>) {
      const idx: Counter | undefined = state.counters.find(
        (c) => c.id === action.payload
      )
      if (idx) {
        state.counters[state.counters.indexOf(idx)].value += 1
      }
    },
    decrement(state, action: PayloadAction<string>) {
      const idx: Counter | undefined = state.counters.find(
        (c) => c.id === action.payload
      )
      if (idx) {
        state.counters[state.counters.indexOf(idx)].value -= 1
      }
    },
    deleteCounter(state, action: PayloadAction<string>) {
      const counter: Counter | undefined = state.counters.find(
        (c) => c.id === action.payload
      )
      if (counter) {
        state.counters.splice(state.counters.indexOf(counter), 1)
      }
    },
    addCounter(state, action: PayloadAction<Counter>) {
      state.counters.push(action.payload)
    },
  },
})

export const { increment, decrement, deleteCounter, addCounter } =
  counterSlice.actions

export default counterSlice.reducer
