import React, {Component} from 'react';
import moment from 'moment';
import InputMoment from 'input-moment';

export default class AddForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isShowedForm : false,
            task : '',
            expires_at : moment(),
            created_at : moment(),
            type : 1,
            isShowedCalendar: false
        };

        this._handleKeyDown = (e) => {

            if (e.keyCode === 13) {
                this.addItem();
            }
        };

        this.handleChange =  (expire_at) => {
            this.setState({ expire_at });
        };

        this.handleSave = () => {
            this.setState({ isShowedCalendar: false });
        };
    }

    addItem() {
        this.closeForm();
        let item = {...this.state};
        delete item.isShowedForm;
        delete item.isShowedCalendar;
        item.expires_at = Number(moment(item.expires_at).format('X'));
        item.created_at = Number(moment(item.created_at).format('X'));

        this.props.addItem({...item});
    }
    componentDidMount() {
        window.addEventListener('keydown', this._handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this._handleKeyDown);
    }

    render() {
        let button_text = !this.state.isShowedForm ? 'Add' : 'Cancel';

        return (
            <div className="todo__add">
                {this.state.isShowedForm
                    ? <div className="todo__form">
                        <div className="todo__form-group">
                                <input type="text" value={this.state.task} onChange={(e) => this.onChangeHandler(e, 'task')} className="todo__input"/>
                        </div>

                        <div className="todo__form-group">
                            <div className="todo__form-input">
                                <input type="text" value={this.state.expires_at.format('YYYY-MM-DD HH:mm:ss')}
                                       onClick={() => this.toggleCalendar()} readOnly className="todo__input"/>

                                <div className={`todo__calendar ${this.state.isShowedCalendar ? 'active' : ''}`}>

                                    <InputMoment
                                        moment={this.state.expires_at}
                                        onChange={this.handleChange}
                                        onSave={this.handleSave}
                                    />

                                </div>
                            </div>
                        </div>

                    <div className="todo__form-group">
                        <input type="text" value={this.state.created_at.format('YYYY-MM-DD HH:mm:ss')} readOnly className="todo__input"/>
                    </div>

                        <div className="todo__form-group">
                            <select className="todo__select" name="todo-select" id="todo-select" value={this.state.type} onChange={(e) => this.onChangeHandler(e, 'type')}>
                                {this.getSelectOptions()}
                            </select>
                        </div>
                     </div>
                    : null}

                    <div className="todo__btns">
                        <span className="add-btn" onClick={() => this.toggleForm()}>{button_text}</span>
                        {this.state.isShowedForm ?  <span className="add-btn" onClick={() => this.addItem()}>OK</span>: null}
                    </div>
            </div>
        )
    }

    onChangeHandler(e, field){
        this.setState({[field] : e.target.value});
    }

    toggleForm(){
        this.setState({isShowedForm: !this.state.isShowedForm});
    }

    closeForm(){
        this.setState({
            isShowedForm : false,
            task : '',
            expires_at : moment(),
            created_at : moment(),
            type : 1,
            isShowedCalendar: false
        });
    }

    toggleCalendar() {
        this.setState({isShowedCalendar: !this.state.isShowedCalendar})
    }

    getSelectOptions(){
        let types = this.props.types;

        if(!types.length){
            return null;
        }

        let types_content = types.map(type => {
            return <option key={type.id} value={type.id}>{type.name}</option>
        })

        return types_content;
    }
}