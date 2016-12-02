
import Immutable from 'immutable'

import {INCREMENT, DECREMENT} from "actions"
let Obj = {
	val: 0
};
let val = 0;

export const reducer = ($$state = Immutable.fromJS(Obj) , action) => {
	switch (action.type) {
	    case INCREMENT: 
	        val = $$state.get("val") + 1;
	        return $$state.merge({
                val
            })
	    case DECREMENT: 
	        val = $$state.get("val") - 1;
	        return $$state.merge({
                val
            })
	    default: 
	        return $$state;
	}
};