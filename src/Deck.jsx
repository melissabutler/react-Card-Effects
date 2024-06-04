import React, { useState, useEffect} from "react";
import Card from "./Card";
import axios from "axios";

const BASE_URL = "https://deckofcardsapi.com/api/deck"
const Deck = () => {
    const [deck, setDeck] = useState(null);
    const [card, setCard] = useState([]);
    const [shuffle, setShuffle] = useState(false);
// Call API to get deck information at start of load, set deck state
    useEffect( function getDeckFromAPI() {
        async function getDeck() {
            let deck = await axios.get(`${BASE_URL}/new/shuffle`)

            setDeck(deck.data)
        }
        getDeck();
    }, []);
// draw a card and adjust card state
    async function drawCard() {
        try {
            let drawResults = await axios.get(`${BASE_URL}/${deck.deck_id}/draw/`)

            if (drawResults.data.remaining === 0){
                throw new Error("Deck is empty!")
                setShuffle(true)
            }
        // console.log(drawResults)
        let drawnCard = drawResults.data.cards[0]
        // console.log(drawnCard)

        setCard(d => [
            ...d,
            {
                id: drawnCard.code,
                img: drawnCard.image,
                name: drawnCard.value + " " + drawnCard.suit,

            }
        ])
        // console.log(card)
    } catch(err){
        alert(err);
    }
    }
// shuffle deck and change state
    async function shuffleDeck() {
        try {
            setShuffle(true);
            await axios.get(`${BASE_URL}/${deck.deck_id}/shuffle/`)
            setCard([])
        } catch(err){
            alert(err)
        } finally {
            setShuffle(false)
        }
    }

// if deck is empty, show shuffle button

//if deck is full, show draw button


    return (
        <div>
            <button onClick={drawCard}>Draw a card!</button>
            <button onClick={shuffleDeck}>Shuffle Deck</button>
            {card.map(c => (
                <Card id={c.id} key={c.id} img={c.img} name={c.name} />
            ))}
        </div>
    )
}

export default Deck;