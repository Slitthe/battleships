import {shipTypes} from "../consts/gameConsts";

import cruiser from "../assets/cruiser.png";
import destroyer from "../assets/destroyer.png";
import carrier from "../assets/carrier.png";
import battleship from "../assets/battleship.png";
import submarine from "../assets/submarine.png";
import ShipHitCountDisplay from "./ShipHitCountDisplay";

const shipImages = {
    cruiser: cruiser,
    destroyer: destroyer,
    carrier: carrier,
    submarine: submarine,
    battleship: battleship,
};

const ShipHitDisplay = (props) => {
    const {shipLayout} = props;


    return <>
        {shipLayout.sort((current, next) => shipTypes[current.ship].size + shipTypes[next.ship].size).filter(ship => ship.positions.length === 0).map(layout =>
            <div class="ship-destroyed-container">
                <img class="ship-image" src={shipImages[layout.ship]}/>
                <ShipHitCountDisplay count={shipTypes[layout.ship].size}/>

            </div>
        )}
    </>
};

export default ShipHitDisplay;


