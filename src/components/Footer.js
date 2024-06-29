import { Link } from "react-router-dom";

export function Footer() {
   return (
      <footer>
         <div>
            <p>&copy; 2024. Training project</p>
            <Link to="https://github.com/dmytrokorobko/ToDoList-on-React-Redux" target="_blank">Github Repository</Link>
         </div>
      </footer>      
   )
}