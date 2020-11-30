import { Container, Image, Row, Col, InputGroup, FormControl, Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import { AddBaseCardContext, AddBaseCardProvider } from "../contexts/AddBaseCardsContext";
import TemplateSilver from '../resources/sakata-template-common.png';
import TemplateGold from '../resources/sakata-template.png';
import TemplateEpic from '../resources/sakata-template-epic.png';

export const style = {
    sakataCard: {
        position: 'relative',
        height: '400px',
        width: '293px'
    },
    overallPower: {
        position: 'absolute',
        bottom: '0px',
        left: '10px',
        height: '85px',
        width: '85px',
        lineHeight: '0.49',
        textAlign: 'center',
        fontSize: '91px',
        fontFamily: 'Jockey One'
    },
    name: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: '0px',
        left: '115px',
        fontSize: '35px',
        fontFamily: 'Jockey One',
        textAlign: 'center',
        verticalAlign: 'middle',
        letterSpacing: '0px',
        lineHeight: '0.8',
        width: '155px',
        height: '78px',
    },
    silverFont: {
        color: '#ebebeb',
        textShadow: "0 0 2px #ccc, 0 0 3px #ccc, 0 0 15px #111, 0 0 20px #111"
    },
    goldFont: {
        color: '#fff',
        textShadow: "0 0 1px #fff, 0 0 2px #fff, 0 0 15px #b3b300, 0 0 20px #b3b300, 0 0 25px #b3b300"
    },
    epicFont: {
        color: '#fff',
        textShadow: "0 0 2px #fff, 0 0 3px #fff, 0 0 15px #e600e6, 0 0 20px #e600e6, 0 0 25px #e600e6, 0 0 30px #e600e6"
    },
    legendFont: {
        color: '#ededed',
        textShadow: "0 0 2px #fff, 0 0 4px #fff, 0 0 15px #8c1aff, 0 0 20px #8c1aff"
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
                                    <ButtonToolbar style={{margin: '10px'}}>
                                        <ButtonGroup>
                                            <Button onClick={() => (context.handleRarity(TemplateSilver, style.silverFont))} variant="outline-secondary">Silver</Button> 
                                            <Button onClick={() => (context.handleRarity(TemplateGold, style.goldFont))} variant="outline-secondary">Gold</Button> 
                                            <Button onClick={() => (context.handleRarity(TemplateEpic, style.epicFont))} variant="outline-secondary">Epic</Button> 
                                            <Button variant="outline-secondary">Legend</Button>
                                        </ButtonGroup>
                                    </ButtonToolbar>
                                    <div style={style.sakataCard} ref={context.sakataCardRef}>
                                        <Image src={context.rarity.template} style={{
                                            backgroundImage: `url(${context.picture})`,
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                            height: '400px'
                                        }} rounded/>
                                        <div style={{...context.rarity.fontStyle, ...style.overallPower}}>81</div>
                                        <div style={{...context.rarity.fontStyle, ...style.name}}>
                                            <span>{context.character.name}</span>
                                        </div>
                                    </div>
                                    
                                    <Button variant="outline-secondary"
                                        onClick={() => context.saveCardAsPng()}
                                        style={{marginTop: '25px', marginLeft: '25%'}}
                                    >
                                        Save Card
                                    </Button>
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
                                </Col>
                            </Row>
                        </Container>
                    )}
                </Container>
            )}
        </AddBaseCardContext.Consumer>
    </AddBaseCardProvider>
);