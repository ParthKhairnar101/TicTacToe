import { useState } from "react";

const initialBoard = Array(9).fill(null);

const App = () => {
  const [board,setBoard] = useState(initialBoard);
  const [currentPlayer,setCurrentPlayer] = useState("X");
  const [winner,setWinner] = useState(null);

  //Handle Play
  const handlePlay = (index) => {
    if(board[index] || winner){
      return;
    }
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    checkWinner(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }

  //Check Winner
  const checkWinner = (board) => {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]

    for(let i=0;i<lines.length;i++)
    {
      const [a,b,c] = lines[i]
      if(board[a] && board[a] === board[b] && board[a] === board[c]){
        setWinner(board[a]);
        return;
      }
    }
    if(!board.includes(null)){
      setWinner("Draw");
    }
  }

  //Reset Game
  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer("X");
    setWinner(null);
  }

  //Render Gameboard
  const renderSquare = (index) => (
    <button className="w-16 h-16 bg-white m-1 rounded-sm hover:bg-white/80"
      onClick={() => handlePlay(index)}
    >
      {board[index]}
    </button>
  )

  //Status
  let status
  if(winner){
    status = winner === "Draw" ? "It's a draw" : `Player ${winner} wins!`;
  }
  else{
    status = `Current Player: ${currentPlayer}`
  }

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center">
      <div>
        <h1 className="text-white text-center font-bold text-2xl">{status}</h1>
        <div className="flex">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="flex">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="flex">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <button className="bg-white text-2xl mt-3 w-full rounded-xl hover:bg-white/90" onClick={resetGame}>Reset Board</button>
      </div>
    </div>
  )
}

export default App