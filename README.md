# Redux Todo List App

This project is an enhanced version of a Todo List application, utilizing Redux for state management. It features a modern design, routing for different pages, and well-structured components. The app leverages Redux Toolkit to simplify the creation of reducers, stores, and their integration within the components.

## Table of Contents
- [Features](#features)
- [Initial State](#initial-state)
- [State Management with Redux](#state-management-with-redux)
  - [Creating the Slice](#creating-the-slice)
  - [Configuring the Store](#configuring-the-store)
- [Routing](#routing)
- [Components](#components)
  - [Items Component](#items-component)
  - [All Tasks Page](#all-tasks-page)
  - [Item Component](#item-component)
  - [New Task Page](#new-task-page)
- [Future Enhancements](#future-enhancements)

## Features
- Modern design and styles
- State management using Redux and Redux Toolkit
- Routing with `react-router-dom` for navigation between different pages
- Components and hooks to manage state within individual pages
- Initial state defined as a simple array of tasks

## Initial State
The initial state of the application is defined as a simple array of tasks:

```javascript
export const initialTasks = [
   {
      id: 1,
      title: "Complete TODO project",
      completed: false
   },
   {
      id: 2,
      title: "Buy funny toy for my cat",
      completed: false
   },
   {
      id: 3,
      title: "Check my weekly weight",
      completed: true
   }
];
```

## State Management with Redux

### Creating the Slice

The tasksSlice.js file defines the Redux slice for managing tasks:

```javascript
import { createSlice } from "@reduxjs/toolkit";
import { initialTasks } from "../data/tasks";

const tasksSlice = createSlice({
   name: "tasks",
   initialState: initialTasks,
   reducers: {
      addTask: (state, action) => {
         state.unshift(action.payload);
      },
      removeTask: (state, action) => {
         return state.filter(todo => todo.id !== action.payload);
      },
      toggleComplete: (state, action) => {
         const task = state.find(t => t.id === action.payload);
         if (task) task.completed = !task.completed;
      }
   }
});

export const { addTask, removeTask, toggleComplete } = tasksSlice.actions;
export default tasksSlice.reducer;

```

### Configuring the Store

The store.js file configures the Redux store:

```javascript
import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "../features/tasksSlice";

const store = configureStore({
   reducer: {
      tasks: tasksSlice
   }
});

export default store;

```

## Routing

The app uses react-router-dom for routing. Here is the App.js file with the routes:

```javascript
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import { Root } from './components/Root';
import { AllTasks } from './pages/AllTasks';
import { CompletedTasks } from './pages/CompletedTasks';
import { PendingTasks } from './pages/PendingTasks';
import { NewTask } from './pages/NewTask';
import { Page404 } from './pages/Page404';

function App() {
  const myRoute = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<AllTasks />}/>
      <Route path="/completed" element={<CompletedTasks />}/>
      <Route path="/pending" element={<PendingTasks />}/>
      <Route path="/new" element={<NewTask />}/>
      <Route path="/404" element={<Page404 />}/>
      <Route path="*" element={<Page404 />}/>
    </Route>
  ));

  return (
    <RouterProvider router={myRoute} />
  );
}

export default App;

```

## Components

### Items Component

The Items component displays a list of tasks:

```javascript
import { Item } from "./Item";

export function Items({ tasks, pageName }) {
   return (
      <div className="tasks">
         <h1>{pageName}</h1>
         {tasks && tasks.length > 0 ? (
            <div className="items">
               {tasks.map((task, index) => (
                  <div key={index}>
                     <Item task={task} />
                  </div>
               ))}
            </div>
         ) : (
            <p>No tasks to show....</p>
         )}
      </div>
   );
}

```

### All Tasks Page

The AllTasks page fetches all tasks from the Redux store:

```javascript
import { useSelector } from "react-redux";
import { Items } from "../components/Items";

export function AllTasks() {
   const tasks = useSelector(state => state.tasks);
   //const tasks = useSelector(state => state.tasks.filter(task => !task.completed)); //For PendingTasks page
   //const tasks = useSelector(state => state.tasks.filter(task => task.completed)); //For CompletedTasks page
   return (
      <Items tasks={tasks} pageName="All Tasks" />
   );
}

```

### Item Component

The Item component represents an individual task with controls to toggle completion and remove the task:

```javascript
import { useDispatch } from "react-redux";
import { removeTask, toggleComplete } from "../features/tasksSlice";

export function Item({ task }) {
   const dispatch = useDispatch();
   return (
      <div className="item">
         <p>{task.title}</p>
         <div className="controls">
            <div className="checkbox-div">
               <input type="checkbox" className="checkbox-complete" checked={task.completed} onChange={() => dispatch(toggleComplete(task.id))} />
               <span>Completed</span>
            </div>            
            <button className="btn-remove" onClick={() => {
               if (task.completed) dispatch(removeTask(task.id));
               else alert('Before removing this task, you should complete it first!');
            }}>X</button>
         </div>
      </div>
   );
}

```

### New Task Page

The NewTask page allows users to add a new task:

```javascript
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasksSlice";
import { createIdFromDate } from "../utils/helper";

export function NewTask() {
   const dispatch = useDispatch();
   const [title, setTitle] = useState('');   

   const notifSuccess = {
      text: "Task has been created successfully.",
      class: "created-task-notif"
   };
   const notifFail = {
      text: "Fail! Task has not been created. Check the title and try again.",
      class: "failed-task-notif"
   };
   const notifEmpty = {
      text: "Foo.",
      class: "no-show"
   };
   const [notif, setNotif] = useState(notifEmpty);

   function handleTitleInput(e) {
      setNotif(notifEmpty);
      setTitle(e.target.value);
   }

   function handleSubmit(e) {
      e.preventDefault();
      if (title.length === 0) return setNotif(notifFail);
      dispatch(addTask({
         id: createIdFromDate(),
         title: title,
         completed: false
      }));
      setTitle('');
      setNotif(notifSuccess);
   }

   return (
      <div className="new-task-content">
         <h1>New task</h1>
         <form onSubmit={handleSubmit}>
            <div className="new-task-input">
               <label htmlFor="task">ToDo title:</label>
               <input id="task" className="new-task-title" type="text" placeholder="Example: Feed my cat" value={title} onChange={handleTitleInput} />
            </div>
            <input type="submit" className="new-task-submit" value="Create new task" />
         </form>         
         {notif.class === "no-show" ? (
            <span className="no-show">{notif.text}</span> 
         ) : notif.class === "created-task-notif" ? (
            <span className="created-task-notif">{notif.text}</span> 
         ) : (
            <span className="failed-task-notif">{notif.text}</span> 
         )}
      </div>      
   );
}

```

## Future Enhancements

* Implement user authentication and authorization
* Add the ability to edit tasks
* Integrate with a backend service for persistent storage
* Improve UI/UX with advanced animations and transitions

