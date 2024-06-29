import { Link, NavLink } from "react-router-dom";
import logo from '../assets/images/logo-todo.jpg';

export function Header() {
   return (
      <header>
         <div className="logo-img">
            <Link to="/">
               <img src={logo} alt="Logo" />
            </Link>
         </div>         
         <nav>
            <ul>
               <li><NavLink to="/">All Tasks</NavLink></li>
               <li><NavLink to="/completed">Completed Tasks</NavLink></li>
               <li><NavLink to="/pending">Pending Tasks</NavLink></li>
            </ul>
         </nav>
         <NavLink to="/new" className="new-task">New Task</NavLink>
      </header>
      
   )
}