import React, { Component } from "react";
import Axios from "axios";
import { getUserData } from "./../../ducks/user";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

class Private extends Component {
  async componentDidMount() {
    try {
      const res = await Axios.get("/api/user-data");
      this.props.getUserData(res.data);
    } catch (e) {
      console.log("error: not logged in", e);
      Swal({
        title: 'Oops...',
        text: "You aren't logged in!",
        type: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login!'
      }).then((result) => {
        console.log(result)
        if (result.value) {
          this.props.history.push('/')
        }
      })
    }
  }

  balance() {
    return Math.floor((Math.random() + 1) * 1e14);
  }
  render() {
    console.log(this.props);
    const { id, email } = this.props.user;
    return (
      <div>
        <h1>Account Summary</h1>
        <hr />
        <hr />
        <hr />
        {id ? (
          <div>
            <p> Account name: Fin Morrison</p>
            <p> Account email: {email}</p>
            <p> Account ID: {id}</p>
            <p> Balance: {this.balance()}.00</p>
            <a href="http://localhost:4000/auth/logout">
              <button>Logout</button>
            </a>
          </div>
        ) : 
          <p>
            Please log in <Link to="/">Homepage</Link>
          </p>
        }
      </div>
    );
  }
}

const mapStateToProps = reduxStore => reduxStore;

export default connect(
  mapStateToProps,
  { getUserData }
)(Private);
