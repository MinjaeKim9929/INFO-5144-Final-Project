import Images from '../constants/Images';
import { View, Image } from 'react-native';
import Matter from 'matter-js';

const UFO = (props) => {
	const width = props.size.width;
	const height = props.size.height;

	const xPos = props.body.position.x - width / 2;
	const yPos = props.body.position.y - height / 2 - 5;

	return (
		<View
			style={{
				width: width,
				height: height,
				left: xPos,
				top: yPos,
				position: 'absolute',
			}}
		>
			<Image
				source={Images.UFO}
				style={{
					width: width,
					height: height,
				}}
				resizeMode="contain"
			/>
		</View>
	);
};

export default (world, position, size) => {
	const theUFO = Matter.Bodies.rectangle(position.x, position.y, size.width, size.height, {
		isStatic: true,
		collisionFilter: {
			category: 0x0001,
		},
	});
	const width = size.width;
	const height = size.height;
	const xPos = position.x - width / 2;
	const yPos = position.y - height / 2 - 15;
	const move = 72;
	const firstGridPos = [xPos - move, yPos - move];
	const secondGridPos = [xPos, yPos - move];
	const thirdGridPos = [xPos + move, yPos - move];
	const fourthGridPos = [xPos - move, yPos];
	const fifthGridPos = [xPos, yPos];
	const sixthGridPos = [xPos + move, yPos];
	const seventhGridPos = [xPos - move, yPos + move];
	const eighthGridPos = [xPos, yPos + move];
	const ninthGridPos = [xPos + move, yPos + move];
	const gridPos = [
		firstGridPos,
		secondGridPos,
		thirdGridPos,
		fourthGridPos,
		fifthGridPos,
		sixthGridPos,
		seventhGridPos,
		eighthGridPos,
		ninthGridPos,
	];
	let currentGrid = 4;

	Matter.World.add(world, theUFO);
	return { body: theUFO, position, size, gridPos, currentGrid, renderer: <UFO /> };
};
