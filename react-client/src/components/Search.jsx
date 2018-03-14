import React from 'react';

class Search extends React.Component {
  constructor (props) {
    super(props);
  }

  handleInput (event) {
    event.preventDefault();
    this.props.getQueryDef(event.target[0].value);
    this.refs.queryField.value = '';
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleInput.bind(this)}>
         <input type="text" ref="queryField"/>
         <input type="submit"/>
        </form>
      </div>
    );
  }
}

export default Search;