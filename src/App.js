import './App.css';
import { AddBaseCard } from './components/AddBaseCard';
import { SearchAnime } from './components/SearchAnime';
import { AnimeCharacters } from './components/AnimeCharacters';
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SearchAnime} />
        <Route path="/anime/:malId" exact component={AnimeCharacters} />
        <Route path="/addbasecard/:malId" exact component={AddBaseCard} />
        <Route path="/" render={() => <div>404</div>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
