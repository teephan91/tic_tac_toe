const gameBoard = (() => {
    const arr = ["X","X","X","O","O","O","X","X","X"];
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
})();