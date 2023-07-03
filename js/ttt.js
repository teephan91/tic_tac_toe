const gameBoard = (() => {
    const arr = ["1","2","3","4","5","6","7","8","9"];
    return {arr};
})();

const Player = (name, mark) => {
    return {name, mark};
};

const displayController = (() => {
    const getName = () => prompt('Name?');
    const getMark = () => prompt('Mark?');
    const playerOne = Player(getName(), getMark());
    const playerTwo = Player(getName(), getMark());

    return {playerOne, playerTwo};
});

function createGameBoard() {
    const board = document.querySelector('#board');
    for (let a = 0; a < 3; a++) {
        const row = document.createElement('div');
        board.appendChild(row).className = 'row';
    }

    const rows = document.getElementsByClassName('row');
    let z = 0;
    for (let x = 0; x < rows.length; x++) {
        for (let y = 0; y < 3; y++) {
            const column = document.createElement('div');
            column.textContent = gameBoard.arr[z];
            z++;
            rows[x].appendChild(column).className = 'column'; 
        }
    }
}

createGameBoard();