const Player = (mark) => {
    return {mark};
};

const displayController = (() => {
    var playerOne = Player('X');
    var playerTwo = Player('O');

    const openingOverlay = document.getElementById('opening_overlay');
    const trackingBoard = document.getElementById('tracking_board');
    const markX = document.getElementById('mark_x');
    const markO = document.getElementById('mark_o');
    const closingOverlay = document.getElementById('closing_overlay');

    markX.addEventListener('click', _assignMarkX, {once: true});
    markO.addEventListener('click', _assignMarkO, {once: true});

    function _assignMarkX() {
        openingOverlay.style.display = 'none';
        keepTurn(playerOne.mark);
    }

    function _assignMarkO() {
        playerOne.mark = this.textContent;
        playerTwo.mark = markX.textContent;
        openingOverlay.style.display = 'none';
        keepTurn(this.textContent);
    }

    function keepTurn(playerMark) {
        trackingBoard.textContent = `This is ${playerMark}'s turn!`;
    }

    function announceTheWinner(playerMark) {
        const newDiv = document.createElement('div');
        const announcePara = document.createElement('p');
        const restartBtn = document.createElement('button');

        closingOverlay.appendChild(newDiv);
        newDiv.appendChild(announcePara);
        newDiv.appendChild(restartBtn);

        (playerMark === 'draw') ? announcePara.textContent = 'This is a draw.' : announcePara.textContent = `Player ${playerMark} won!`;
        restartBtn.textContent = 'Restart';
        closingOverlay.style.display = 'block';

        restartBtn.addEventListener('click', () => {
            window.location.reload();
        }, {once: true});
    }

    return {playerOne, playerTwo, keepTurn, announceTheWinner};
})();

const gameBoard = (() => {
    const board = [];

    function createGameBoard() {
        const grid = document.querySelector('#grid');

        for (let a = 0; a < 3; a++) {
            const row = document.createElement('div');
            grid.appendChild(row).className = 'row';
        }
    
        const rows = document.getElementsByClassName('row');
        let z = 0;

        for (let x = 0; x < rows.length; x++) {
            for (let y = 0; y < 3; y++) {
                const column = document.createElement('div');
                column.textContent = gameBoard.board[z];
                column.setAttribute('id', `${z}`);
                z++;
                rows[x].appendChild(column).className = 'column'; 
            }
        }
    }

    function addPlayerMark() {
        const allSquares = Array.from(document.getElementsByClassName('column'));
      
        allSquares.forEach((square) => {
            square.addEventListener('click', handle1stPlayerClick, {once: true});
        });
      
        function handle1stPlayerClick() {
            take1stPlayerTurn.call(this, displayController.playerOne, displayController.playerTwo);
        }
      
        function take1stPlayerTurn() {
            this.textContent = displayController.playerOne.mark;
            displayController.keepTurn(displayController.playerTwo.mark);
            gameBoard.board[this.getAttribute('id')] = displayController.playerOne.mark;
            
            let winnerCheckP1 = gameBoard.board.filter(x => x === displayController.playerOne.mark).length;
            const emptySquares = allSquares.filter((square) => square.textContent === '');
      
            emptySquares.forEach((square) => {
                square.removeEventListener('click', handle1stPlayerClick);
                square.addEventListener('click', handle2ndPlayerClick, {once: true});
            });  
            
            if (winnerCheckP1 > 2) {_checkTheWinner(displayController.playerOne.mark)}
        }

        function handle2ndPlayerClick() {
            take2ndPlayerTurn.call(this, displayController.playerTwo, displayController.playerOne);
        }

        function take2ndPlayerTurn() {
            this.textContent = displayController.playerTwo.mark;
            displayController.keepTurn(displayController.playerOne.mark);
            gameBoard.board[this.getAttribute('id')] = displayController.playerTwo.mark;
            
            let winnerCheckP2 = gameBoard.board.filter(x => x === displayController.playerTwo.mark).length;
            const emptySquares = allSquares.filter((square) => square.textContent === '');
      
            emptySquares.forEach((square) => {
                square.removeEventListener('click', handle2ndPlayerClick);
                square.addEventListener('click', handle1stPlayerClick, {once: true});
            });
            
            if (winnerCheckP2 > 2) {_checkTheWinner(displayController.playerTwo.mark)}
        }
    }

    function _checkTheWinner(playerMark) {
        const winningCombinations = [
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [1, 4, 7],
            [2, 4, 6],
            [2, 5, 8],
            [3, 4, 5],
            [6, 7, 8],
        ];
          
        const winningMoves = winningCombinations.filter((combination) => {return combination.every((index) => gameBoard.board[index] === playerMark);});
          
        const drawOrNot= gameBoard.board.includes(undefined);

        if (winningMoves.length > 0) {
            displayController.announceTheWinner(playerMark);
        } else if ((!drawOrNot) && (gameBoard.board.length === 9))  {
            displayController.announceTheWinner('draw');
        }
    }
    
    return {board, createGameBoard, addPlayerMark};
})();

gameBoard.createGameBoard();
gameBoard.addPlayerMark();