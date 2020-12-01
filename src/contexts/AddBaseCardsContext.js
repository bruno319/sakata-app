import download from 'downloadjs';
import * as HtmlToImage from 'html-to-image';
import React, { createRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { style } from '../components/AddBaseCard';
import TemplateSilver from '../resources/sakata-template-common.png';

const AddBaseCardContext = React.createContext({});

const AddBaseCardProvider = component => {
    const sakataCardRef = createRef();
    const { malId } = useParams();
    const [character, setCharacter] = useState({});
    const [selectedAnimes, setSelectedAnimes] = useState([]);
    const [picture, setPicture] = useState("");
    const [loading, setLoading] = useState(true);
    const [baseOverallPower, setBaseOverallPower] = useState(0);
    const [overallPower, setOverallPower] = useState(0);
    const [rarity, setRarity] = useState({
        value: 1,
        template: TemplateSilver,
        fontStyle: style.silverFont
    });

    const handlePicture = event => {
        setPicture(event.target.value)
    };

    const handleRarity = (value, template, fontStyle) => {
        setRarity({
            value: value,
            template: template,
            fontStyle: fontStyle
        });
    };

    const selectAnime = anime => {
        let animes = Array.from(selectedAnimes);
        let i = animes.findIndex(a => a.mal_id === anime.mal_id);
        if (i < 0) {
            animes.push(anime);
        } else {
            animes.splice(i, 1);
        }
        setSelectedAnimes(animes);
    };
    
    useEffect(() => {
        const fetchCharacterData = async () => {
            if (malId) {
                const response = await fetch(`https://api.jikan.moe/v3/character/${malId}`);
                const json = await response.json();
                setCharacter(json);
                setPicture(json.image_url);
            }
            setLoading(false);
        }

        return fetchCharacterData();
    }, [malId]);

    useEffect(() => {
        let newOverallPower = 0;
        if (rarity.value === 1) {
            newOverallPower = baseOverallPower
        } else if (rarity.value === 2) {
            newOverallPower = baseOverallPower + 1
        } else if (rarity.value === 3) {
            newOverallPower = baseOverallPower + 3
        } else if (rarity.value === 4) {
            newOverallPower = baseOverallPower + 5
        };
        setOverallPower(newOverallPower);
    }, [rarity, baseOverallPower])
 
    const generateOverallPower = async () => {
        const fetchOverallPower = async () => {
            if (malId) {
                const reqOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        animeMalIds: selectedAnimes.map(a => a.mal_id) 
                    })
                };
                fetch(`${process.env.REACT_APP_SAKATA_API_URL}/basecards/overall-power/${malId}`, reqOptions)
                    .then(res => res.json())
                    .then(data => setBaseOverallPower(data.overallPower))
                    .catch(e => console.error(e));
                
            }
        }
        await fetchOverallPower();
    }

    const saveCardAsPng = () => {
        HtmlToImage.toJpeg(sakataCardRef.current, { quality: 0.95 })
            .then((dataUrl) => {
                console.log(dataUrl);
                download(dataUrl, `${character.mal_id}[${rarity.value}].jpeg`);
            })
    }

    return (
        <AddBaseCardContext.Provider
            value={{
                loading,
                character,
                overallPower,
                picture,
                handlePicture,
                rarity,
                handleRarity,
                selectAnime,
                selectedAnimes,
                generateOverallPower,
                sakataCardRef,
                saveCardAsPng,
            }}
        >
            {component.children}
        </AddBaseCardContext.Provider>
    )
}

export { AddBaseCardContext, AddBaseCardProvider };
