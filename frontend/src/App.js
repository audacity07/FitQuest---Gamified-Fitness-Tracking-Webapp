import './App.css';
import Admin from './components/Admin/admin';

import { AllRoutes } from './components/AllRoutes';
import { Navbar } from './components/Navbar/Navbar';

function App() {

  return (
    <div >
      <AllRoutes/>
      <Admin />
    </div>
  );
}

export default App;
