import { Button, ButtonGroup, Col, Container, FormControl, Image, InputGroup, ListGroup, Row } from "react-bootstrap";
import { AddBaseCardContext, AddBaseCardProvider } from "../contexts/AddBaseCardsContext";
import TemplateSilver from '../resources/sakata-template-common.png';
import TemplateEpic from '../resources/sakata-template-epic.png';
import TemplateGold from '../resources/sakata-template.png';
import TemplateLegend from '../resources/sakata-legend.png';

export const style = {
    sakataCard: {
        position: 'relative',
        height: '330px',
        width: '250px'
    },
    overallPower: {
        position: 'absolute',
        bottom: '0px',
        left: '1px',
        height: '85px',
        width: '85px',
        lineHeight: '0.95',
        textAlign: 'center',
        fontSize: '70px',
        fontFamily: 'Jockey One'
    },
    name: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: '0px',
        left: '97px',
        fontSize: '30px',
        fontFamily: 'Jockey One',
        textAlign: 'center',
        verticalAlign: 'middle',
        letterSpacing: '0px',
        lineHeight: '0.8',
        width: '130px',
        height: '62px',
    },
    silverFont: {
        color: '#ebebeb',
        textShadow: "0 0 2px #ccc, 0 0 3px #ccc, 0 0 10px #111, 0 0 20px #111"
    },
    goldFont: {
        color: '#fffbeb',
        textShadow: "0 0 2px #ffffcc, 0 0 10px #ffcc00, 0 0 15px #ffcc00, 0 0 20px #ffcc00"
    },
    epicFont: {
        color: '#fff',
        textShadow: "0 0 1px #fff, 0 0 3px #fff, 0 0 5px #ff80ff, 0 0 10px #ff80ff, 0 0 15px #ff80ff, 0 0 20px #ff80ff"
    },
    legendFont: {
        color: '#fff',
        textShadow: "0 0 1px #fff, 0 0 3px #00e6e6, 0 0 15px #00e6e6, 0 0 20px #00e6e6"
    }
}

export const AddBaseCard = () => (
    <AddBaseCardProvider>
        <AddBaseCardContext.Consumer>
            { (context) => (
                <Container>
                    {context.loading ? (
                        <h1>Loading...</h1>
                    ) : (
                        <Container>
                            <Row>
                                <h1>Card Overview</h1>
                            </Row>
                            <Row>
                                <Col sm={12} md={6} lg={4}>
                                    <ButtonGroup style={{margin: '10px 0'}}>
                                        <Button onClick={() => (context.handleRarity(1, TemplateSilver, style.silverFont))} variant="outline-secondary">Silver</Button> 
                                        <Button onClick={() => (context.handleRarity(2, TemplateGold, style.goldFont))} variant="outline-secondary">Gold</Button> 
                                        <Button onClick={() => (context.handleRarity(3, TemplateEpic, style.epicFont))} variant="outline-secondary">Epic</Button> 
                                        <Button onClick={() => (context.handleRarity(4, TemplateLegend, style.legendFont))} variant="outline-secondary">Legend</Button>
                                    </ButtonGroup>

                                    <div style={style.sakataCard} ref={context.sakataCardRef}>
                                        <Image src={context.rarity.template} style={{
                                            backgroundImage: `url(${context.picture})`,
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                            height: '330px',
                                        }} rounded/>
                                        <div style={{...context.rarity.fontStyle, ...style.overallPower}}>
                                            {context.overallPower}
                                        </div>
                                        <div style={{...context.rarity.fontStyle, ...style.name}}>
                                            <span>{context.character.name}</span>
                                        </div>
                                    </div>

                                    <ButtonGroup style={{margin: '10px 0'}}>
                                        <Button variant="outline-secondary"
                                            onClick={() => context.generateOverallPower()}
                                        >
                                            Generate Overall
                                        </Button>
                                        <Button variant="outline-secondary"
                                            onClick={() => context.saveCardAsPng()}
                                            style={{}}
                                        >
                                            Save Card
                                        </Button>
                                    </ButtonGroup>
                                </Col>
                                <Col xs={6}>
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
                    )}
                </Container>
            )}
        </AddBaseCardContext.Consumer>
    </AddBaseCardProvider>
);