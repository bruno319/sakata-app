import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

const AnimeCharactersContext = React.createContext({});

const AnimeCharactersProvider = component => {
    const { malId } = useParams();
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const fetchCharacters = async () => {
            const res = await fetch(`https://api.jikan.moe/v3/anime/${malId}/characters_staff`);
            const charactersResult = await res.json();

            const malIdList = charactersResult.characters.map(c => c.mal_id);
            const charactersCreated = await verifyCardsCreated(malIdList);

            const characters = charactersResult.characters.map(c => {
                if (charactersCreated.includes(c.mal_id)) {
                    c.created = true;
                } else {
                    c.created = false;
                }
                return c;
            });

            setCharacters(characters);
        };
        
        const verifyCardsCreated = async (malIdList) => {
            const reqOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(malIdList)
            };
            const res = await fetch(`${process.env.REACT_APP_SAKATA_API_URL}/basecards/created`, reqOptions);
            return await res.json();
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