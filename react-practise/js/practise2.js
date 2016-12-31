class TabsComp extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div>
                { this.props.children }
            </div>
        );
    }
}


class App extends React.Component {
    render () {
        return (
            <TabsComp><div>Tab1</div><div>Tab2</div> </TabsComp>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));