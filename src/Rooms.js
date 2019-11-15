import React from 'react';
import superagent from 'superagent';
import {Link} from 'react-router-dom';
import './App.css';

class App extends React.Component {
  state = {
    rooms: ['fake'],
    value: ''
  }

  stream = new EventSource('http://localhost:4000/stream')

  componentDidMount(){
    this.stream.onmessage = (event) => {
      const {data} = event

      const parsed = JSON.parse(data)

      if (Array.isArray(parsed)){
        this.setState({rooms: parsed})
      }else{
        const rooms = [
          ...this.state.rooms, parsed
        ]
        this.setState({rooms})
      }

      console.log('parsed test:', parsed)
    }
  }

  onChange = (event) => {
    const {value} = event.target
    this.setState({value})
  }

  onReset = () => {
    this.setState({value: ''})
  }

  onSubmit = (event) => {
    event.preventDefault()
    const {value} = this.state
    const url = 'http://localhost:4000/room'
    superagent
      .post(url)
      .send({name: value})
      .then(res => console.log('response test', res))
  }

  render(){
    const list = this.state.rooms
      .map((name, index) => <p key={index}>
        <Link to={`/room/${name}`}>
          {name}
        </Link>
        </p>)
    return (
      <div className="App">
        <h1>Hello World</h1>
        <form onSubmit={this.onSubmit}>
          <input type='text' onChange={this.onChange} value={this.state.value}></input>
          <button type='button' onClick={this.onReset}>Reset</button>
          <button>Submit</button>
        </form>
        <div>
          {list}
        </div>
      </div>
    )
  }
}

export default App;
