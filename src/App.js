import React, { useState } from 'react';
import './App.css';

function App() {
  const [bombs, setBombs] = useState([])
  const [clicked, setClicked] = useState([])

  const buttonStyle = {
    width: 40,
    height: 40,
    backgroundColor: '#888',
    color: 'black',
    verticalAlign: 'top',
    fontSize: '32px',
    fontFamily: 'Arial, Helvetica, sans-serif;',
    borderLeft: '5px solid rgb(220,220,220)',
    borderTop: '5px solid rgb(220,220,220)',
    borderBottom: '5px solid #333',
    borderRight: '5px solid #333',
    display: 'inline-block'
  }
  const visitStyle = {
    width: 48,
    height: 48,
    backgroundColor: '#555',
    color: 'white',
    fontWeight: 'bold',
    border: '1px solid black',
    verticalAlign: 'top',
    fontSize: '32px',
    fontFamily: 'Poppins, sans-serif',
    display: 'inline-block'
  }

  const generateBombs = () => {
    let bombArr = Array(10).fill(0).map(elem => Array(10).fill(0))

    for(let i = 0; i < bombArr.length; i++){
      let bombPos = Math.floor(Math.random() * 10)
      bombArr[i][bombPos] = 'X'
    }

    for(let i = 0; i < bombArr.length; i++){
      for(let j = 0; j < bombArr[i].length; j++){
        if(bombArr[i][j] !== 'X'){
          let sum = 0

          if(i > 0 && bombArr[i-1][j] == 'X') sum++
          if(i < bombArr.length - 1 && bombArr[i+1][j] == 'X') sum++
          if(j < bombArr.length - 1 && bombArr[i][j+1] == 'X') sum++
          if(j > 0 && bombArr[i][j-1] == 'X') sum++
          if(i < bombArr.length - 1 && j > 0 && bombArr[i+1][j-1] == 'X') sum++
          if(i < bombArr.length - 1 && j < bombArr.length - 1 && bombArr[i+1][j+1] == 'X') sum++
          if(i > 0 && j > 0 && bombArr[i-1][j-1] == 'X' ) sum++
          if(i > 0 && j < bombArr.length - 1 && bombArr[i-1][j+1] == 'X' ) sum++

          bombArr[i][j] = sum
        }
      }
    }
    setBombs(bombArr)

    let cover = Array(10).fill(0).map(elem => Array(10).fill(0))
    setClicked(cover)
  }

  const visitCell = (i, j) => {
    if(bombs[i][j] == 'X') {
      alert("You lost! Game over!")
      window.location.reload();
    }
    dfsCells(i, j)
    clicked[i][j] = 1
    setClicked([...clicked])
  }

  function dfsCells(i, j) {
    if(i < 0 || i > clicked.length - 1 || j < 0 || j > clicked[0].length - 1 || clicked[i][j] == 1 || bombs[i][j] == 'X') return

    clicked[i][j] = 1

    setClicked([...clicked])
   
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className={'title'}> SIMPLIFIED MINESWEEPER </div>
        
        {bombs.map((arr, index) =>
          <div>
            {arr.map((elem, i) =>
              <div
                onClick={() => visitCell(index, i)}
                style={clicked[index][i] == 0 ? buttonStyle : visitStyle}>
                {clicked[index][i] == 0 ? null : bombs[index][i] == 0 ? '' : bombs[index][i] }
              </div>
            )}
          </div>
        )}
        <button
          className='new'
          onClick={() => generateBombs()}>Start New Game</button>
      </header>

    </div>
  );
}

export default App;