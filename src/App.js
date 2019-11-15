import React from 'react';
import superagent from 'superagent';
import './App.css';

class App extends React.Component {
  state = {
    messages: ['fake'],
    value: ''
  }

  stream = new EventSource('http://localhost:4000/stream')

  componentDidMount(){
    this.stream.onmessage = (event) => {
      // Desctructure the data - what was passed to stream.send
      const {data} = event

      // convert the serialized string back to javascript data
      const parsed = JSON.parse(data)

      // Check if the sent data is an array
      // If it is an array, we assume it contains ALL messages
      // and replace the full list in the state
      if (Array.isArray(parsed)){
        this.setState({messages: parsed})
      }else{
        // If it is not an array, we assuem it is a single message
        // and add it at the end of the list
        const messages = [
          ...this.state.messages, parsed
        ]
        this.setState({messages})
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
    const url = 'http://localhost:4000/message'
    superagent
      .post(url)
      .send({message: value})
      .then(res => console.log('response test', res))
  }

  render(){
    const list = this.state.messages
      .map((message, index) => <p key={index}>{message}</p>)
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
