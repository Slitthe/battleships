import {getRndInteger} from "./generalUtils";

const generateGameBoard = (size) => {
    const gameBoard = [];
    for (let i = 0; i < size; i++) {
        gameBoard.push([]);
        for (let j = 0; j < size; j++) {
            gameBoard[i].push({
                occupied: false,
                isHit: false,
                isShipHit: false,
            });
        }
    }

    return gameBoard;
};


const placeShipsLayoutOnBoard = (board, layout) => {
    const boardCopy = createBoardCopy(board);
    layout.forEach(layoutItem => {
        layoutItem.positions.forEach(position => {
            const [row, col] = position;
            boardCopy[row][col].occupied = true;
        });
    });


    return boardCopy;
};

// const shipProximityChecker = (ship, board, location, position) => {
//     const {size: shipSize} = ship;
//     const [row, column] = location;
//
//     console.log("INFINITE");
//
//
//     if (position === "vertical") {
//         let isOccupied = false;
//
//         const rightColumn = [];
//         const leftColumn = [];
//         let isAnyBoardItemOccupied = true;
//         const currentColPrevAndNext = [
//             board[row - 1] ? board[row - 1][column] : undefined,
//             board[row + shipSize + 1] ? board[row + shipSize + 1][column] : undefined
//         ];
//
//         for (let i = 0; i < shipSize + 2; i++) {
//             rightColumn.push(board[row][column - 1 + i]);
//             leftColumn.push(board[row][column + 1 + i]);
//         }
//
//         const combinedItems = [...rightColumn, ...leftColumn, ...currentColPrevAndNext].filter(ship => ship !== undefined);
//
//         for (let i = 0; i < combinedItems.length; i++) {
//             if (combinedItems[i].occupied) {
//                 isOccupied = true;
//             }
//         }
//
//         return isOccupied;
//
//     } else if (position === 'horizontal') {
//         const topRow = board[row - 1] !== undefined ? board[row - 1].slice(column - 1, column + shipSize + 1) : [];
//         const bottomRow = board[row + 1] !== undefined ? board[row + 1].slice(column + 1, column + shipSize + 1) : [];
//         const currentRowPrevAndNext = [board[row][column - 1], board[row][column + shipSize - 1]];
//
//         const combinedItems = [...topRow, ...bottomRow, ...currentRowPrevAndNext].filter(ship => ship !== undefined);
//         const isAnyBoardItemOccupied = combinedItems.filter(boardItem => boardItem.occupied).length > 0;
//
//         return isAnyBoardItemOccupied;
//     }
//
//     return true;
// }

const canPositionShip = (ship, board, location, position) => {
    const {size: shipSize} = ship;
    const [row, column] = location;


    if (position === "vertical") {
        for (let i = 0; i < shipSize; i++) {
            const currentBoardItem = board[row + i] ? board[row + i][column] : undefined;


            if (currentBoardItem === undefined || currentBoardItem.occupied === true) {
                return false;
            }
        }
    } else if (position === 'horizontal') {
        for (let i = 0; i < shipSize; i++) {
            const currentBoardItem = board[row] ? board[row][column + i] : undefined;
            if (currentBoardItem === undefined || currentBoardItem.occupied === true) {
                return false;
            }
        }
    }

    return true;
}

const createBoardCopy = (board) => {
    const copy = [...board];
    for (let i = 0; i < board.length; i++) {
        copy[i] = [...board[i]];
        for (let j = 0; j < board.length; j++) {
            copy[i][j] = {...board[i][j]};
        }
    }

    return copy;
}


const createLayoutCopy = (layout) => {
    const copy = [...layout];
    for (let i = 0; i < layout.length; i++) {
        copy[i].positions = [...layout[i].positions];
        for (let j = 0; j < copy[i].positions.length; j++) {
            copy[i].positions[j] = [...layout[i].positions[j]];
        }
    }

    return copy;
}

const markShipHit = (row, col, layout) => {

    const layoutCopy = createLayoutCopy(layout);
    return layoutCopy.map(ship => {
        const positions = ship.positions.filter(pos => {
            const [posRow, posCol] = pos;
            if (posRow === row && posCol === col) {
                return false;
            }
            return true;
        });

        return {...ship, positions: positions};
    });

    return layoutCopy;

}


const placeShipsRandomlyOnBoard = (types, board) => {
    let shipTypeNames = [...Object.keys(types)];
    const layout = [];


    while (shipTypeNames.length > 0) {
        const row = getRndInteger(0, 9);
        const col = getRndInteger(0, 9);


        const isVertical = Math.random() > 0.5;
        const shipType = types[shipTypeNames[0]];

        if (canPositionShip(shipType, board, [row, col], isVertical ? "vertical" : "horizontal")) {
            const layoutPos = [];
            if (isVertical) {
                for (let i = 0; i < shipType.size; i++) {
                    layoutPos.push([row + i, col]);
                }
            } else {
                for (let i = 0; i < shipType.size; i++) {
                    layoutPos.push([row, col + i]);
                }
            }

            layout.push({
                ship: shipTypeNames.shift(),
                positions: layoutPos
            });
            board = placeShipsLayoutOnBoard(board, layout);
        }
    }

    return layout;
}


export {
    generateGameBoard,
    placeShipsLayoutOnBoard,
    canPositionShip,
    createBoardCopy,
    createLayoutCopy,
    markShipHit,
    placeShipsRandomlyOnBoard
};