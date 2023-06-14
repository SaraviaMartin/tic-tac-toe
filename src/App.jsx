const TURNS = {
  X: 'x',
  O: 'o',
}

const board = Array(9).fill(null)

function App() {
  return  (
    <main className="board">
      <h1>Tic-tac-toe</h1>
      <section className="game">
        {
          board.map((_, index) => {
            return(
              <div className="cell" key={index}>
              <span className="cell__content">
                {index}
              </span>
            </div>
            )
            
          })
        }
      </section>
    </main>
  )  
}

export default App
