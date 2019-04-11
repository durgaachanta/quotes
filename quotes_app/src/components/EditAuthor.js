import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateAuthor } from '../redux';

class EditAuthor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authorName: '',
    };
  };

  componentDidMount = () => {
    this.setState({ authorName: this.props.match.params.id });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  editAuthor = () => {

    // put call - to add this modified author data to Mock API
    //if successful add this data to the redux store
    console.log(this.props.quotesBank);
    var authorbank = this.props.quotesBank.find((item) => item.author === this.props.match.params.id);
    var authorIdx = this.props.quotesBank.findIndex((item) => item.author === this.props.match.params.id);
    console.log(authorbank);
    var updatedAuthor = Object.assign({}, authorbank, {
      author: this.state.authorName,
    });
    console.log(updatedAuthor);
    axios.put(`/quotes/addnewquote/${authorbank.id}`, updatedAuthor)
      .then((response) => {
        if (response.status === 200) {
          // update the redux store with new Author
          this.props.addEditedAuthorToStore(updatedAuthor, authorIdx);
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
      <div className="container-fluid">
        <Link to="/">Home</Link>
        <label>Edit quotable author: </label>
        {/* input form */}
        <form className="form-group" onSubmit={(event) => { event.preventDefault() }}>
          <label htmlFor="authorName">Name:</label>
          <input className="form-control" name="authorName" onChange={this.handleChange} value={this.state.authorName} />
          <button className="btn btn-danger btn-lg" onClick={() => { this.props.history.push('/') }}>Cancel</button>
          <button className="btn btn-primary btn-lg" onClick={this.editAuthor}>Submit</button>
        </form>
      </div>

    );
  }

}

const mapStateToProps = (state) => ({
  quotesBank: state.quotesBank,

});

const mapDispatchToProps = (dispatch) => ({
  addEditedAuthorToStore: (newAuthordata, idx) => {
    dispatch(updateAuthor(newAuthordata, idx))
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(EditAuthor);