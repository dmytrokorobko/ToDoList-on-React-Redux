import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Root() {
   return (
      <section className="App">
         <Header />
         <div className="main">
            <Outlet />
         </div>
         <Footer />
      </section>
   )
}