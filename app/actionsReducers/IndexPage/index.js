import Immutable from 'immutable'
import keyMirror from 'keyMirror';

// const INCREMENT = 'INCREMENT';
// const DECREMENT = 'DECREMENT';


const  actions = keyMirror({
	INCREMENT: null, 
	DECREMENT: null
});


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


const indexPageReducer = ($$state = Immutable.fromJS({val: 0}) , action) => {
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












// keyMirror
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