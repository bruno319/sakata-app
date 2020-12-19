import download from 'downloadjs';
import * as HtmlToImage from 'html-to-image';
import React, { createRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { style } from '../components/AddBaseCard';
import BeastClass from '../resources/class-beast.png';
import FighterClass from '../resources/class-fighter.png';
import MachinistClass from '../resources/class-machinist.png';
import MagicianClass from '../resources/class-magician.png';
import MusicianClass from '../resources/class-musician.png';
import RangerClass from '../resources/class-ranger.png';
import ScholarClass from '../resources/class-scholar.png';
import SupernaturalClass from '../resources/class-supernatural.png';
import SupportClass from '../resources/class-support.png';
import SwordsmanClass from '../resources/class-swordsman.png';
import WorkerClass from '../resources/class-worker.png';
import RogueClass from '../resources/class-rogue.png';
import ActionDomain from '../resources/domain-action.png';
import AdventureDomain from '../resources/domain-adventure.png';
import ComedyDomain from '../resources/domain-comedy.png';
import MysteryDomain from '../resources/domain-mystery.png';
import RomanceDomain from '../resources/domain-romance.png';
import SciFiDomain from '../resources/domain-scifi.png';
import SliceOfLifeDomain from '../resources/domain-sliceoflife.png';
import SportsDomain from '../resources/domain-sports.png';
import FantasyDomain from '../resources/domain-fantasy.png';
import TemplateSilver from '../resources/sakata-silver.png';

const classes = [
    { name: 'Fighter', value: '1' },
    { name: 'Magician', value: '2' },
    { name: 'Swordsman', value: '3' },
    { name: 'Ranger', value: '4' },
    { name: 'Rogue', value: '5' },
    { name: 'Support', value: '6' },
    { name: 'Beast', value: '7' },
    { name: 'Machinist', value: '8' },
    { name: 'Supernatural', value: '9' },
    { name: 'Scholar', value: '10' },
    { name: 'Worker', value: '11' },
    { name: 'Musician', value: '12' },
];

const domains = [
    { name: 'Action', value: '1' },
    { name: 'Adventure', value: '2' },
    { name: 'Fantasy', value: '3' },
    { name: 'SciFi', value: '4' },
    { name: 'Sports', value: '5' },
    { name: 'Mystery', value: '6' },
    { name: 'SliceOfLife', value: '7' },
    { name: 'Comedy', value: '8' },
    { name: 'Romance', value: '9' },
]

const AddBaseCardContext = React.createContext({});

const AddBaseCardProvider = component => {
    const sakataCardRef = createRef();
    const { malId } = useParams();
    const [character, setCharacter] = useState({});
    const [selectedAnimes, setSelectedAnimes] = useState([]);
    const [picture, setPicture] = useState("");
    const [baseOverallPower, setBaseOverallPower] = useState(0);
    const [overallPower, setOverallPower] = useState(0);
    const [selectedClass, setSelectedClass] = useState({});
    const [selectedDomain, setSelectedDomain] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [alert, setAlert] = useState({show: false, message: ''});
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

    const handleClass = e => {
        if (e.target.value === '1') {
            setSelectedClass({path: FighterClass, value: e.target.value})
        }
        if (e.target.value === '2') {
            setSelectedClass({path: MagicianClass, value: e.target.value})
        }
        if (e.target.value === '3') {
            setSelectedClass({path: SwordsmanClass, value: e.target.value})
        }
        if (e.target.value === '4') {
            setSelectedClass({path: RangerClass, value: e.target.value})
        }
        if (e.target.value === '5') {
            setSelectedClass({path: RogueClass, value: e.target.value})
        }
        if (e.target.value === '6') {
            setSelectedClass({path: SupportClass, value: e.target.value})
        }
        if (e.target.value === '7') {
            setSelectedClass({path: BeastClass, value: e.target.value})
        }
        if (e.target.value === '8') {
            setSelectedClass({path: MachinistClass, value: e.target.value})
        }
        if (e.target.value === '9') {
            setSelectedClass({path: SupernaturalClass, value: e.target.value})
        }
        if (e.target.value === '10') {
            setSelectedClass({path: ScholarClass, value: e.target.value})
        }
        if (e.target.value === '11') {
            setSelectedClass({path: WorkerClass, value: e.target.value})
        }
        if (e.target.value === '12') {
            setSelectedClass({path: MusicianClass, value: e.target.value})
        }
    }

    const handleDomain  = e => {
        if (e.target.value === '1') {
            setSelectedDomain({path: ActionDomain, value: e.target.value})
        }
        if (e.target.value === '2') {
            setSelectedDomain({path: AdventureDomain, value: e.target.value})
        }
        if (e.target.value === '3') {
            setSelectedDomain({path: FantasyDomain, value: e.target.value})
        }
        if (e.target.value === '4') {
            setSelectedDomain({path: SciFiDomain, value: e.target.value})
        }
        if (e.target.value === '5') {
            setSelectedDomain({path: SportsDomain, value: e.target.value})
        }
        if (e.target.value === '6') {
            setSelectedDomain({path: MysteryDomain, value: e.target.value})
        }
        if (e.target.value === '7') {
            setSelectedDomain({path: SliceOfLifeDomain, value: e.target.value})
        }
        if (e.target.value === '8') {
            setSelectedDomain({path: ComedyDomain, value: e.target.value})
        }
        if (e.target.value === '9') {
            setSelectedDomain({path: RomanceDomain, value: e.target.value})
        }
    }

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
    
    const fetchCharacterData = async () => {
        setIsLoading(true);
        if (malId) {
            const response = await fetch(`https://api.jikan.moe/v3/character/${malId}`);
            const character = await response.json();
            setCharacter(character);
            setPicture(character.image_url);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchCharacterData();
    }, []);

    useEffect(() => {
        if (baseOverallPower) {
            saveCard();
        }
    }, [baseOverallPower]);

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
    }, [rarity, baseOverallPower]);
 
    const generateOverallPower = async () => {
        if (Object.keys(selectedDomain).length === 0 || Object.keys(selectedClass).length === 0) {
            setAlert({
                show: true,
                message: 'Select class and domain for this character'
            });
            return () => {};
        }
        if (character.animeography.length > 5 && selectedAnimes.length === 0) {
            setAlert({
                show: true,
                message: 'This character has many animes, select some from the list'
            });
            return () => {};
        }
        setIsLoading(true);
        if (malId) {
            const reqOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    animes: selectedAnimes.map(a => a.mal_id) 
                })
            };
            try {
                const res = await fetch(`${process.env.REACT_APP_SAKATA_API_URL}/basecards/overall-power/${malId}`, reqOptions);
                const data = await res.json();
                setBaseOverallPower(data.overall_power);
            } catch (err) {
                setAlert({
                    show: true,
                    message: `Could not save card: ${err}`
                });
            }
        }
        setIsLoading(false);
    }

    const saveCard = async () => {
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: character.name,
                class: parseInt(selectedClass.value, 10),
                domain: parseInt(selectedDomain.value, 10),
                mal_id: parseInt(malId),
                overall_power: baseOverallPower
            })
        };
        console.log(reqOptions.body);
        return await fetch(`${process.env.REACT_APP_SAKATA_API_URL}/basecards`, reqOptions);
    }

    const generateJpegCard = () => {
        HtmlToImage.toJpeg(sakataCardRef.current, { quality: 0.95 })
            .then(async (dataUrl) => {
                const filename = `sakata_${character.mal_id}_${rarity.value}.jpeg`;
                const base64Response = await fetch(dataUrl);
                const blob = await base64Response.blob();
                const formData = new FormData();
                formData.append("basecard", blob, filename);
                fetch(`${process.env.REACT_APP_SAKATA_API_URL}/basecards/image`, {
                  method: 'POST',
                  body: formData
                });
                download(dataUrl, filename);
            })
    }

    return (
        <AddBaseCardContext.Provider
            value={{
                isLoading,
                character,
                overallPower,
                picture,
                handlePicture,
                rarity,
                handleRarity,
                classes,
                selectedClass,
                handleClass,
                domains,
                selectedDomain,
                handleDomain,
                selectAnime,
                selectedAnimes,
                generateOverallPower,
                alert,
                setAlert,
                sakataCardRef,
                generateJpegCard,
            }}
        >
            {component.children}
        </AddBaseCardContext.Provider>
    )
}

export { AddBaseCardContext, AddBaseCardProvider };
