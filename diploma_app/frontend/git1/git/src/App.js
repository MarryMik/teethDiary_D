//підключення необхідних компонентів
import {createBrowserRouter,
  RouterProvider,Outlet,
  Navigate
  } from "react-router-dom"
import { AuthContext } from "./context/authContext";
import { useContext } from "react";
import {QueryClient, QueryClientProvider} from 'react-query';
import Register from "./view/Register/Register";
import Login from "./view/Login/Login"
import BrushingDiary from "./view/BrushingDiary/BrushingDiary"
import Home from "./view/Home/Home"
import PatientDiary from "./view/PatientDiary/PatientDiary"
import Procedure from "./view/Procedure/Procedure"
import TeethRecord from "./view/TeethRecord/TeethRecord"
import ToothBrushDiary from "./view/ToothBrushDiary/ToothBrushDiary"
import Treatment from "./view/Treatment/Treatment"
import Account from "./view/Account/Account"
import Accesses from "./view/Accesses/Accesses"
import SymptomDiary from "./view/SymptomDiary/SymptomDiary"
import FilePF from "./view/File/File";
import Header from "./components/header/header1"
import Footer from "./components/footer/footer1"
import Header2 from "./components/header/header2"
import Footer2 from "./components/footer/footer2"
import Header3 from "./components/header/header3"
import Footer3 from "./components/footer/footer3"
//реалізація навігації та шляхів сайту
function App() {
  const queryClient = new QueryClient();
   const { currentUser } = useContext(AuthContext);
const Layout = () =>{
  return (
    <QueryClientProvider client={queryClient}>
    <Header/>
    <Outlet/>
    <Footer/>
    </QueryClientProvider>
  )
}
const Layout2 = () =>{
  return (
    <QueryClientProvider client={queryClient}>
    <Header2/>
    <Outlet/>
    <Footer2/>
    </QueryClientProvider>
  )
}
const Layout3 = () =>{
  return (
    <QueryClientProvider client={queryClient}>
    <Header3/>
    <Outlet/>
    <Footer3/>
    </QueryClientProvider>
  )
}
//фільтрування за типом користувача
   const UserFilter =({ children })=>{
    if(!currentUser){
      return  <Navigate to="/" />;
    }else{
      if (currentUser.usertype=='пацієнт'){
        return <Layout2 />;
      }else if (currentUser.usertype=='лікар'){
        return <Layout3 />;
      }
      else{
        return <Layout />;
      }
    }
   }
  const router = createBrowserRouter([
    {
      path:"/",
      element: (
          <Layout />
      ),
      children:[
        {
          path:"/",
          element: <Home/>
        },
        {
          path:"/register",
          element: <Register/>
        },
        {
          path:"/login",
          element: <Login/>
        }
      ]
    },
    {
      path:"/",
      element: (
          <UserFilter />
      ),
      children:[
        {
          path:"/brushing",
          element: <BrushingDiary/>
        },
        {
          path:"/diary",
          element: <PatientDiary/>
        },
        {
          path:"/procedure",
          element: <Procedure/>
        },
        {
          path:"/record",
          element: <TeethRecord/>
        },
        {
          path:"/brushes",
          element: <ToothBrushDiary/>
        },
        {
          path:"/treatment",
          element: <Treatment/>
        },
        {
          path:"/symptoms",
          element: <SymptomDiary/>
        },
        {
          path:"/procedure_file",
          element:<FilePF/>
        }
      ]
    },
    {
      path:"/",
      element: <UserFilter/>,
      children:[
        {
          path:"/accesses",
          element: <Accesses/>
        },
        {
          path:"/account",
          element: <Account/>
        }
      ]
    },    
  ]); 
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}
export default App;
