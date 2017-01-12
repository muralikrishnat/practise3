class TabsComp extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        var colorCls = this.props.name;
        return (
            <div className={colorCls}>
                { this.props.children }
            </div>
        );
    }
}


class App extends React.Component {
    render () {
        var str = 'container';
        return (
            <TabsComp name={str}><div>Tab1</div><div>Tab2</div> </TabsComp>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));