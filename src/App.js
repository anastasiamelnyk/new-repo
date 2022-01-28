import Header from "./components/Header/Header";
import Toast from "./components/UI/Toast/Toast";
import CityWeather from "./containers/CityPage/CityPage";
import {useLocation} from "./hooks/useLocation";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {setLocationErrorAction} from "./store/locationReducer";
import {useDispatch, useSelector} from "react-redux";
import SavedCitiesPage from "./containers/SavedCitiesPage/SavedCitiesPage";


function App() {
    useLocation();
    const dispatch = useDispatch();
    const locationError = useSelector(store => store.locationReducer.locationError);

    return (
        <div className="App">
            <Toast
                isShown={!!locationError}
                isError={!!locationError}
                text={locationError}
                closeToast={() => dispatch(setLocationErrorAction(null))}
            />
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route path="/other-cities">
                        <SavedCitiesPage />
                    </Route>
                    <Route path="/">
                        <CityWeather/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
