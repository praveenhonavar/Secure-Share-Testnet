import React, { Component } from "react";
import { Link } from "react-router-dom";
import SecureShareContract from "../contracts/SecureShare.json";
import getWeb3 from "../getWeb3";

import "../styles/YourAccount.css";

const pd = () => {
  console.log("oooooooooooooooooooooooo");
  if (!window.location.hash) {
    window.location = window.location + "#loaded";
    window.location.reload();
  }
};

class YourAccount extends Component {
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
    var fileId;

    var senderName;

    var sharedFiles = document.getElementById("shared-files");
    var dbName = document.getElementById("db-name");

    const { accounts, contract } = this.state;

    console.log("saman", contract);

    contract
      .getPastEvents("AddedUser", {
        fromBlock: 0,
        toBlock: "latest",
      })
      .then((val) => {
        console.log(val);

        var size = val.length;

        for (var index = 0; index < size; index++) {
          var name = val[index].returnValues.name;
          var address = val[index].returnValues.accountAddress;

          // var senderNameAddress = res[2];
          // console.log('joe',senderNameAddress);
        }
      });

    contract.methods
      .getFileId(accounts[0])
      .call()
      .then((val) => {
        var ipfsSite = "http://ipfs.io/ipfs/";
        fileId = val;
        console.log("board dash hctib", fileId);

        for (let index = 0; index < fileId; index++) {
          // const element = array[index];
          contract.methods
            .getFile(index, accounts[0])
            .call()
            .then((res) => {
              console.log("hctib", res);

              contract
                .getPastEvents("AddedUser", {
                  fromBlock: 0,
                  toBlock: "latest",
                })
                .then((val) => {
                  console.log(val);

                  var size = val.length;

                  for (var index = 0; index < size; index++) {
                    var name = val[index].returnValues.name;
                    var address = val[index].returnValues.accountAddress;

                    var senderNameAddress = res[2];
                    console.log("joe", senderNameAddress);

                    // if(accounts[0] == address){
                    //     dbName.innerHTML =`&nbsp${name}`;
                    // }

                    if (senderNameAddress == address) {
                      console.log("yuoii");
                      senderName = name;
                      console.log("yuoii", senderName);
                    }

                    console.log(name);
                    console.log(address);
                    console.log("---------------------");
                  }
                  console.log("yuoii", senderName);
                });
            });
        }
      });
  };

  render() {
    if (!this.state.web3) {
      pd();

      console.log("pkfpefpef");

      // return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div id="account-bg">
        <nav id="nav-bar-db">
          <ul id="nav-items-db">
            <Link to="/">
              <li id="home">Home</li>
            </Link>

            <li id="dashboard">Dashboard</li>

            <Link to="share">
              <li id="share">Start Sharing</li>
            </Link>

            <Link to="account">
              <li id="account">Your Account</li>
            </Link>
          </ul>
        </nav>

        <div id="account-box">
          <div id="acc-face"></div>

          <div id="account-info">
            <h5 id="acc-name-head">UserName</h5>
            <h4 id="acc-name">Luna</h4>

            <h5 id="acc-eth-head">Ethereum Address</h5>
            <h4 id="acc-eth">0x33e1069CC4B59D7278901dA47F688070C1455283</h4>

            <h5 id="acc-prv-head">Private Key</h5>
            <h4 id="acc-prv">0x33e1069CC4B59D7278901dA47F688070C1455283</h4>
          </div>

          <div id="files-details">
            <div id="shared-files-box">
              <h5 id="num-files-shared">Number of Files Shared</h5>
              <h3 id="count-files-shared">24</h3>
            </div>

            <div id="received-files-box">
              <h5 id="num-files-received">Number of Files Received</h5>
              <h3 id="count-files-received">11</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default YourAccount;
