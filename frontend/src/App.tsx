import "./App.css";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="border rounded-5  m-3 p-2">
        <Map />
      </div>
    </div>
  );
}

export default App;
