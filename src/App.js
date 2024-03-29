import React, { Component } from 'react';
import Navbar from './layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './layout/Alert';
import './App.css';

import axios from 'axios';

class App extends Component {
  state = {
    users: [],
    loading: false,
    showClear: false,
    alert: null
  };

  searchUsers = async text => {
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data.items, loading: false });
  };

  clearSearch = () => {
    this.setState({ users: [], loading: false });
  };

  setAlert = (msg, type) => {
    this.setAlert({
      alert: { msg, type }
    });
  };

  render() {
    console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET);

    const { users, loading } = this.state;
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={this.state.alert} />
          <Search
            searchUsers={this.searchUsers}
            clearSearch={this.clearSearch}
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <Users users={users} loading={loading} />
        </div>
      </div>
    );
  }
}

export default App;
