import { Container, InputGroup, FormControl, Button, Col, ListGroup, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SearchAnimeProvider, SearchAnimeContext } from '../contexts/SearchAnimeContext';

export const SearchAnime = () => (
    <SearchAnimeProvider>
        <SearchAnimeContext.Consumer> 
            { (context) => (
                <Container>
                    <Col md={{span: 8, offset: 2}}>
                        <h1>Search Characters By Anime</h1>
                        <InputGroup className="mb-3">
                            <FormControl 
                                placeholder="Anime Title"
                                value={context.animeTitle}
                                onChange={context.handleAnimeTitle}    
                            />
                            <InputGroup.Append>
                                <Button 
                                    variant="outline-secondary"
                                    onClick={context.fetchAnimes}
                                >
                                    Search
                                </Button>
                            </InputGroup.Append>    
                        </InputGroup>
                        <ListGroup>
                            { context.animes.map((anime) => (
                                <Link key={anime.mal_id} to={`/anime/${anime.mal_id}`}>
                                    <ListGroup.Item style={{cursor: 'pointer'}}>
                                        <Image 
                                            src={anime.image_url} 
                                            style={{height: '150px', marginRight:'15px'}} 
                                            thumbnail 
                                        />
                                        {`${anime.title} [${anime.mal_id}]`}
                                    </ListGroup.Item>
                                </Link>
                            ))}
                        </ListGroup>
                    </Col>
                </Container>
            )} 
        </SearchAnimeContext.Consumer>
    </SearchAnimeProvider>
);