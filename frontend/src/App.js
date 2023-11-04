import './App.css';
import AdminNav from './components/Admin/AdminRoute/AdminNav';
import MainRoute from './components/Admin/AdminRoute/MainRoute';
import Admin from './components/Admin/admin';

import { AllRoutes } from './components/AllRoutes';
import { Login } from './pages/Login';

function App() {

  return (
    <div >
      <AllRoutes/>
    </div>
  );
}

export default App;
