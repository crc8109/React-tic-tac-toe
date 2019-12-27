import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row row1">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(20)}
          {this.renderSquare(21)}
          {this.renderSquare(22)}
        </div>
        <div className="board-row row2">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}
          {this.renderSquare(23)}
          {this.renderSquare(24)}
          {this.renderSquare(25)}
        </div>
        <div className="board-row row3">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(26)}
          {this.renderSquare(27)}
          {this.renderSquare(28)}
        </div>
        <div className="board-row row4">
          {this.renderSquare(30)}
          {this.renderSquare(31)}
          {this.renderSquare(32)}
          {this.renderSquare(40)}
          {this.renderSquare(41)}
          {this.renderSquare(42)}
          {this.renderSquare(50)}
          {this.renderSquare(51)}
          {this.renderSquare(52)}
        </div>
        <div className="board-row row5">
          {this.renderSquare(33)}
          {this.renderSquare(34)}
          {this.renderSquare(35)}
          {this.renderSquare(43)}
          {this.renderSquare(44)}
          {this.renderSquare(45)}
          {this.renderSquare(53)}
          {this.renderSquare(54)}
          {this.renderSquare(55)}
        </div>
        <div className="board-row row6">
          {this.renderSquare(36)}
          {this.renderSquare(37)}
          {this.renderSquare(38)}
          {this.renderSquare(46)}
          {this.renderSquare(47)}
          {this.renderSquare(48)}
          {this.renderSquare(56)}
          {this.renderSquare(57)}
          {this.renderSquare(58)}
        </div>
        <div className="board-row row7">
          {this.renderSquare(60)}
          {this.renderSquare(61)}
          {this.renderSquare(62)}
          {this.renderSquare(70)}
          {this.renderSquare(71)}
          {this.renderSquare(72)}
          {this.renderSquare(80)}
          {this.renderSquare(81)}
          {this.renderSquare(82)}
        </div>
        <div className="board-row row8">
          {this.renderSquare(63)}
          {this.renderSquare(64)}
          {this.renderSquare(65)}
          {this.renderSquare(73)}
          {this.renderSquare(74)}
          {this.renderSquare(75)}
          {this.renderSquare(83)}
          {this.renderSquare(84)}
          {this.renderSquare(85)}

        </div>
        <div className="board-row row9">
          {this.renderSquare(66)}
          {this.renderSquare(67)}
          {this.renderSquare(68)}
          {this.renderSquare(76)}
          {this.renderSquare(77)}
          {this.renderSquare(78)}
          {this.renderSquare(86)}
          {this.renderSquare(87)}
          {this.renderSquare(88)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array().fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    //Table 1
    //Horizontal wins
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    //Vertical wins Table 1
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    //Diagonal wins Table 1
    [0, 4, 8], [2, 4, 6],

    //Table 2
    //Horizontal wins
    [10, 11, 12], [13, 14, 15], [16, 17, 18],
    //Vertical wins
    [10, 13, 16], [11, 14, 17], [12, 15, 18],
    //Diagonal wins
    [10, 14, 18], [12, 14, 16],

    //Table 3
    //Horizontal wins
    [20, 21, 22], [23, 24, 25], [26, 27, 28],
    //Vertical wins
    [20, 23, 26], [21, 24, 27], [22, 25, 28],
    //Diagonal wins
    [20, 24, 28], [22, 24, 26],

    //Table 4
    //Horizontal wins
    [30, 31, 22], [33, 34, 25], [36, 37, 38],
    //Vertical wins
    [30, 33, 36], [31, 34, 37], [32, 35, 38],
    //Diagonal wins
    [30, 34, 38], [32, 34, 36],

    //Table 5
    //Horizontal wins
    [40, 41, 22], [43, 44, 45], [46, 47, 48],
    //Vertical wins
    [40, 43, 46], [41, 44, 47], [42, 45, 48],
    //Diagonal wins
    [40, 44, 48], [42, 44, 46],

    //Table 6
    //Horizontal wins
    [50, 51, 52], [53, 54, 55], [56, 57, 58],
    //Vertical wins
    [50, 53, 56], [51, 54, 57], [52, 55, 58],
    //Diagonal wins
    [50, 54, 58], [52, 54, 56],

    //Table 7
    //Horizontal wins
    [60, 61, 62], [63, 64, 65], [66, 67, 68],
    //Vertical wins
    [60, 63, 66], [61, 64, 67], [62, 65, 68],
    //Diagonal wins
    [60, 64, 68], [62, 64, 66],

    //Table 8
    //Horizontal wins
    [70, 71, 72], [73, 74, 75], [76, 77, 78],
    //Vertical wins
    [70, 73, 76], [71, 74, 77], [72, 75, 78],
    //Diagonal wins
    [70, 74, 78], [72, 74, 76],

    //Table 9
    //Horizontal wins
    [80, 81, 82], [83, 84, 85], [86, 87, 88],
    //Vertical wins
    [80, 83, 86], [81, 84, 87], [82, 85, 88],
    //Diagonal wins
    [80, 84, 88], [82, 84, 86],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
