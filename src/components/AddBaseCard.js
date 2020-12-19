import { Alert, Button, ButtonGroup, Col, Container, FormControl, Image, InputGroup, ListGroup, Row, ToggleButton } from "react-bootstrap";
import { AddBaseCardContext, AddBaseCardProvider } from "../contexts/AddBaseCardsContext";
import TemplateSilver from '../resources/sakata-silver.png';
import TemplateEpic from '../resources/sakata-epic.png';
import TemplateGold from '../resources/sakata-gold.png';
import TemplateLegend from '../resources/sakata-legend.png';
import { CubeSpinner } from "react-spinners-kit";

export const style = {
    sakataCard: {
        position: 'relative',
        height: '290px',
        width: '212px'
    },
    malId: {
        position: 'absolute',
        backgroundColor: '#fff',
        right: '0',
        padding: '2px',
        lineHeight: '0.7',
        fontSize: '14px',
        fontFamily: 'Helvetica',
        fontWeight: 'bold'
    },
    overallPower: {
        position: 'absolute',
        bottom: '22px',
        left: '5px',
        height: '80px',
        width: '77px',
        textAlign: 'center',
        fontSize: '65px',
        fontFamily: 'Jockey One'
    },
    name: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: '0px',
        left: '95px',
        fontSize: '24px',
        fontFamily: 'Yanone Kaffeesatz',
        textAlign: 'center',
        verticalAlign: 'middle',
        letterSpacing: '0px',
        lineHeight: '0.8',
        width: '111px',
        height: '69px',
    },
    silverFont: {
        color: '#fff',
        textShadow: "0 0 1px #ccc, 0 0 3px #ccc, 0 0 10px #111, 0 0 20px #111"
    },
    goldFont: {
        color: '#fffbeb',
        textShadow: "0 0 1px #fff, 0 0 7px #e6b800, 0 0 12px #e6b800"
    },
    epicFont: {
        color: '#fff',
        textShadow: "0 0 1px #fff, 0 0 3px #ff80ff, 0 0 15px #ff80ff, 0 0 20px #ff80ff"
    },
    legendFont: {
        color: '#fff',
        textShadow: "0 0 1px #fff, 0 0 3px #00e6e6, 0 0 15px #00e6e6, 0 0 20px #00e6e6"
    },
    loaderDiv: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column-reverse'
    },
    iconDomain: {
        position: 'absolute',
        height: '50px',
        bottom: '5.59rem',
        left: '0px'
    },
    iconClass: {
        position: 'absolute',
        height: '50px',
        bottom: '139px',
        left: '0px'
    }
}

export const AddBaseCard = () => (
    <AddBaseCardProvider>
        <AddBaseCardContext.Consumer>
            { (context) => (
                <>
                    { context.isLoading ? (
                        <div style={style.loaderDiv}>
                            <h2>Performing expensive operations xD</h2><br/>
                            <CubeSpinner size={70} loading={true}/>
                        </div>
                    ) : (
                        <>
                        <Container>
                            { context.alert.show && 
                                <Alert variant="danger" 
                                    onClose={() => context.setAlert({show: false, message: ''})} 
                                    dismissible
                                >
                                    {context.alert.message}
                                </Alert>
                            }

                            <Row>
                                <Col sm={12} md={6} lg={4}>
                                    <h1>Card Overview</h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={6} lg={4}>

                                    <Row>
                                        <ButtonGroup style={{margin: '10px 0'}}>
                                            <Button onClick={() => (context.handleRarity(1, TemplateSilver, style.silverFont))} variant="outline-secondary">Silver</Button> 
                                            <Button onClick={() => (context.handleRarity(2, TemplateGold, style.goldFont))} variant="outline-secondary">Gold</Button> 
                                            <Button onClick={() => (context.handleRarity(3, TemplateEpic, style.epicFont))} variant="outline-secondary">Epic</Button> 
                                            <Button onClick={() => (context.handleRarity(4, TemplateLegend, style.legendFont))} variant="outline-secondary">Legend</Button>
                                        </ButtonGroup>

                                        <div style={style.sakataCard} ref={context.sakataCardRef}>
                                            <img src={context.selectedClass.path} style={style.iconClass}/>
                                            <img src={context.selectedDomain.path} style={style.iconDomain}/>
                                            <span style={style.malId}>{context.character.mal_id}</span>
                                            <Image src={context.rarity.template} style={{
                                                backgroundImage: `url(${context.picture})`,
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: '82%',
                                                height: '290px',
                                            }} />
                                            <div style={{...context.rarity.fontStyle, ...style.overallPower}}>
                                                {context.overallPower}
                                            </div>
                                            <div style={{...context.rarity.fontStyle, ...style.name}}>
                                                <span>{context.character.name}</span>
                                            </div>
                                        </div>

                                        <ButtonGroup style={{margin: '10px 0'}}>
                                            <Button variant="outline-secondary" onClick={() => context.generateOverallPower()}>
                                                Create Card
                                            </Button>
                                            <Button variant="outline-secondary" onClick={() => context.generateJpegCard()}>
                                                Generate Image
                                            </Button>
                                        </ButtonGroup>
                                    
                                    </Row>

                                    <Row>
                                        <ButtonGroup toggle vertical>
                                            {context.classes.map(c => (
                                                <ToggleButton
                                                    key={c.value}
                                                    type="radio"
                                                    variant="outline-secondary"
                                                    value={c.value}
                                                    checked={context.selectedClass.value === c.value}
                                                    onChange={context.handleClass}
                                                >
                                                    {c.name}
                                                </ToggleButton>
                                            ))}
                                        </ButtonGroup>

                                        <ButtonGroup toggle vertical>
                                            {context.domains.map(g => (
                                                <ToggleButton
                                                    key={g.value}
                                                    type="radio"
                                                    variant="outline-secondary"
                                                    value={g.value}
                                                    checked={context.selectedDomain.value === g.value}
                                                    onChange={context.handleDomain}
                                                >
                                                    {g.name}
                                                </ToggleButton>
                                            ))}
                                        </ButtonGroup>
                                    </Row>
                                    
                                </Col>

                                <Col sm={12} md={6} lg={8}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Picture Url</InputGroup.Text>
                                        </InputGroup.Prepend>  
                                        <FormControl 
                                            placeholder="Url"
                                            value={context.picture}
                                            onChange={context.handlePicture}    
                                        />
                                    </InputGroup>

                                    <br/>
                                    <p>Select valid animes for this character or nothing for a auto generated overall power</p>

                                    <ListGroup as="ul">
                                        { context.character.animeography.map((anime) => (
                                            <ListGroup.Item key={anime.mal_id}
                                                variant={context.selectedAnimes.includes(anime) ? "primary" : ""}
                                                style={{cursor: 'pointer'}}
                                                onClick={() => context.selectAnime(anime)}
                                            >
                                                <Image 
                                                    src={anime.image_url} 
                                                    style={{height: '120px', marginRight:'15px'}}
                                                    thumbnail 
                                                />
                                                {anime.name}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Container>
                        </>
                    )}
                </>
            )}
        </AddBaseCardContext.Consumer>
    </AddBaseCardProvider>
);