import { useState } from 'react';
import './App.css';
import Board from './components/Board';
import { calculateWinner } from './helpers';
import "./styles/root.scss"
function App() {
  const [history,setHistory] = useState([{board: Array(9).fill(null), isXNext: true}])
    const [isXNext,setIsXNext] = useState(false)
    const [currentMove, setCurrentMove] = useState(0)

  const current = history[currentMove]

    const winner = calculateWinner(current.board)
    console.log("history:", history)
    const message = winner ? `Winner is ${winner}`: `Next player is ${current.isXNext ? 'X' : 'O'}`


    const handleSquareClick = (position) => {
        if( current.board[position] || winner)
            return

        setHistory((prev) => {

            const last = prev[prev.length -1]
            const newBoard = last.board.map((square,pos)=> {
                if( pos === position)
                    return last.isXNext?'X':'O';
                return square
            })
            return prev.concat({ board: newBoard, isXNext: !last.isXNext })
        })
        setCurrentMove(prev=> prev+1)
    }
  return (
    <div className='app'>
      <h1>TIC TAC TOE</h1>
      <h1>{message}</h1>
      <Board board={current.board} handleSquareClick={handleSquareClick}/>
    </div>
  );
}

export default App;