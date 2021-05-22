import "./App.less";
import store from "./store";
import { Provider } from "react-redux";
import Navigation from "./navigation";
import { toast } from "react-toastify";

toast.configure({
  position: "top-right"
});

function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
