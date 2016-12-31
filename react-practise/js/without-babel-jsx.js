var App = React.createClass({
    render: function (){
        return React.createElement('div', {}, 'This is App');
    }
});

ReactDOM.render(React.createElement('div', {
    'data-id': 4
}, "This is react element"), document.getElementById('root'));

ReactDOM.render(React.createElement(App), document.getElementById('root2'));