import React, { Component } from "react";
import Layout from "../../../components/Layout";
import web3 from "../../../ethereum/web3";
import campaign from "../../../ethereum/campaign";
import { Link, Router } from "../../../routes";

class NewRequest extends Component {
  static async getInitialProps(props) {
    const address = props.query.address;

    return { address };
  }

  constructor(props) {
    super(props);
    this.state = {
      address: this.props.address,
      receiver: "",
      amount: "",
      reason: "",
    };
  }

  formSubmitHandler = async (evt) => {
    evt.preventDefault();
    const account = (await web3.eth.getAccounts())[0];

    const campaignShow = campaign(this.props.address);
    await campaignShow.methods
      .CreateRequest(
        this.state.reason,
        web3.utils.toWei(this.state.amount, "ether"),
        this.state.receiver
      )
      .send({
        from: account,
      });

    Router.pushRoute(`/campaigns/${this.props.address}/requests`);
  };

  render() {
    return (
      <Layout>
        <h1>New Request Form</h1>
        <hr />
        <form onSubmit={this.formSubmitHandler}>
          <div className="form-group mb-3">
            <label htmlFor="receiver">Receiver Address</label>
            <input
              value={this.state.receiver}
              onChange={(evt) => {
                this.setState({ ...this.state, receiver: evt.target.value });
              }}
              type="text"
              className="form-control"
              id="receiver"
              placeholder="Enter the Etherium Address of the Receiver"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="amount">Amount (Ether)</label>
            <input
              value={this.state.amount}
              onChange={(evt) => {
                this.setState({ ...this.state, amount: evt.target.value });
              }}
              type="text"
              className="form-control"
              id="amount"
              placeholder="Enter the Etherium Amount in Ether"
            />
          </div>

          <div className="form-group mb-5">
            <label htmlFor="reason">Reason</label>
            <input
              value={this.state.reason}
              onChange={(evt) => {
                this.setState({ ...this.state, reason: evt.target.value });
              }}
              type="text"
              className="form-control"
              id="reason"
              placeholder="Enter a valid reason to back your claim"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit Your Request
          </button>
        </form>
      </Layout>
    );
  }
}

export default NewRequest;
