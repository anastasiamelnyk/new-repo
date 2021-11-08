import Header from "./components/Header/Header";
import Toast from "./components/UI/Toast/Toast";
import CityWeather from "./containers/CityPage/CityPage";
import {useLocation} from "./hooks/useLocation";
import {LocationContext} from "./context/locationContext";
import { BrowserRouter, Route, Switch } from "react-router-dom";

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
                <BrowserRouter>
                    <Header/>
                    <Switch>
                        <Route path="/">
                            <CityWeather />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </LocationContext.Provider>
        </div>
    );
}

export default App;
