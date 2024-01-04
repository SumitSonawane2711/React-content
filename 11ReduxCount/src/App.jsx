import {useDispatch,useSelector} from 'react-redux'
import {increment,decrement} from './slices/counter'

import './App.css'

function App() {
  const count = useSelector((state) => state.counter)
  const dispatch = useDispatch();
  
  return (
    <>
      <h1> Count is {count}</h1>
      <button onClick={()=>dispatch(increment())}>Increment</button>
      <button onClick={()=>dispatch(decrement())}>Decrement</button>   
    </>
  )
}

export default App
