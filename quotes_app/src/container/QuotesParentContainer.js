import React from 'react';
import 'react-router';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../components/Home';
import NewAuthor from '../components/NewAuthor';
import AuthorQuotes from '../components/AuthorQuotes';
import AddQuotes from '../components/AddQuotes';
import EditAuthor from '../components/EditAuthor';
import '../styles/quotesparentcontainer.css';

class QuotesParentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  };

  render() {
    return (
      <div className="container-fluid">
        <h1 className="row">Quote Ranks</h1>
        {/* Routing */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/new" component={NewAuthor} />
          <Route path="/quotes/:id" component={AuthorQuotes} />
          <Route path="/write/:id" component={AddQuotes} />
          <Route path="/edit/:id" component={EditAuthor} />
        </Switch>
      </div>
    )
  }

}
export default QuotesParentContainer;