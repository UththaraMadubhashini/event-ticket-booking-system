import "./App.css";


import "./index.css";
import Dashboard from "./Pages/Admin/DashBoard";
import Routers from "./Router/Routers";

function App() {
  return (
    <div>
      <Routers/>
      <Dashboard/>
    </div>
  );
}

export default App;