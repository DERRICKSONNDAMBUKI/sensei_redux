import todosReducer from './todosSlice'

test('toggles a todo bases on id', () => { 
    const initialState = [{id:0, text:'Test text', completed:false}]

    const action = {type: 'todod.todoToggled', payload: 0}
    result = todosReducer(initialState,action)

    expect(result[0].completed).toBe(true)
 })