const Player = (name, mark) => {
    return {name, mark};
};

const gameBoard = (() => {
    const board = ["","","","","","","","",""];

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
                z++;
                rows[x].appendChild(column).className = 'column'; 
            }
        }
    }

    function addMarks() {
        const squares = document.getElementsByClassName('column');

        for (let square of squares) {
            square.addEventListener('click', () => alert('Clicked!'));
        }
    }

    return {board, createGameBoard, addMarks};
})();

gameBoard.createGameBoard();
gameBoard.addMarks();

// const displayController = (() => {
//     const getName = () => prompt('Name?');
//     const getMark = () => prompt('Mark?');
//     const playerOne = Player(getName(), getMark());
//     const playerTwo = Player(getName(), getMark());

//     return {playerOne, playerTwo};
// })();