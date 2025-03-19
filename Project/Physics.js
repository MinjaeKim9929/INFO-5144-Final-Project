import Matter from 'matter-js';

const Physics = (entities, { touches, time }) => {
	const engine = entities.physics.engine;
	const world = engine.world;

	Matter.Engine.update(engine, time.delta);
	return entities;
};

export default Physics;
