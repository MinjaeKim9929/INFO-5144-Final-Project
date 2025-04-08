import Matter from 'matter-js';
import Images from './constants/Images';
import Meteor from './components/Meteor';
import Variables from './constants/Variables';
import { createCoin } from './entities';

const WINDOW_WIDTH = Variables.WINDOW_WIDTH;
const WINDOW_HEIGHT = Variables.WINDOW_HEIGHT;

const Physics = (entities, { touches, time, dispatch }) => {
	const engine = entities.physics.engine;
	const world = engine.world;

	let UFO = entities.UFO_RB;
	let startTouch = touches.find((t) => t.type === 'start');
	let endTouch = touches.find((t) => t.type === 'end');
	let moveTouch = touches.find((t) => t.type === 'move');
	let endX = 0;
	let endY = 0;
	let isEnded = false;
	let meteorTimer = 0;
	const METEOR_INTERVAL = 4000;

	// Initialize game over state if it doesn't exist
	if (entities.isGameOver === undefined) {
		entities.isGameOver = false;
	}

	Matter.Events.on(engine, 'collisionStart', (event) => {
		event.pairs.forEach((pair) => {
			const bodyA = pair.bodyA;
			const bodyB = pair.bodyB;

			if (bodyA === UFO.body || bodyB === UFO.body) {
				const meteor = entities.Meteors.find((m) => m.body === bodyA || m.body === bodyB);
				if (meteor) {
					entities.isGameOver = true;
					dispatch({ type: 'game-over' });
				}
			}
		});
	});

	// If game is over, stop all physics operations
	if (entities.isGameOver) {
		return entities;
	}

	if (entities.isPaused) {
		return entities;
	}

	if (entities.meteorTimer === undefined) {
		entities.meteorTimer = 0;
		console.log('Initializing meteor timer');
	}
	entities.meteorTimer += time.delta;
	console.log('Meteor timer:', entities.meteorTimer);

	if (entities.Meteors === undefined) {
		entities.Meteors = [];
		console.log('Initializing Meteors array');
	}

	if (!UFO.animation) {
		UFO.animation = {
			targetX: UFO.body.position.x,
			targetY: UFO.body.position.y,
			speed: 0.4,
		};
	}

	if (startTouch) {
		console.log('Touch started at:', startTouch.event.pageX, startTouch.event.pageY);
		startX = startTouch.event.pageX;
		startY = startTouch.event.pageY;
	}

	if (endTouch) {
		console.log('Touch ended at: ', endTouch.event.pageX, endTouch.event.pageY);
		endX = endTouch.event.pageX;
		endY = endTouch.event.pageY;
		isEnded = true;
		console.log(isEnded);
	}

	// swipe direction detection
	function getSwipeDirection(moveX, moveY) {
		const absX = Math.abs(moveX);
		const absY = Math.abs(moveY);

		if (absX > absY) {
			return moveX > 0 ? 'right' : 'left';
		} else if (absY > absX) {
			return moveY > 0 ? 'down' : 'up';
		}
	}

	// Move UFO to the new grid based on swipe direction

	function moveUFOGrid(direction, currentGrid) {
		let row = Math.floor(currentGrid / 3);
		let col = currentGrid % 3;

		switch (direction) {
			case 'up':
				if (row > 0) row--; // Move up if not at top
				break;
			case 'down':
				if (row < 2) row++; // Move down if not at bottom
				break;
			case 'left':
				if (col > 0) col--; // Move left if not at left edge
				break;
			case 'right':
				if (col < 2) col++; // Move right if not at right edge
				break;
		}

		return row * 3 + col;
	}

	// and update its position accordingly
	function updateUFOPosition(ufo, newGrid) {
		const position = ufo.gridPos[newGrid];
		const xPos = position[0] + ufo.size.width / 2;
		const yPos = position[1] + ufo.size.height / 2 + 15;
		ufo.animation.targetX = xPos;
		ufo.animation.targetY = yPos;
	}

	if (isEnded === true) {
		let moveX = endX - startX;
		let moveY = endY - startY;
		// console.log('Moved: ', moveX, moveY);
		let direction = getSwipeDirection(moveX, moveY);
		let currentGrid = UFO.currentGrid;
		console.log('Current grid before:', currentGrid);
		UFO.currentGrid = moveUFOGrid(direction, currentGrid);
		console.log('Current grid after: ', currentGrid);
		updateUFOPosition(UFO, UFO.currentGrid);

		startX = 0;
		startY = 0;
		isEnded = false;
	}

	const currentX = UFO.body.position.x;
	const currentY = UFO.body.position.y;
	const targetX = UFO.animation.targetX;
	const targetY = UFO.animation.targetY;
	const speed = UFO.animation.speed;

	const newX = currentX + (targetX - currentX) * speed;
	const newY = currentY + (targetY - currentY) * speed;

	if (Math.abs(newX - targetX) > 0.1 || Math.abs(newY - targetY) > 0.1) {
		Matter.Body.setPosition(UFO.body, { x: newX, y: newY });
	} else {
		Matter.Body.setPosition(UFO.body, { x: targetX, y: targetY });
	}

	if (entities.meteorTimer >= METEOR_INTERVAL) {
		console.log('Meteor timer reached. Creating meteor...');
		console.log('Current number of meteors:', entities.Meteors.length);

		entities.meteorTimer = 0;
		const direction = Math.random() > 0.5 ? 'vertical' : 'horizontal';
		const randomNum = Math.floor(Math.random() * 3) + 1;
		const meteorImage = Images[`Meteor${randomNum}`];

		const size = { width: 50, height: 100 };

		let x, y, velocity, angle;
		if (direction === 'vertical') {
			const column = Math.floor(Math.random() * 3);
			x = UFO.gridPos[column][0] + UFO.size.width / 2;
			y = -size.height;
			velocity = { x: 0, y: 5 };
			angle = 0;
		} else {
			const row = Math.floor(Math.random() * 3);
			x = UFO.gridPos[row * 3][0] - size.width * 3;
			y = UFO.gridPos[row * 3][1] + UFO.size.height / 2 + 10;
			velocity = { x: 3, y: 0 };
			angle = -Math.PI / 2;
		}

		const meteor = Meteor(world, { x, y }, size, meteorImage);

		Matter.Body.set(meteor.body, {
			friction: 0,
			frictionAir: 0,
			frictionStatic: 0,
			restitution: 1,
			inertia: Infinity,
			collisionFilter: {
				group: -1,
				category: 0x0002,
				mask: 0x0001,
			},
		});

		Matter.Body.setAngle(meteor.body, angle);
		Matter.Body.setVelocity(meteor.body, velocity);

		entities.Meteors.push(meteor);
		console.log('Meteor created and added. Total meteors:', entities.Meteors.length);
	}

	entities.Meteors = entities.Meteors.filter((meteor) => {
		const { x, y } = meteor.body.position;
		const isOnScreen = x >= -100 && x <= WINDOW_WIDTH + 100 && y >= -100 && y <= WINDOW_HEIGHT + 100;

		if (!isOnScreen) {
			Matter.World.remove(world, meteor.body);
		}
		return isOnScreen;
	});

	//coin functionality
	const ufoBody = entities.UFO_RB.body;
	const coinBody = entities.Coin?.body;

	if (coinBody) {
		const dx = ufoBody.position.x - coinBody.position.x;
		const dy = ufoBody.position.y - coinBody.position.y;
		const distance = Math.sqrt(dx * dx + dy * dy);
		console.log('Distance between UFO and coin:', distance);

		if (distance < 30) {
			// Adjust collision radius
			Matter.World.remove(entities.physics.world, coinBody); // Remove coin from world
			delete entities.Coin; // Remove from entities

			// Update score
			if (entities.setScore) {
				entities.setScore((prev) => prev + 1);
			}

			// Set respawn timer
			entities.coinRespawnTimer = 1000; // 1 second delay
		}
	}

	// Handle coin respawn
	if (!entities.Coin && entities.coinRespawnTimer > 0) {
		entities.coinRespawnTimer -= time.delta;
		if (entities.coinRespawnTimer <= 0) {
			// Spawn new coin
			const newCoin = createCoin(entities.physics.world, entities.UFO_RB.gridPos, entities.UFO_RB.size);
			entities.Coin = newCoin;
		}
	}

	Matter.Engine.update(engine, time.delta);

	const meteorEntities = entities.Meteors.reduce((acc, meteor, index) => {
		acc[`meteor${index}`] = meteor;
		return acc;
	}, {});

	return {
		...entities,
		...meteorEntities,
	};
};
export default Physics;
