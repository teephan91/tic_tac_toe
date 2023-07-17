const Player = (name, mark) => {
    return {name, mark};
};

const displayController = (() => {
    const getName = () => prompt('Name?');
    const getMark = () => prompt('Mark?');
    const playerOne = Player(getName(), getMark());
    const playerTwo = Player(getName(), getMark());

    return {playerOne, playerTwo};
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
            gameBoard.board[this.getAttribute('id')] = displayController.playerOne.mark;
            
            let winnerCheckP1 = gameBoard.board.filter(x => x === displayController.playerOne.mark).length;
            const emptySquares = allSquares.filter((square) => square.textContent === '');
      
            emptySquares.forEach((square) => {
                square.removeEventListener('click', handle1stPlayerClick);
                square.addEventListener('click', handle2ndPlayerClick, {once: true});
            });  
            
            if (winnerCheckP1 > 2) {checkTheWinner(displayController.playerOne.mark)}
        }

        function handle2ndPlayerClick() {
            take2ndPlayerTurn.call(this, displayController.playerTwo, displayController.playerOne);
        }

        function take2ndPlayerTurn() {
            this.textContent = displayController.playerTwo.mark;
            gameBoard.board[this.getAttribute('id')] = displayController.playerTwo.mark;
            
            let winnerCheckP2 = gameBoard.board.filter(x => x === displayController.playerTwo.mark).length;
            const emptySquares = allSquares.filter((square) => square.textContent === '');
      
            emptySquares.forEach((square) => {
                square.removeEventListener('click', handle2ndPlayerClick);
                square.addEventListener('click', handle1stPlayerClick, {once: true});
            });
            
            if (winnerCheckP2 > 2) {checkTheWinner(displayController.playerTwo.mark)}
        }
    }

    function checkTheWinner(playerMark) {
        let winnerCheck = gameBoard.board.reduce((arr, el, i) => {
            if (el === playerMark) arr.push(i);
            return arr;
        }, []).toString();
 
        switch(winnerCheck) {
            case "0,1,2":
            case "0,3,6":
            case "0,4,8":
            case "1,4,7":
            case "2,4,6":
            case "2,5,8":
            case "3,4,5":
            case "6,7,8":
                alert('Winner');
                break;
        }
    }
    
    return {board, createGameBoard, addPlayerMark, checkTheWinner};
})();

gameBoard.createGameBoard();
gameBoard.addPlayerMark();