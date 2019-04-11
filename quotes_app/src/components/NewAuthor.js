import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { addNewAuthorToRedux } from '../redux';

class NewAuthor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authorName: '',
    };
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  cancelForm = () => {
    // Reroute to home page when cancel button is clicked
    this.props.history.push('/');
  }

  addNewAuthor = () => {
    // Post this new author data to Mock API
    //if successful add this data to the redux store

    axios.post(`/quotes/postnewauthor/${this.state.authorName}`)
      .then((response) => {
        if (response.status === 200) {
          // update the redux store with new Author
          var jsonObject = {
            id: (this.props.quotesBank.length + 1).toString(),
            author: this.state.authorName,
            quotes: [],
          };
          this.props.addNewAuthorToStore(jsonObject);
          //change route
          this.props.history.push('/');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <label>Add a new quotable author: </label>
        {/* input form */}
        <form onSubmit={(event) => { event.preventDefault() }}>
          <label htmlFor="authorName">Name:</label>
          <input name="authorName" onChange={this.handleChange} value={this.state.authorName} />
          <button onClick={this.cancelForm}>Cancel</button>
          <button onClick={this.addNewAuthor}>Submit</button>
        </form>
      </div>

    );
  }

}

const mapStateToProps = (state) => ({
  quotesBank: state.quotesBank,

});

const mapDispatchToProps = (dispatch) => ({
  addNewAuthorToStore: (newAuthor) => {
    dispatch(addNewAuthorToRedux(newAuthor))
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(NewAuthor);