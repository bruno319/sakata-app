import React, {useState} from 'react';

const SearchAnimeContext = React.createContext({});

const SearchAnimeProvider = component => {
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

    return (
        <SearchAnimeContext.Provider
            value={{
                animeTitle,
                handleAnimeTitle,
                animes,
                fetchAnimes
            }}
        >
            {component.children}
        </SearchAnimeContext.Provider>
    );
};

export {SearchAnimeContext, SearchAnimeProvider};