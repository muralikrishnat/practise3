function InputField1(props) {
    return (<input type="text" placeholder={props.placeholderText}/>);
}

class InputField extends React.Component {
    render() {
        var placeholderText = this.props.placeholderText;
        return (
            <div>
                <span>{this.props.placeholderText}</span>
                <input
                    type="text"
                    placeholder={this.props.placeholderText}
                    defaultValue={this.props.defaultValue}/>
            </div>
        );
    }
}

class Comp1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
        this.increaseCount = this.increaseCount.bind(this);
    }
    componentWillMount() {
        console.log('Component WILL MOUNT!')
    }

    componentDidMount() {
        console.log('Component DID MOUNT!');
    }

    componentWillReceiveProps(newProps) {
        console.log('Component WILL RECIEVE PROPS!')
    }

    shouldComponentUpdate(newProps, newState) {
        console.log('should ', newProps, newState);
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('Component WILL UPDATE!');
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('Component DID UPDATE!')
    }

    componentWillUnmount() {
        console.log('Component WILL UNMOUNT!')
    }

    increaseCount() {
        this.state.count = this.state.count + 1;
        this.setState(this.state);
    }

    render() {
        var rows = [];
        for (var i = 0; i < this.state.count; i++) {
            rows.push(
                <li key={i}>item {i}</li>
            );
        }
        return (
            <div>
                <button onClick={this.increaseCount}>INCREMENT</button>
                <div>This is comp1 {this.state.count}</div>
                <ul>{rows}</ul>
            </div>
        );
    };
}



var Comp2 = React.createClass({
    getInitialState: function () {
        return {name: 'Murali'};
    },
    render: function () {
        var localDateStr = this
            .props
            .dateObj
            .toLocaleTimeString();
        return <div>this is comp2
            <span>{localDateStr}</span>
            <span>{this.state.name}</span>
        </div>;
    }
});
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: 'Murali',
            currentDate: new Date()
        };
    }
    render() {
        return (
            <div className="form">
                <div className="form-field">
                    <div>
                        {this
                            .state
                            .currentDate
                            .toLocaleTimeString()}</div>
                    <InputField
                        type="text"
                        placeholderText="User Name"
                        defaultValue={this.state.Username}/>
                </div>
                <div className="form-field">
                    <InputField type="email" placeholderText="Email Address"/>
                </div>
                <div className="form-field">
                    <InputField1 type="email" placeholderText="Password"/>
                </div>
                <div>
                    <Comp1/>
                </div>
                <div>
                    <Comp2 dateObj={this.state.currentDate}/>
                </div>
            </div>

        );
    }
}

ReactDOM.render(
    <App/>, document.getElementById('root'));
