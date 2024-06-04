import React, { useState } from "react";
import "./Card.css"

const Card = ({id, img, name}) => {
    const [{angle, xpos, ypos}] = useState({
        angle: Math.random() * 90 - 45,
        xpos: Math.random() * 45 -20,
        ypos: Math.random() * 45 - 20,
    })

    const transform = `translate(${xpos}px, ${ypos}px) rotate(${angle}deg)`;

    return <img
        className="Card"
        id={id}
        key={id}
        src={img}
        alt={name}
        style={{ transform }} />
    
};

export default Card;