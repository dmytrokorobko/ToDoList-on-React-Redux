import { useSelector } from "react-redux"
import { Items } from "../components/Items";

export function CompletedTasks() {
   const tasks = useSelector(state => state.tasks.filter(task => task.completed));
   return (
      <Items tasks={tasks} pageName="Completed Tasks" />
   )
}