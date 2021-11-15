import React, { Component } from "react";
import { Link } from "react-router-dom";
import SecureShareContract from "../contracts/SecureShare.json";
import getWeb3 from "../getWeb3";

import Swal from "sweetalert2";

import "../styles/Login.css";

const pd = () => {
  console.log("oooooooooooooooooooooooo");
  if (!window.location.hash) {
    window.location = window.location + "#loaded";
    window.location.reload();
  }
};

class Login extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

 

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
 const contractAddress = `0x955E320c3aC7C1c9366Fb9420A217E3D5278c247`;
  const abi =
  [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "password",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "accountAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "accountType",
				"type": "string"
			}
		],
		"name": "AddedUser",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "value",
				"type": "bool"
			}
		],
		"name": "Fail",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "ipfsValue",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "fileName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "time",
				"type": "string"
			}
		],
		"name": "ShareFile",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "value",
				"type": "bool"
			}
		],
		"name": "Success",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "user",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "password",
				"type": "string"
			}
		],
		"name": "authenticateUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "fId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "getFile",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "getFileId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "password",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "accountAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "accountType",
				"type": "string"
			}
		],
		"name": "registerUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "storedHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "fileName",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "time",
				"type": "string"
			}
		],
		"name": "uploadHash",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]


      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SecureShareContract.networks[networkId];
      
      // const instance = new web3.eth.Contract(
      //   SecureShareContract.abi,
      //   deployedNetwork && deployedNetwork.address
      // );

      const instance = new web3.eth.Contract(abi,contractAddress);


      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Make sure that you are using your MetaMask Account",
      showConfirmButton: false,
      timer: 2500,
    });

    var loginUserName = document.getElementById("login-username");
    var loginPassword = document.getElementById("login-password");
    var loginBtn = document.getElementById("login-button");

    loginBtn.addEventListener("click", () => {
      var userName = loginUserName.value;
      var password = loginPassword.value;

      console.log(userName);
      console.log(password);

                    window.location = "http://localhost:3000/dashboard";


      // contract.methods
      //   .authenticateUser(userName, password)
      //   .send({ from: accounts[0] })
      //   .then((data) => {
      //     console.log(data.events);

          
      //     contract.getPastEvents("Success").then((val) => {
      //       if (val[0].returnValues.value == true) {
      //         console.log("inn");
      //         Swal.fire({
      //           icon: "success",
      //           title: "Logged-In Successfully 🎉",
      //           showConfirmButton: false,
      //           timer: 2000,
      //         });

      //         window.location = "http://localhost:3000/dashboard";
      //       } else {
      //         console.log("foff");
      //         Swal.fire({
      //           icon: "fail",
      //           title:
      //             "Please Make sure that you are using same MetaMask Account 😕",
      //           showConfirmButton: false,
      //           timer: 2500,
      //         });
      //       }
      //     });
      //   });

    });
  };

  render() {
    if (!this.state.web3) {
      pd();

      console.log("pkfpefpef");

      // return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div>
        <img src="../public/assets/logo-homepage.png" alt="" id="logo" />

        <div id="login-container-box">
          <h1 id="login-head">Login Here</h1>

          <div id="login-container">
            <div id="login-content">
              <h4 id="login-item-header">Welcome to Secure Share</h4>

              <h5 id="login-item-subheader">
                Sign in to your account to continue
              </h5>

              <h5 id="item-head-1">UserName</h5>

              <input
                type="text"
                name=""
                id="login-username"
                placeholder="Enter your UserName"
              />
              <br />

              <h5 id="item-head">Password</h5>

              <input
                type="password"
                name=""
                id="login-password"
                placeholder="Enter your Password"
              />
              <br />

              <h5 id="fpwd">Forgot your password?</h5>

              <input type="button" value="Sign In" id="login-button" />

              <h5 id="reg-here">
                Need an account?{" "}
                <Link to="register" target="_blank" id="reg-xtra-sht">
                  Register here.
                </Link>
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
