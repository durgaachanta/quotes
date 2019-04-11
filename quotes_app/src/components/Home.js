import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateInitialReduxStore } from '../redux';
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  };

  componentDidMount = () => {
    //axios call to fetch data from MockAPI
    //please move this call to a helper function
    axios.get('/quotes/fetchquotes')
      .then((response) => {
        // push the data into redux store
        this.props.updateRedux(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container-fluid">
        <Link className="row" to="/new">Add a quotable author</Link>
        <label>We have quotes by:</label>
        <table className="table">
          <tr>
            <th>Author</th>
            <th>Actions available</th>
          </tr>
          {this.props.quotesBank.map((item) => {
            return (<tr>
              <td>{item.author}</td>
              <td>
                <button className="btn btn-light btn-lg">
                  <Link to={`/quotes/${item.author}`}>View Quotes</Link>
                </button>
                <button className="btn btn-dark btn-lg">
                  <Link to={`/edit/${item.author}`}>Edit</Link>
                </button>
              </td>
            </tr>)
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
  updateRedux: (data) => {
    dispatch(updateInitialReduxStore(data))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);