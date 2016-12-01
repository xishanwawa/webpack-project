import { store } from 'store';
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";


const onIncrement = () => {
	store.dispatch({type: 'INCREMENT'})
}

const onDecrement = () => {
	store.dispatch({type: 'DECREMENT'})
}


export {
	INCREMENT,
	DECREMENT,
	onIncrement,
	onDecrement,
}