import Header from "./components/header/Header";
import {useLocation} from "./hooks/useLocation";
import {LocationContext} from "./context/locationContext";

function App() {
    const location = useLocation();

    return (
        <div className="App">
            <LocationContext.Provider value={{city: location}}>
                <Header/>
            </LocationContext.Provider>
        </div>
    );
}

export default App;
