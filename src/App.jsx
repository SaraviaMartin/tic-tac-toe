import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square.jsx"
import { TURNS} from "./constants.js"
import { checkWinnerFrom, checkEndGame } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"
import { saveGameToStorage, resetGameStorage } from "./logic/storage/index.js"



function App() {
  const [board, setBoard] = useState(()=>{
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) :
    Array(9).fill(null)
  })

  const [turn, setTurn] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null) //null = no hay ganador, false = empate


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn[TURNS.X]
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = (index) =>{
    //no actualizamos esta posicion si ya tiene algo
    if (board[index] || winner ) return
    //con esto hacemos que el board se actualice
    const newBoard = [...board]        
    newBoard[index] = turn            
    setBoard(newBoard)
    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //guardar la partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
    //revisar si hay un ganador
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)){
      setWinner(false) //empate
    }
  }

  return  (
    <main className="board">
      <h1>Tic-tac-toe</h1>
      <button onClick={resetGame}>Restart Game</button>
      <section className="game">
        {
          board.map((square, index) => {
            return(
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
            
          })
        }
      </section>
      
      <section className="turn">
        <Square isSelected = {turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected = {turn === TURNS.O}>{TURNS.O}</Square>
      </section>

    <WinnerModal resetGame={resetGame}  winner={winner} />
    </main>
  )  
}

export default App
