# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Redux toolkit  notes

1. Create Store - single source of truth
   it has configureStore
   introduce reducer

2. Create Slice(functions) method(createSlice)
   Slice has name, initialState, reducers :{key: 
   function}
   Access of two things (State, action)
   state = state value in the store
   action = action.payload 
   export individual functionality 
   export main source export

3. Add Todo - Give values to State i.e Dispatch 
   Courier  = use method useDispatch()
   dispatch(addTodo())

4. Take Values - useSelector((state) 
   =>state.todos) state ka access chaiye
   variable me values lelo ek baar aagaie uske 
   baad pure JS concept hai 

Note: Todo's Project basic nai hote xD  :)

