import { Container, Col, ListGroup, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AnimeCharactersContext, AnimeCharactersProvider } from '../contexts/AnimeCharactersContext';

export const AnimeCharacters = () => (
    <AnimeCharactersProvider>
        <AnimeCharactersContext.Consumer> 
            { (context) => (
                <Container>
                    <Col md={{span: 8, offset: 2}}>
                        <h1>Characters</h1>
                        <ListGroup>
                            { context.characters.map((char) => char.created ? 
                                (
                                    <ListGroup.Item key={char.mal_id} variant="dark">
                                        <Image 
                                            src={char.image_url} 
                                            style={{height: '150px', marginRight:'15px'}} 
                                            thumbnail
                                        />
                                        {`${char.name} [${char.mal_id}]`}
                                    </ListGroup.Item>
                                ) : (
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
                                )
                            )}
                        </ListGroup>
                    </Col>
                </Container>
            )} 
        </AnimeCharactersContext.Consumer>
    </AnimeCharactersProvider>
);