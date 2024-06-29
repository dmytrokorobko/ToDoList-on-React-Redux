import { useDispatch } from "react-redux"
import { removeTask, toggleComplete } from "../features/tasksSlice";

export function Item({task}) {
   const dispatch = useDispatch();
   return (
      <div className="item">
         <p>{task.title}</p>
         <div className="controls">
            <div className="checkbox-div">
               <input type="checkbox" className="checkbox-complete" checked={task.completed} onChange={()=>dispatch(toggleComplete(task.id))} />
               <span>Completed</span>
            </div>            
            <button className="btn-remove" onClick={()=>{
               if (task.completed) dispatch(removeTask(task.id));
               else alert('Before removing this task, you should complete it first!');
            }}>X</button>
         </div>
      </div>
   )
}