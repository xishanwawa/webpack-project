
import Immutable from 'immutable'


import { store } from 'store';
import keyMirror from 'keyMirror';
const actions = keyMirror({
	INCREMENT: null, 
	DECREMENT: null
});

//const actions = keyMirror("111");

const onIncrement = () => {
	return (dispatch) => {
	  dispatch({type: actions.INCREMENT})
	}
}

const onDecrement = () => {
	return (dispatch) => {
	  dispatch({type: actions.DECREMENT})
	}
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

// "use static";
// let KeyVal = function(obj) {
// 	let ret = {};
// 	let key;
// 	if((obj instanceof Object && !Array.isArray(obj))) {
// 		throw new Error('arg must be an object')
// 	}
// 	for (key in obj) {
//        if (obj.hasOwnProperty(key)) {
// 		   ret[key] = key;
// 	   }
// 	};

// 	return ret;
// }