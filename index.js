const promoBlock = document.querySelector('.promo');
const promoBtn = document.querySelector('.promo-btn');
const gameArea = document.querySelector('.game-area');
const gameBlock = document.querySelector('.game-block');
const playerGameStep = document.querySelector('.player');
const reloadGame = document.querySelector('.reload-game');

const firstPlayerName = document.querySelector('.first-player');
const secondPlayerName = document.querySelector('.second-player');

const winPlayerName = document.querySelector('.win-name');
const winnerBlock = document.querySelector('.winner-name');

const blockItems = document.querySelectorAll('.block-item');
let counter = 0;

let step = 'cross';
let firstPlayer = null;
let secondPlayer = null;

const createAndPaintPlayer = (player, color) => {
	playerGameStep.innerHTML = player;
	playerGameStep.style.color = color;
};

promoBtn.addEventListener('click', function () {
	promoBlock.classList.add('close-promo');

	firstPlayer = prompt('Имя первого игрока'); // рекурсия
	secondPlayer = prompt('Имя второго игрока');

	firstPlayerName.textContent = firstPlayer;
	secondPlayerName.textContent = secondPlayer;

	createAndPaintPlayer(firstPlayer, '#ef4c01');

	gameArea.classList.add('open-game');
});

const changeCarrentStepPlayer = () => {
	if (step === 'circle') {
		step = 'cross';
		createAndPaintPlayer(firstPlayer, '#ef4c01');
	} else {
		step = 'circle';
		createAndPaintPlayer(secondPlayer, 'blueviolet');
	}
};

blockItems.forEach((item) => {
	item.addEventListener('click', function () {
		if (!item.classList.contains('circle') && !item.classList.contains('cross')) {
			item.classList.add(step);

			const img = document.createElement('img');
			img.src = step === 'cross' ? './assets/svg/Cross.svg' : './assets/svg/Circle.svg';
			item.appendChild(img);

			counter++;
			changeCarrentStepPlayer();
			circleWin();
			crossWin();
			noWin();
		}
	});
});

const win = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 4, 8],
	[2, 4, 6],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
];

const circleWin = () => {
	for (let i = 0; i < win.length; i++) {
		if (
			blockItems[win[i][0]].classList.contains('circle') &&
			blockItems[win[i][1]].classList.contains('circle') &&
			blockItems[win[i][2]].classList.contains('circle')
		) {
			blockItems[win[i][0]].classList.add('winColor');
			blockItems[win[i][1]].classList.add('winColor');
			blockItems[win[i][2]].classList.add('winColor');

			winPlayerName.textContent = secondPlayer;
			winnerBlock.classList.add('winner-open');
			endGame();
			return 1;
		}
	}
};

const crossWin = () => {
	for (let i = 0; i < win.length; i++) {
		if (
			blockItems[win[i][0]].classList.contains('cross') &&
			blockItems[win[i][1]].classList.contains('cross') &&
			blockItems[win[i][2]].classList.contains('cross')
		) {
			blockItems[win[i][0]].classList.add('winColor');
			blockItems[win[i][1]].classList.add('winColor');
			blockItems[win[i][2]].classList.add('winColor');

			winPlayerName.textContent = firstPlayer;
			winnerBlock.classList.add('winner-open');
			endGame();
			return 1;
		}
	}
};

const noWin = () => {
	if (!crossWin() && !circleWin() && counter >= 9) {
		winPlayerName.textContent = 'Ничья';
		winnerBlock.classList.add('winner-open');
	}
};

const endGame = () => {
	gameBlock.style.pointerEvents = 'none';
};

reloadGame.addEventListener('click', function () {
	document.location.reload();
});
