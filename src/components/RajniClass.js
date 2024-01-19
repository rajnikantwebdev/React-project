import React from "react";

class RajniClass extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            count:0,
            userInfo: {
                name:'',
                location:'',
                bio:''
            }
        }

        console.log('constructor is called')
    }

    async componentDidMount() {
        console.log('componentdidMount first')
        const data = await fetch('https://api.github.com/users/rajnikantwebdev');
        const json = await data.json();
        console.log(json)
        console.log('componentdidMount second');
        this.setState({userInfo: {name:json.name}})
    }

    componentDidUpdate() {
        console.log('component did update')
    }

    componentWillUnmount() {
        console.log('component will unmount')
    }

    render() {
        console.log('render')
        return (
            <div>
                <h1>Rajni class:  {this.props.name}</h1>
                <h2>count: {this.state.count}</h2>
                <button onClick={() => this.setState(prevState =>  ({
                    count: prevState.count + 1
                }))}>change count</button>

                <div>{this.state.userInfo.name}
                    <h2>{this.state.userInfo.location}</h2>
                    <h2>{this.state.userInfo.bio}</h2>
                </div>

            </div>
        )
    }
}

export default RajniClass;