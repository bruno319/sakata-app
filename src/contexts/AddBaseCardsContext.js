import React, {useEffect, useState, createRef} from 'react'
import { useParams } from 'react-router-dom';
import * as HtmlToImage from 'html-to-image';
import download from 'downloadjs';
import TemplateSilver from '../resources/sakata-template-common.png';
import { style } from '../components/AddBaseCard';

const AddBaseCardContext = React.createContext({});

const AddBaseCardProvider = component => {
    const sakataCardRef = createRef();
    const { malId } = useParams();
    const [character, setCharacter] = useState({});
    const [picture, setPicture] = useState("");
    const [loading, setLoading] = useState(true);
    const [overallPower, setOverallPower] = useState(99);
    const [rarity, setRarity] = useState({
        template: TemplateSilver,
        fontStyle: style.silverFont
    });

    const handlePicture = event => {
        setPicture(event.target.value)
    };

    const handleRarity = (template, fontStyle) => {
        setRarity({
            template: template,
            fontStyle: fontStyle
        });
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
 
    const generateOverallPower = async () => {
        setLoading(true);
        const fetchOverallPower = async () => {
            if (malId) {
                const response = await fetch(`http://sakata.api.com/basecard/overallPower/${malId}`);
                const json = await response.json();
                setOverallPower(json.value);
            }
            setLoading(false);
        }

        fetchOverallPower();
    }

    const saveCardAsPng = () => {
        HtmlToImage.toPng(sakataCardRef.current)
            .then((dataUrl) => {
                console.log(dataUrl);
                download(dataUrl, `${character.mal_id}.png`);
            })
    }

    return (
        <AddBaseCardContext.Provider
            value={{
                loading,
                character,
                picture,
                handlePicture,
                rarity,
                handleRarity,
                sakataCardRef,
                saveCardAsPng
            }}
        >
            {component.children}
        </AddBaseCardContext.Provider>
    )
}

export { AddBaseCardContext, AddBaseCardProvider };