import { View, Image } from 'react-native';
import Matter from 'matter-js';

const Meteor = (props) => {
	const width = props.size.width;
	const height = props.size.height;

	const xPos = props.body.position.x - width / 2;
	const yPos = props.body.position.y - height / 2;

	console.log('Rendering meteor at position:', { xPos, yPos });

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
				source={props.uri}
				style={{
					width: width,
					height: height,
					transform: [{ rotate: `${props.body.angle}rad` }],
				}}
				resizeMode="contain"
			/>
		</View>
	);
};

export default (world, position, size, uri) => {
	const theMeteor = Matter.Bodies.rectangle(position.x, position.y, size.width, size.height, { isStatic: false });

	Matter.World.add(world, theMeteor);
	return {
		body: theMeteor,
		position,
		size,
		uri,
		renderer: <Meteor body={theMeteor} size={size} uri={uri} />,
	};
};
