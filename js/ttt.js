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

    function addPlayerMark() {
        const allSquares = Array.from(document.getElementsByClassName('column'));

        allSquares.forEach((square) => {
            square.addEventListener(
                'click',
                function () {
                    takeTurn.call(this, displayController.playerOne, displayController.playerTwo);
                },
                {once: true}
            );
        });
        
        function takeTurn(firstPlayer, secondPlayer) {
            this.textContent = firstPlayer.mark;

            const emptySquares = allSquares.filter(square => square.textContent === "");

            emptySquares.forEach((square) => {
                square.removeEventListener(
                    'click',
                    function () {
                        takeTurn.call(this, firstPlayer, secondPlayer);
                    }
                );
              
                square.addEventListener(
                    'click',
                    function () {
                        takeTurn.call(this, secondPlayer, firstPlayer);
                    },
                    {once: true}
                );
            });
        }
    } 

    return {board, createGameBoard, addPlayerMark};
})();

gameBoard.createGameBoard();
gameBoard.addPlayerMark();