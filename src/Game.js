import "./Game.css";
import {useEffect, useState} from "react";
import {
    createLayoutCopy,
    generateGameBoard,
    markShipHit,
    placeShipsLayoutOnBoard,
    placeShipsRandomlyOnBoard
} from "./utils/gameUtils";
import {shipTypes} from "./consts/gameConsts";
import Board from "./components/Board";
import ShipHitDisplay from "./components/ShipHitDisplay";


function Game() {
    const startingLayout = placeShipsRandomlyOnBoard(shipTypes, generateGameBoard(10));
    const [shipLayout, setShipLayout] = useState(startingLayout);
    const [gameBoard, setGameBoard] = useState(placeShipsLayoutOnBoard(generateGameBoard(10), startingLayout));
    const [gameOver, setGameOver] = useState(false);

    const boardItemHandler = (row, col) => {
        if (!gameOver) {
            const copy = [...gameBoard];
            gameBoard[row][col] = {...gameBoard[row][col], isHit: true};

            setShipLayout(markShipHit(row, col, createLayoutCopy(shipLayout)));
            setGameBoard(copy);
        }

    };

    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = () => {
        const newLayout = placeShipsRandomlyOnBoard(shipTypes, generateGameBoard(10));
        setShipLayout(newLayout);
        setGameBoard(placeShipsLayoutOnBoard(generateGameBoard(10), newLayout));
        setGameOver(false);
    };


    useEffect(() => {
        let shipsLeft = 0;
        shipLayout.forEach(layout => {
            layout.positions.forEach(() => {
                shipsLeft++;
            })
        });

        if (shipsLeft === 0) {
            setGameOver(true);
        }
    }, [shipLayout]);


    return <div className={gameOver ? 'game-over' : 'active-game'}>


        <div class="board-with-results-container">

            <div className="board-container">
                {gameOver ? <div class="new-game-overlay">
                    <button className="btn secondary" onClick={startNewGame}>Start new game</button>
                    <span className="game-over-description">
                        All Ships Sunk
                    </span>
                </div> : null}
                <Board gameBoard={gameBoard} boardItemHandler={boardItemHandler}/>
            </div>
            <div className="ship-display-container"><ShipHitDisplay shipLayout={shipLayout}/></div>
        </div>


    </div>;
}

export default Game;
