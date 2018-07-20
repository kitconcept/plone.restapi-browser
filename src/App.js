import React, { Component } from 'react';
import ReactJson from "react-json-view";
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: {}
    };
  }

  componentDidMount() {
    this.navigateTo('http://localhost:8080/Plone');
  }

  navigateTo(url) {
    console.log('navigateTo(' + url + ')');
    fetch(
      url,
      {
        headers: {
          'Accept': 'application/json',
        }
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({ response: responseData });
        console.log('Fetch from plone.restapi successful!')
        this.state.response.items.map((x) => console.log(x['@id']));
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() {
    return <div className="App">
        <header className="App-header">
          <h1 className="App-title"><a href="{this.navigateTo('http://localhost:8080/Plone')}">plone.restapi</a></h1>
        </header>
        <h2>Current URL: {this.state.response["@id"]}</h2>
        <h2>Parent URL: {this.state.response["parent"] && this.state.response['parent']['@id']}</h2>
        <ReactJson src={this.state.response} theme="monokai" enableClipboard="null" displayObjectSize="null" displayDataTypes="null" onSelect={e => {
            console.log("select callback", e);
            console.log(e.namespace);
            this.navigateTo(e["value"]);
          }} />
        <ul>
          {this.state.response.items && this.state.response.items.map(x => (
            <li>
              <a href="{x['@id']}">{x["title"]}</a>
            </li>
          ))}
        </ul>
      </div>;
  }
}

export default App;
