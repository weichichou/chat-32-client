import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    messages: ['fake']
  }

  stream = new EventSource('http://localhost:4000/stream')

  componentDidMount(){
    this.stream.onmessage = (event) => {
      const {data} = event

      // convert the string back to javascript
      const parsed = JSON.parse(data)

      if (Array.isArray(parsed)){
        this.setState({messages: parsed})
      }else{
        const messages = [
          ...this.state.messages, parsed
        ]
        this.setState({messages})
      }

      console.log('parsed test:', parsed)
    }
  }

  render(){
    const list = this.state.messages
      .map((message, index) => <p key={index}>{message}</p>)
    return (
      <div className="App">
        <h1>Hello World</h1>
        <div>
          {list}
        </div>
      </div>
    )
  }
}

export default App;
