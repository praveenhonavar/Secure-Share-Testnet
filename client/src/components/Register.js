import React, { Component } from "react";
import SecureShareContract from "../contracts/SecureShare.json";
import getWeb3 from "../getWeb3";
import { Link } from "react-router-dom";

import "../styles/Register.css";

import Swal from "sweetalert2";

var accountType;
// const NodeRSA = require("node-rsa");

const pd = () => {
  console.log("oooooooooooooooooooooooo");
  if (!window.location.hash) {
    window.location = window.location + "#loaded";
    window.location.reload();
  }
};

class Register extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

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

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SecureShareContract.networks[networkId];

      const instance = new web3.eth.Contract(abi,contractAddress);


      // const instance = new web3.eth.Contract(
      //   SecureShareContract.abi,
      //   deployedNetwork && deployedNetwork.address
      // );

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
    var file;
    var bufferedFile;
    var fileId;
    var selectedReceiver;

    var submitButton = document.getElementById("submit");

    var rS = document.getElementById("role-select");

    rS.addEventListener("change", () => {
      accountType = rS.options[rS.selectedIndex].value;
      console.log("uberrr", accountType);
    });

    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    console.log("llp", contract);

    submitButton.addEventListener("click", () => {
      // const key = new NodeRSA({ b: 512 });
      // console.log("keyyyy", key);

      // var publicKey = key.exportKey("public");
      // var privateKey = key.exportKey("private");

      // console.log("keyyyy", publicKey);
      // console.log(privateKey);

      console.log(accountType);

      var password = document.getElementById("reg-password").value;
      var username = document.getElementById("reg-username").value;
      var address = document.getElementById("reg-address").value;

      console.log(address);


      contract.methods
        .registerUser(username, password, address,accountType)
        .send({ from: accounts[0] })
        .then((data) => {
          console.log("added user", data);

          Swal.fire({
            icon: "success",
            title: "You have been Registerd Successfully 🎉",
            showConfirmButton: false,
            timer: 2000,
          });

          window.location = "http://localhost:3000/login";
        });
    });
  };

  render() {
    if (!this.state.web3) {
      pd();

      console.log("pkfpefpef");

      // return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div id="register-body">
        <h1 id="reg-head">Register YourSelf</h1>

        <div id="form-container">
          <div id="form-items">
            <h4 id="reg-item-header">Let's get you Signed Up!</h4>

            <h5 id="reg-item-subheader">Create your Account on Secure Share</h5>

            <h5 id="item-head-1">UserName</h5>
            <input
              placeholder="Enter your UserName"
              type="name"
              id="reg-username"
            />
            <br></br>

            <h5 id="item-head">Password</h5>
            <input
              placeholder="Enter your Password"
              type="password"
              id="reg-password"
            />
            <br></br>

            <h5 id="item-head">Ethereum Address</h5>
            <input
              placeholder="Enter your public Ethereum Address"
              type="text"
              id="reg-address"
            />
            <br></br>

            <h5 id="item-head-1">Select your Role</h5>

            <select id="role-select">
              <option >-- Select your Role --</option>
              <option value="Doctor">Doctor</option>
              <option value="Health Care Unit">Health Care Unit</option>
              <option value="Patient">Patients</option>
            </select>

            <div id="button_container">
              <button id="submit"> Register </button>
            </div>

            <h5 id="reg-extra">
              Already have an account?
              <Link to="login" target="_blank" id="login-xtra">
                {" "}
                SignIn here.
              </Link>
            </h5>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
