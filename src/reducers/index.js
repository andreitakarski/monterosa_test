import { REQUEST_ITEMS , RECEIVE_ITEMS, REQUEST_ERROR, REQUEST_TYPES, RECEIVE_TYPES, CHANGE_STATUS, ADD_ITEM} from  '../actions';

export default function todoList(state = {}, action = {}) {
    switch (action.type) {
        case REQUEST_ITEMS:
            return Object.assign({}, state, {
                isFetching: true
            });

        case RECEIVE_ITEMS:

            let items = action.items.map((item, index) => {
                return {...item, id: index}
            });

            return Object.assign({}, state, {
                isFetching: false,
                items: items
            });

        case REQUEST_TYPES:
            return Object.assign({}, state, {
                isFetching: true
            });

        case RECEIVE_TYPES:
            return Object.assign({}, state, {
                isFetching: false,
                types: action.types
            });

        case REQUEST_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                items: ["Error"]
            });

        case CHANGE_STATUS:

            let changed_items = state.items.map((item) => {
                if(action.id === item.id){
                    item.done = !item.done
                }
                return {...item}
            });


            return Object.assign({}, state, {
                isFetching: false,
                items: changed_items
            });

        case ADD_ITEM:
            let newItem = {...action.item, id: getNewId(state.items)};
            console.log(state.items);

            return Object.assign({}, state, {
                items: [...state.items, newItem]
            });

        default:
            return state
    }
}


function getNewId(items) {
    let ids = [];

    items.forEach(item => {
        ids.push(item.id)
    })

    return Math.max(...ids) + 1
}

