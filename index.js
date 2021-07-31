
const ADD_TOD  = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_todo'; 
const ADD_GOAL = 'ADD_GOAL'; 
function addTodoAction(todo){
    return {
        todo:ADD_TODO,
        todo,
    }
}
function removeTodoAction(id){
    return {
        todo: REMOVE_TODO,
        id,
    }
} 
function toggleTodoAction(id){
    return  {
        type : TOGGLE_TODO, 
        id,
    }
}
function addGoalAction(goal){
    return {
        type :  ADD_GOAL , 
        goal,
    }
}  
function removeGoalAction(id){
    return{
        type : REMOVE_GOAL,  
        id , 
    }
}



function todos (state =[],  action){ 
    switch(action.type){
        case ADD_TODO:  
        return state.concat([action.todos]);  
        case 'REMOVE_TODO': 
        return state.filter((st)=>st.id!==action.id); 
        case 'TOGGLE_TODO' : 
        return state.map((todo)=> todo.id!==action.id ?  todo : 
            Object.assign({} ,  todo ,  {complete: !todo.complete}));
        default : 
        return state ; 
    }
} 
function goals (state =[], action){ 
    switch(action.type){
        case 'ADD_GOAL': 
            return state.concat([action.goal]);
        case 'REMOVE_GOAL': 
            return state.filter((goal)=>goal.id === action.id); 
        default : 
            return state;
    }
}
function app (state =[],  action ){
    return {
        todo :  todos(state.todo , action), 
        goals :  goals(state.goals , action)
    }
}

// Library

function createState(app){

    // the state tree
    // a way to get the state tree
    // a way to listen and respond to the state changing
    // a way to update the state
    let state ;  
    let listeners =[]
    const getState  =  ()=> state ;   
    const subscribe = (listener)=>{
        listeners.push(listener);  
        return  ()=>{
            listners =  listeners.filter((l)=> l!==listener); 
        }

    }
    const  dispatch = (action)=>{
        state =  app(state ,  action);  
        listeners.forEach((listener)=>listener()); 
    }
    return {
        getState,  
        subscribe ,  
        dispatch
    };   
}
const store =  createState(app);  



store.subscribe(()=>{
    console.log('the new state is ', store.getState()); 
});  
store.dispatch(addTodoAction({
        id :0 , 
        name : 'Learn Redux' , 
        complete :  false 
    }));
store.dispatch(removeTodoAction(1));
store.dispatch({
    type : ADD_TODO,
    todo : {
        id :0 , 
        name : 'Learn Redux' , 
        complete :  false 
    }
     
});store.dispatch(addGoalAction({
        id :0 , 
        name : 'Learn Redux' , 
        complete :  false 
    })
);
store.dispatch(removeGoalAction(0));
const  unsubscribe = store.subscribe(()=>{
    console.log('the store changes'); 
});  

unsubscribe(); 
