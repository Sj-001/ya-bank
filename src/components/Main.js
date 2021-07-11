import React, { Component } from "react";
import dai from "../dai.png";
class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{ backgroundColor: "#D3D3D3" }} id="content" className="mt-5">
        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col"> STAKING BALANCE</th>
              <th scope="col">REWARD BALANCE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {window.web3.utils.fromWei(this.props.stakingBalance, "Ether")}{" "}
                mDAI
              </td>
              <td>
                {window.web3.utils.fromWei(
                  this.props.dappTokenBalance,
                  "Ether"
                )}{" "}
                DAPP
              </td>
            </tr>
          </tbody>
        </table>
        <div className="card mb-4">
          <div style={{ backgroundColor: "#FFFFE0" }} className="card-body">
            <form
              className="mb-3"
              onSubmit={(event) => {
                event.preventDefault();
                let amount;
                amount = this.input.value.toString();
                amount = window.web3.utils.toWei(amount, "Ether");
                this.props.stakeTokens(amount);
              }}
            >
              <div>
                <label className="float-left">
                  <b>STAKE TOKENS</b>
                </label>
                <span className="float-right text-muted">
                  Balance:{" "}
                  {window.web3.utils.fromWei(
                    this.props.daiTokenBalance,
                    "Ether"
                  )}
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  typr="text"
                  ref={(input) => {
                    this.input = input;
                  }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <img src={dai} height="32" alt="" />
                    &nbsp; &nbsp; &nbsp; mDAI
                  </div>
                </div>
              </div>
              <button
                type="submit"
                style={{ backgroundColor: "#daa520" }}
                className="btn btn-block btn-lg"
              >
                STAKE!
              </button>
            </form>
            <button
              type="submit"
              className="btn btn-danger btn-block btn-sm"
              onClick={(event) => {
                event.preventDefault();
                this.props.unstakeTokens();
              }}
            >
              UN-STAKE...
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
