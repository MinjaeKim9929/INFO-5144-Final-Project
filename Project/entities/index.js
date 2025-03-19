import Matter from 'matter-js';

export default (gameWorld) => {
	let engine = Matter.Engine.create({ enableSleeping: false });
	let world = engine.world;

	return {
		physics: { engine, world },
	};
};
