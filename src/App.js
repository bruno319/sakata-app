import './App.css';
import { AddBaseCard } from './components/AddBaseCard';
import { SearchCharacter } from './components/SearchCharacters';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AnimeCharacters } from './components/AnimeCharacters';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SearchCharacter} />
        <Route path="/anime/:malId" exact component={AnimeCharacters} />
        <Route path="/addbasecard/:malId" exact component={AddBaseCard} />
        <Route path="/" render={() => <div>404</div>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
