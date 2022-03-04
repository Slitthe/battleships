import BoardItem from "./BoardItem";

const Board = (props) => {
    const {gameBoard, boardItemHandler} = props;
    return gameBoard.map((row, rowIndex) => {
        return <div key={rowIndex} className={"board-row"}>{row.map((boardItem, colIndex) => {
            return <BoardItem boardCellClickHandler={boardItemHandler} key={colIndex} col={colIndex} row={rowIndex}
                              boardItemData={boardItem}/>;
        })}</div>;
    });
}

export default Board;