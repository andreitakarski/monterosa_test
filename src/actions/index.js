import fetch from 'isomorphic-fetch';

export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const REQUEST_TYPES = 'REQUEST_TYPES';
export const RECEIVE_TYPES = 'RECEIVE_TYPES';
export const CHANGE_STATUS = 'CHANGE_STATUS';
export const ADD_ITEM      = 'ADD_ITEM';


export const requestItems = () => {
    return {
        type: REQUEST_ITEMS
    }
};

export const receiveItems = json => {
    return {
        type: RECEIVE_ITEMS,
        items: json
    }
};

export const errorAction = () => {
    return {
        type: REQUEST_ERROR
    }
};

export const getItems = () => {
    return dispatch => {
        dispatch(requestItems());

        return fetch('http://rygorh.dev.monterosa.co.uk/todo/items.php')
            .then(response => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }

                return response.json();
            })
            .then(json => dispatch(receiveItems(json)))
            .catch(err => dispatch(errorAction(err)))
    }
};


export const requestTypes = () => {
    return {
        type: REQUEST_TYPES
    }
};

export const receiveTypes = json => {
    return {
        type: RECEIVE_TYPES,
        types: json
    }
};

export const getTypes = () => {
    return dispatch => {
        dispatch(requestTypes());

        return fetch('http://rygorh.dev.monterosa.co.uk/todo/types.php')
            .then(response => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }

                return response.json();
            })
            .then(json => dispatch(receiveTypes(json)))
            .catch(err => dispatch(errorAction(err)))
    }
};


export const changeStatus = id => {
    return {
        type: CHANGE_STATUS,
        id: id
    }
};

export const addItem = (item) => {
    return {
        type: ADD_ITEM,
        item: item
    }
};

