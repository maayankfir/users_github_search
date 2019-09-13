import React, { Component } from 'react';
import Navbar from './layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import './App.css';

import axios from 'axios';

class App extends Component {
  state = {
    users: [],
    loading: false,
    showClear: false
  };

  searchUsers = async text => {
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data.items, loading: false });
  };

  clearSearch = () => {
    this.setState({ users: [], loading: false });
  };

  render() {
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Search
            searchUsers={this.searchUsers}
            clearSearch={this.clearSearch}
            showClear={this.state.users.length > 0 ? true : false}
          />
          <Users users={this.state.users} loading={this.state.loading} />
        </div>
      </div>
    );
  }
}

export default App;
