import React, {Component} from 'react';
import moment from 'moment';

export default class TodoItem extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        let {task, expires_at, created_at, done, type, id} = this.props;

        let expires_at_date = new Date(expires_at);

        let item_class = done ? 'todo__item--done' : '';

        return (
            <div className={`todo__item ${item_class}`} onClick={() => this.changeStatus(id)}>
                <div className="todo__item-col">{task}</div>
                <div className="todo__item-col">{this.getFormatedDate(expires_at_date)}</div>
                <div className="todo__item-col">{this.getFormatedDate(created_at)}</div>
                <div className="todo__item-col">{this.getTypeName(type)}</div>
            </div>
        );
    }

    changeStatus(id){
        this.props.changeStatus(id);
    }

    getFormatedDate(date) {
        return moment.unix(date).format('YYYY-MM-DD HH:mm:ss')
    }

    getTypeName(id){
        let types = this.props.types;
        var i = types.length;

        while (i--) {
            if (types[i].id == id) {
                return types[i].name;
            }
        }
    }
}