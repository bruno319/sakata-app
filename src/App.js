import './App.css';
import { AddBaseCard } from './components/AddBaseCard';
import { SearchCharacter } from './components/SearchCharacters';
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <SearchCharacter />  
        </Route>
        <Route path="/addbasecard/:malId" exact>
          <AddBaseCard />  
        </Route>
        <Route path="/" render={() => <div>404</div>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
