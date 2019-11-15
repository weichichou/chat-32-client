import React from 'react';
import './App.css';

class App extends React.Component {
  stream = new EventSource('http://localhost:4000/stream')

  componentDidMount(){
    this.stream.onmessage = function(event){
      const {data} = event
      console.log('data test:', data)
    }
  }

  render(){
    return (
      <div className="App">
        <h1>Hello World</h1>
      </div>
    )
  }
}

export default App;
