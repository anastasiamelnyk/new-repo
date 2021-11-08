import Header from "./components/Header/Header";
import Toast from "./components/UI/Toast/Toast";
import {useLocation} from "./hooks/useLocation";
import {LocationContext} from "./context/locationContext";

function App() {
    const [location, locationError, setLocationError] = useLocation();

    return (
        <div className="App">
            <Toast
                isShown={!!locationError}
                isError={!!locationError}
                text={locationError}
                closeToast={() => setLocationError(null)}
            />
            <LocationContext.Provider value={{city: location}}>
                <Header/>
            </LocationContext.Provider>
        </div>
    );
}

export default App;
