import React, {useState} from 'react'

const SearchCharacterContext = React.createContext({});

const SearchCharacterProvider = component => {
    const [malId, setMalId] = useState("");
    const [characters, setCharacters] = useState([]);

    const handleMalId = event => {
        setMalId(event.target.value)
    };

    const fetchCharacters = async () => {
        const res = await fetch(`https://api.jikan.moe/v3/anime/${malId}/characters_staff`);
        res.json()
          .then(res => setCharacters(res.characters));
    }

    return (
        <SearchCharacterContext.Provider
            value={{
                malId,
                handleMalId,
                characters,
                fetchCharacters
            }}
        >
            {component.children}
        </SearchCharacterContext.Provider>
    );
};

export {SearchCharacterContext, SearchCharacterProvider};