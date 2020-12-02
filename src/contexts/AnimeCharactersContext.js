import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

const AnimeCharactersContext = React.createContext({});

const AnimeCharactersProvider = component => {
    const { malId } = useParams();
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const fetchCharacters = async () => {
            const res = await fetch(`https://api.jikan.moe/v3/anime/${malId}/characters_staff`);
            res.json()
              .then(res => setCharacters(res.characters));
        };

        fetchCharacters();
    }, [malId]);

    return (
        <AnimeCharactersContext.Provider
            value={{
                characters
            }}
        >
            {component.children}
        </AnimeCharactersContext.Provider>
    );
};

export {AnimeCharactersContext, AnimeCharactersProvider};