import shipHitIcon from "../assets/hit.png";

const ShipHitCountDisplay = (props) => {
    const {count} = props;

    let stars = [];

    for (let i = 0; i < count; i++) {
        stars.push(<img class="ship-hit-count-image" src={shipHitIcon}/>)
    }

    return <>
        <div class="ship-hit-displays">
            {stars}
        </div>
    </>
};

export default ShipHitCountDisplay;


