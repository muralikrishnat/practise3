import { Comp1 } from './practise2.jsx'

class App extends React.Component
{
    render() {
        return (
            <div>
                <Comp1>Testng</Comp1>
            </div>
        );
    }
}




ReactDOM.render(<app/>, document.querySelector('#root1'));