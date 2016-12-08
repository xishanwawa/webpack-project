
import Immutable from 'immutable'


import { store } from 'store';
import keyMirror from 'keyMirror';

const actions = keyMirror({
	INCREMENT: null, 
	DECREMENT: null
});

const onIncrement = () => {
	store.dispatch({type: actions.INCREMENT})
}

const onDecrement = () => {
	store.dispatch({type: actions.DECREMENT})
}


let Obj = {
	val: 0
};
const indexPageReducer = ($$state = Immutable.fromJS(Obj) , action) => {
	let val = 0;
	switch (action.type) {
	    case actions.INCREMENT: 
	        val = $$state.get("val") + 1;
	        return $$state.merge({
                val
            })
	    case actions.DECREMENT: 
	        val = $$state.get("val") - 1;
	        return $$state.merge({
                val
            })
	    default: 
	        return $$state;
	}
};


export {
	onIncrement,
	onDecrement,
	indexPageReducer
}