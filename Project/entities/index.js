import Matter from 'matter-js';
import Variables from '../constants/Variables';
import UFO from '../components/UFO';
import Coin from '../components/Coin';
import Meteor from '../components/Meteor';

const WINDOW_WIDTH = Variables.WINDOW_WIDTH;
const WINDOW_HEIGHT = Variables.WINDOW_HEIGHT;

// Helper to spawn coin
const createCoin = (world, gridPositions, size) => {
	const randomIndex = Math.floor(Math.random() * gridPositions.length);
	const [x, y] = gridPositions[randomIndex];
	const coinSize = { width: 40, height: 40 };

	const coin = Matter.Bodies.circle(x + coinSize.width / 2 + 12, y + coinSize.height + 5, coinSize.width / 2, {
		isSensor: true,
		isStatic: true,
		label: 'Coin',
	});

	Matter.World.add(world, coin);

	return {
		body: coin,
		size: coinSize,
		position: { x: x, y: y },
		gridIndex: randomIndex,
		renderer: <Coin />,
	};
};

export default ({ setScore, gameWorld }) => {
	let engine = Matter.Engine.create({ enableSleeping: false });
	let world = engine.world;
	world.gravity.y = 0;

	// UFO
	const UFO_RB = UFO(world, { x: WINDOW_WIDTH / 2, y: WINDOW_HEIGHT / 2 }, { width: 65, height: 65 });

	// Coin
	const CoinEntity = createCoin(world, UFO_RB.gridPos, { width: 30, height: 30 }); // Adjust coin size as needed

	return {
		physics: { engine, world },
		UFO_RB: UFO_RB,
		Coin: CoinEntity,
		Meteors: [],
		meteorTimer: 0,
		coinRespawnTimer: 0,
		setScore,
	};
};

export { createCoin };
