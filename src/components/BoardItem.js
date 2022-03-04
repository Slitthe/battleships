import classNames from "classnames";


const BoardItem = (props) => {
    const {row, col, boardCellClickHandler, boardItemData} = props;


    return <div
        onClick={() => boardCellClickHandler(row, col)}
        className={classNames("board-item", boardItemData.isHit ? "board-item-hit" : undefined,
            boardItemData.occupied && boardItemData.isHit ? "board-item-successful-strike" : undefined,
            boardItemData.occupied ? 'occupied' : undefined,
        )}>

    </div>;
}

export default BoardItem;