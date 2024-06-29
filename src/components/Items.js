import { Item } from "./Item";

export function Items({tasks, pageName}) {
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
   )
}