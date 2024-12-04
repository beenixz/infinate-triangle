const mazeElement = document.getElementById('maze');
const gameOverElement = document.getElementById('game-over');

const maze = [
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
];

let playerPosition = { x: 0, y: 0 };
let monsterPosition = { x: 1, y: 1 }; // 몬스터의 시작 위치
let gameOver = false;

function drawMaze() {
    mazeElement.innerHTML = '';
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (maze[y][x] === 1) {
                cell.classList.add('wall');
            } else {
                cell.classList.add('path');
            }
            if (x === playerPosition.x && y === playerPosition.y) {
                cell.classList.add('player');
            }
            if (x === monsterPosition.x && y === monsterPosition.y) {
                cell.classList.add('monster');
            }
            if (x === 9 && y === 9) { // Exit position
                cell.classList.add('exit');
            }
            mazeElement.appendChild(cell);
        }
    }
}

function movePlayer(dx, dy) {
    const newX = playerPosition.x + dx;
    const newY = playerPosition.y + dy;

    if (!gameOver && newX >= 0 && newX < maze[0].length && newY >= 0 && newY < maze.length && maze[newY][newX] === 0) {
        playerPosition.x = newX;
        playerPosition.y = newY;
        drawMaze();
        checkWin();
        checkGameOver();
    }
}

function moveMonster() {
    if (gameOver) return;

    const dx = Math.sign(playerPosition.x - monsterPosition.x);
    const dy = Math.sign(playerPosition.y - monsterPosition.y);

    if (Math.abs(playerPosition.x - monsterPosition.x) > Math.abs(playerPosition.y - monsterPosition.y)) {
        monsterPosition.x += dx;
    } else {
        monsterPosition.y += dy;
    }

    drawMaze();
    checkGameOver();
}

function checkWin() {
    if (playerPosition.x === 9 && playerPosition.y === 9) {
        alert('축하합니다! 탈출에 성공했습니다!');
        resetGame();
    }
}

function checkGameOver() {
    if (playerPosition.x === monsterPosition.x && playerPosition.y === monsterPosition.y) {
        gameOver = true;
        gameOverElement.style.display = 'block'; // 게임 오버 창 표시
    }
}

function resetGame() {
    playerPosition = { x: 0, y: 0 };
    monsterPosition = { x: 1, y: 1 };
    gameOver = false;
    gameOverElement.style.display = 'none'; // 게임 오버 창 숨김
    drawMaze();
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            movePlayer(0, -1);
            break;
        case 'ArrowDown':
            movePlayer(0, 1);
            break;
        case 'ArrowLeft':
            movePlayer(-1, 0);
            break;
        case 'ArrowRight':
            movePlayer(1, 0);
            break;
    }
});

// 몬스터 이동을 주기적으로 실행
setInterval(moveMonster, 1000); // 1초마다 몬스터 이동

// 다시 하기 및 나가기 버튼 이벤트 리스너
document.getElementById('restart').addEventListener('click', () => {
    resetGame();
});

document.getElementById('exit').addEventListener('click', () => {
    window.close(); // 또는 다른 페이지로 이동
});

drawMaze();
