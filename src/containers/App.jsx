import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions'

import TodoList from '../components/TodoList';
import AddForm from '../components/AddForm';

class App extends Component {

    componentDidMount(){
        this.props.getItems();
        this.props.getTypes();
    }

    render() {
        console.log(this.props.items);

        return (
            <div className="todo">
                <TodoList
                    items={this.props.items}
                    types={this.props.types}
                    changeStatus= {this.props.changeStatus}
                />

                <AddForm types={this.props.types} addItem={this.props.addItem}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.isFetching,
        items: state.items,
        types: state.types
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getItems: () => dispatch(Actions.getItems()),
        getTypes: () => dispatch(Actions.getTypes()),
        changeStatus: (id) => dispatch(Actions.changeStatus(id)),
        addItem : (item) => dispatch(Actions.addItem(item))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)