import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';

const SearchCharactersContext = React.createContext({});

const SearchCharactersProvider = component => {
    const location = useLocation();
    const [animeTitle, setAnimeTitle] = useState("");
    const [animes, setAnimes] = useState([]);

    const handleAnimeTitle = event => {
        setAnimeTitle(event.target.value)
    };

    const fetchAnimes = async () => {
        fetch(`https://api.jikan.moe/v3/search/anime?q=${animeTitle}`)
            .then(res => res.json())
            .then(res => setAnimes(res.results));
    }

    useEffect(() => {
        console.log(location.state)
    }, [location]);

    return (
        <SearchCharactersContext.Provider
            value={{
                animeTitle,
                handleAnimeTitle,
                animes,
                fetchAnimes
            }}
        >
            {component.children}
        </SearchCharactersContext.Provider>
    );
};

export {SearchCharactersContext, SearchCharactersProvider};