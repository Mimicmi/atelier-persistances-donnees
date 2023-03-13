import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './components/NavBar/NavBar';

import MyRoutes from './MyRoutes';

function App() {
  return (
    <div className="App">
        <NavBar></NavBar>
        <MyRoutes></MyRoutes>
    </div>
  );
}

export default App;
