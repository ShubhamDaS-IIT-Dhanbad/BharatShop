import { createSlice } from "@reduxjs/toolkit";
const initialState={
    todos:[{id:99,text:"90"}]
}
const todoSlice=createSlice({
    name:"you",
    initialState,
    reducers:{
        addTodo:(state,action)=>{
            {console.log("ji",action.payload)}
            const todo={
                id:action.payload[0],
                text:action.payload[1]
            }
            {console.log("state",action.payload)}
            state.todos.push(action.payload);
        },
        removoTodo:(state,action)=>{
            state.todos=state.todos.filter((todo)=>todo.id!==action.payload)
        }
    }
})
export const{addTodo,removoTodo}=todoSlice.actions
export default todoSlice.reducer








