import { Link } from "react-router-dom";

export function Page404() {
   return (
      <div>
         <h1>404 - Page not found</h1>
         <Link to="/">Return to homepage</Link>
      </div>      
   )
}