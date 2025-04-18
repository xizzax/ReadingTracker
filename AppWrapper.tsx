import { Provider } from "react-redux";
import { store } from "./state/Store";
import App from "./App";

export default function AppWrapper (){
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}