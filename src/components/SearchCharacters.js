import { Container, InputGroup, FormControl, Button, Col, ListGroup, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SearchCharacterProvider, SearchCharacterContext } from '../contexts/SearchCharactersContext';

export const SearchCharacter = () => (
    <SearchCharacterProvider>
        <SearchCharacterContext.Consumer> 
            { (context) => (
                <Container>
                    <Col md={{span: 8, offset: 2}}>
                        <h1>Search Characters By MAL ID</h1>
                        <InputGroup className="mb-3">
                            <FormControl 
                                placeholder="MAL ID"
                                value={context.animeTitle}
                                onChange={context.handleMalId}    
                            />
                            <InputGroup.Append>
                                <Button 
                                    variant="outline-secondary"
                                    onClick={context.fetchCharacters}
                                >
                                    Search
                                </Button>
                            </InputGroup.Append>    
                        </InputGroup>
                        <ListGroup>
                            { context.characters.map((char) => (
                                <Link key={char.mal_id} to={`/addbasecard/${char.mal_id}`}>
                                    <ListGroup.Item style={{cursor: 'pointer'}}>
                                        <Image 
                                            src={char.image_url} 
                                            style={{height: '150px', marginRight:'15px'}} 
                                            thumbnail 
                                        />
                                        {`${char.name} [${char.mal_id}]`}
                                    </ListGroup.Item>
                                </Link>
                            ))}
                        </ListGroup>
                    </Col>
                </Container>
            )} 
        </SearchCharacterContext.Consumer>
    </SearchCharacterProvider>
);