import { useSelector } from "react-redux"
import { Items } from "../components/Items";

export function AllTasks() {
   const tasks = useSelector(state => state.tasks);
   return (
      <Items tasks={tasks} pageName="All Tasks" />
   )
}