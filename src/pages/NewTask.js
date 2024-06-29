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
   }
   const notifFail = {
      text: "Fail! Task has not been created. Check the title and try again.",
      class: "failed-task-notif"
   }
   const notifEmpty = {
      text: "Foo.",
      class: "no-show"
   }
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
   )
}