import React, { Component } from "react";
import Layout from "../../../components/Layout";
import web3 from "../../../ethereum/web3";
import campaign from "../../../ethereum/campaign";
import { Link, Router } from "../../../routes";

class Requests extends Component {
  static async getInitialProps(props) {
    const campaignShow = campaign(props.query.address);

    const owner = await campaignShow.methods.owner().call();

    const donorsDetailLength = await campaignShow.methods
      .getDonarDetailsLength()
      .call();

    let donorsDetail = [];

    for (let i = 0; i < donorsDetailLength; i++) {
      const detail = await campaignShow.methods.donors_details(i).call();
      donorsDetail.push(detail);
    }

    const requestLength = await campaignShow.methods.getRequestLength().call();

    let requests = [];

    for (let i = 0; i < requestLength; i++) {
      const request = await campaignShow.methods.request(i).call();
      if (!request.status) requests.push({ request, index: i });
    }

    return { requests, owner, address: props.query.address, donorsDetail };
  }

  constructor(props) {
    super(props);

    this.state = {
      requests: this.props.requests,
      owner: this.props.owner,
      address: this.props.address,
      donorsDetail: this.props.donorsDetail,
      account: "",
      voted: {},
    };

    this.canVote();
    this.canFinalize();
  }

  getAccount = async () => {
    const account = (await web3.eth.getAccounts())[0];
    if (this.state.account !== account)
      this.setState({
        ...this.state,
        account: (await web3.eth.getAccounts())[0],
      });
  };

  setVoted = async (index) => {
    const account = (await web3.eth.getAccounts())[0];

    const campaignShow = campaign(this.props.address);
    const temp = await campaignShow.methods.VoteOrnot(index, account).call();
    console.log(temp);

    if (this.state.voted[`${index}`] !== temp) {
      const temp = this.state.voted;
      temp[`${index}`] = await campaignShow.methods
        .VoteOrnot(index, account)
        .call();
      this.setState({
        ...this.state,
        voted: temp,
      });

      console.log(this.state, "wallah wallah");
    } else {
      console.log(this.state, "wedwefwefwefwe");
    }
  };

  canVote = (index) => {
    const account = this.state.account;

    for (let i = 0; i < this.state.donorsDetail.length; i++) {
      if (account == this.state.donorsDetail[i].donar) {
        return !this.state.voted[index];
      }
    }
    return false;
  };

  canFinalize = () => {
    const account = this.state.account;

    if (account == this.state.owner) {
      // console.log("damn");
      return true;
    } else return false;
  };

  voteButtonHandler = async (index) => {
    const campaignShow = campaign(this.state.address);
    // console.log(index);
    // console.log(campaignShow);
    // console.log(this.state.account);

    await campaignShow.methods.voting(index).send({
      from: this.state.account,
    });

    Router.pushRoute(`/campaigns/${this.state.address}`);
  };

  finalizeButtonHandler = async (index) => {
    const campaignShow = campaign(this.state.address);
    const account = await web3.eth.getAccounts()[0];
    console.log(this.state.account);
    console.log("here");

    await campaignShow.methods.finalSubmition(index).send({
      from: this.state.account,
    });

    console.log("ola");

    Router.pushRoute(`/campaigns/${this.state.address}`);
  };

  render() {
    this.getAccount();
    return (
      <Layout>
        <h1>Pending Requests</h1>
        <hr />
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Serial</th>
              <th scope="col">Reciever's Address</th>
              <th scope="col">Amount Requested</th>
              <th scope="col">Reason</th>
              <th scope="col">Vote Button</th>
              <th scope="col">Finalize Button</th>
            </tr>
          </thead>
          <tbody>
            {this.state.requests.map((request, index) => {
              this.setVoted(request.index);
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{request.request.receiver}</td>
                  <td>
                    {web3.utils.fromWei(request.request.amount, "ether")} ether
                  </td>
                  <td>{request.request.reason}</td>
                  <td>
                    {this.canVote(request.index) ? (
                      <button
                        onClick={() => {
                          this.voteButtonHandler(request.index);
                        }}
                        type="button"
                        className="container-fluid btn btn-success"
                      >
                        Vote
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="container-fluid btn btn-danger"
                        disabled
                      >
                        Can't Vote
                      </button>
                    )}
                  </td>
                  <td>
                    {/* {console.log(this.canFinalize())} */}
                    {this.canFinalize() ? (
                      <button
                        onClick={() => {
                          this.finalizeButtonHandler(request.index);
                        }}
                        type="button"
                        className="container-fluid btn btn-success"
                      >
                        Finalize
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="container-fluid btn btn-danger"
                        disabled
                      >
                        Not the manager (owner)
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {this.canFinalize() ? (
          <Link route={`/campaigns/${this.state.address}/requests/new`}>
            <button type="button" className="container-fluid btn btn-success">
              Make a new request
            </button>
          </Link>
        ) : (
          <button
            type="button"
            className="container-fluid btn btn-danger"
            disabled
          >
            Not the manager (owner)
          </button>
        )}
      </Layout>
    );
  }
}

export default Requests;
