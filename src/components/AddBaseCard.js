import { Container, Image, Row, Col, InputGroup, FormControl, Button, } from "react-bootstrap";
import { AddBaseCardContext, AddBaseCardProvider } from "../contexts/AddBaseCardsContext";
import Template from '../resources/sakata-template.png';

const style = {
    sakataCard: {
        position: 'relative',
        height: '400px',
        width: '293px'
    },
    overallPower: {
        position: 'absolute',
        bottom: '0px',
        left: '9px',
        height: '85px',
        lineHeight: '0.49',
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
                                <Col sm={12} md={4}>
                                    <div style={style.sakataCard} ref={context.sakataCardRef}>
                                        <Image src={Template} style={{
                                            backgroundImage: `url(${context.picture})`,
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                            height: '400px'
                                        }} rounded/>
                                        <div style={style.overallPower}>64</div>
                                        <div style={style.name}><span>{context.character.name}</span></div>
                                    </div>
                                    
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
                                    <Button onClick={() => context.saveCardAsPng()}>
                                        Save Card
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    )}
                </Container>
            )}
        </AddBaseCardContext.Consumer>
    </AddBaseCardProvider>
);