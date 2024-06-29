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
  ), {
    basename: '/ToDoList-on-React-Redux'
  });

  return (
    <RouterProvider router={myRoute} />
  );
}

export default App;
