import 'bootstrap/dist/css/bootstrap.min.css';
import { render } from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import "./app.css"
import App from './App';
import Welcome from './components/welcome'
import { Main } from "./components/main"
import Design from "./components/design"
import User from "./components/user"

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="welcome" element={<Welcome />} />
        <Route path="main/:userId" element={<Main />} />
        <Route path="design/rating" element={<Design type="rating" />} />
        <Route path="design/sizing" element={<Design type="sizing" />} />
        <Route path="register" element={<User type="register" />} />
        <Route path="login" element={<User type="login" />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);