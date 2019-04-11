import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { addNewQuote } from '../redux';

class AddQuotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteToAdd: '',
    };
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  cancelForm = () => {
    // Reroute to home page when cancel button is clicked
    this.props.history.push('/');
  }

  addNewQuote = () => {
    var authorquotesbank = this.props.quotesBank.find((item) => item.author === this.props.match.params.id);
    var idx = this.props.quotesBank.findIndex((item) => item.author === this.props.match.params.id);
    var newQuote = {
      id: (authorquotesbank.quotes.length + 1).toString(),
      quote: this.state.quoteToAdd,
      votes: 0,
    };
    var newauthorquotesbank = Object.assign({}, authorquotesbank, {
      quotes: [...authorquotesbank.quotes, newQuote],
    });
    // Axios call to add new quote to an author - put to edit the existing author record
    //if successful add this data to the redux store

    axios.put(`/quotes/addnewquote/${authorquotesbank.id}`, newauthorquotesbank)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          // update the redux store with new Author
          this.props.addNewQuoteToAuthorOnStore(newauthorquotesbank, idx);
          //reroute to home page
          this.props.history.push('/');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container-fluid">
        <Link className="row" to="/">Home</Link>
        <label>Provide a quote by {this.props.match.params.id}:</label>
        {/* input form */}
        <form className="form-group" onSubmit={(event) => { event.preventDefault() }}>
          <label htmlFor="quoteToAdd">Quote:</label>
          <input className="form-control" name="quoteToAdd" onChange={this.handleChange} value={this.state.quoteToAdd} />
          <button className="btn btn-danger btn-lg" onClick={this.cancelForm}>Cancel</button>
          <button className="btn btn-primary btn-lg" onClick={this.addNewQuote}>Submit</button>
        </form>
      </div>

    );
  }

}

const mapStateToProps = (state) => ({
  quotesBank: state.quotesBank,
});

const mapDispatchToProps = (dispatch) => ({
  addNewQuoteToAuthorOnStore: (quote, idx) => {
    dispatch(addNewQuote(quote, idx))
  },


})

export default connect(mapStateToProps, mapDispatchToProps)(AddQuotes);



