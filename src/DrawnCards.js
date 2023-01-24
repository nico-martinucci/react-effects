import Card from "./Card";
import { useEffect, useState } from "react";
import axios from "axios";
import cloneDeep from "lodash/cloneDeep"

const BASE_API_URL = "https://deckofcardsapi.com/api/deck"

/**
 * DrawnCards: component to retrieve a deck of cards and 
 */
function DrawnCards() {
    const [deck, setDeck] = useState({
        id: null,
        remaining: 0,
        isLoading: true
    });
    const [cards, setCards] = useState({
        cards: [],
        isDrawing: false
    });

    useEffect(function getNewDeck() {
        async function fetchDeck() {
            const response = await axios.get(
                `${BASE_API_URL}/new/shuffle/?deck_count=1`
            );
            setDeck({
                id: response.data.deck_id,
                remaining: response.data.remaining,
                isLoading: false
            });
        }

        fetchDeck();
    }, [ ]);

    useEffect(function drawCard() {
        async function fetchCard() {
            if (isDrawing) {
                const response = await axios.get(
                    `${BASE_API_URL}/${deck.id}/draw/?count=1`
                );
                setCards(curr => {
                    const [ newCard ] = response.data.cards;
                    return {
                        cards: [...curr, newCard],
                        isDrawing: false
                    };
                });
            }
        }

        fetchCard();
    }, [ cards ]);

    /**
     * 
     */
    function drawNewCard() {

    }

    if (deck.isLoading || cards.isDrawing) return <p>Loading...</p>

    // add a button to draw a new card
    return (
        <>
            <button></button>
            {cards.map(c => <Card card={c}/>)}
        </>
    );
}


export default DrawnCards;