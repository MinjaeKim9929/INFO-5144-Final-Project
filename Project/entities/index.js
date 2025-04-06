import Matter from 'matter-js';
import Variables from '../constants/Variables';
import UFO from '../components/UFO';
import Meteor from '../components/Meteor';

const WINDOW_WIDTH = Variables.WINDOW_WIDTH;
const WINDOW_HEIGHT = Variables.WINDOW_HEIGHT;

export default (gameWorld) => {
	let engine = Matter.Engine.create({ enableSleeping: false });
	let world = engine.world;
	world.gravity.y = 0;

	// UFO
	const UFO_RB = UFO(world, { x: WINDOW_WIDTH / 2, y: WINDOW_HEIGHT / 2 }, { width: 65, height: 65 });

	return {
		physics: { engine, world },
		UFO_RB: UFO_RB,
		Meteors: [],
		meteorTimer: 0,
	};
};
