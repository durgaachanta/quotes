import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { addNewQuote } from '../redux';

class AuthorQuotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  };

  vote = (quoteObject, index, votetype) => {
    //increment or decrement vote by one

    var voteCounter = quoteObject.votes;
    var newCounter;
    if (votetype === "up") {
      newCounter = Object.assign({}, quoteObject, {
        votes: voteCounter + 1,
      });
    } else {
      newCounter = Object.assign({}, quoteObject, {
        votes: voteCounter - 1,
      });

    }
    var objectToUpdate = this.props.quotesBank.find((item) => item.author === this.props.match.params.id);
    var indexRedux = this.props.quotesBank.findIndex((item) => item.author === this.props.match.params.id);
    var updatedObject = Object.assign({}, objectToUpdate, {
      quotes: [...objectToUpdate.quotes.slice(0, index),
      objectToUpdate.quotes[index] = newCounter,
      ...objectToUpdate.quotes.slice(index + 1)],
    });
    // axios call to Mock api to vote up
    axios.put(`/quotes/addnewquote/${objectToUpdate.id}`, updatedObject)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          // update the redux store with new Author
          console.log('durga test');
          this.props.editVoteOnStore(updatedObject, indexRedux);
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }

  //delete Vote
  deleteQuote = (idx) => {
    //var index = this.props.quotesBank.findIndex((item) => item.author === this.props.match.params.id);
    console.log("Quote - index to delete");
    console.log(idx);
    var quotesToDisplay = this.props.quotesBank.find((item) => item.author === this.props.match.params.id);
    var authorsID = this.props.quotesBank.findIndex((item) => item.author === this.props.match.params.id);
    console.log("Author - index to delete");
    console.log(quotesToDisplay);
    //console.log(authorsQuoteTodelete);
    var newObject = Object.assign({}, quotesToDisplay, {
      quotes: [...quotesToDisplay.quotes.slice(0, idx),
      ...quotesToDisplay.quotes.slice(idx + 1)],
    });
    console.log(newObject);
    //axios call to delete Quotes
    axios.put(`/quotes/addnewquote/${quotesToDisplay.id}`, newObject)
      .then((response) => {
        console.log(response);
        // if (response.status === 200) {
        //   // update the redux store with new Author
        //   console.log('durga test');
        //   this.props.editVoteOnStore(updatedObject, indexRedux);
        // }
      })
      .catch((error) => {
        console.log(error);
      });


  }

  render() {
    // refactor and place this quotes to display in state - it is being used in multiple places
    var quotesToDisplay = this.props.quotesBank.find((item) => item.author === this.props.match.params.id);
    console.log(quotesToDisplay);
    return (
      <div className="container-fluid">
        <div className="row">
          <Link className="col" to="/">Home</Link>
          <Link className="col" to={`/write/${this.props.match.params.id}`}>Add a quote</Link>
        </div>
        <label>Quotes by: {this.props.match.params.id}</label>
        <table className="table">
          <tr>
            <th>Quotes</th>
            <th>Votes</th>
            <th>Actions available</th>
          </tr>
          {quotesToDisplay.quotes.map((item, idx) => {
            return (
              <tr>
                <td>{item.quote}</td>
                <td>{item.votes}</td>
                <td>
                  <button className="btn btn-primary btn-lg" onClick={() => { this.vote(item, idx, "up") }}>Vote up</button>
                  <button className="btn btn-warning btn-lg" onClick={() => { this.vote(item, idx, "down") }}>Vote down</button>
                  <button className="btn btn-danger btn-lg" onClick={() => { this.deleteQuote(idx) }}>Delete</button>
                </td>
              </tr>
            )
          })}

        </table>

      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  quotesBank: state.quotesBank,
});

const mapDispatchToProps = (dispatch) => ({
  editVoteOnStore: (data, idx) => {
    dispatch(addNewQuote(data, idx))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorQuotes);