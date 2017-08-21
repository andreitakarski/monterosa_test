import React, {Component} from 'react';
import TodoItem from './TodoItem';


export default class TodoList extends Component {

    render() {

        return (
            <div className="todo__list">
                <div className="todo__header">
                    <div className="todo__item-col">Task</div>
                    <div className="todo__item-col">Expires at</div>
                    <div className="todo__item-col">Created at</div>
                    <div className="todo__item-col">Type</div>
                </div>

                {this.getItems()}
            </div>
        );
    }

    getItems() {
        let items = this.props.items;
        let types = this.props.types;

        if(items.length === 0 || types.length === 0) {
            return null;
        }

        let sorted_items = items.sort(this.compareDate);

        let itemsContent =  sorted_items.map((item, index) => {

            let props = {...item, types, key: index, changeStatus: this.props.changeStatus};

            return <TodoItem {...props} />
        });

        return itemsContent;
    }

    compareDate(itemA, itemB) {
        return itemA.expires_at - itemB.expires_at;
    }
}