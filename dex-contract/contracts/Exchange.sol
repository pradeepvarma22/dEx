// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "hardhat/console.sol";

contract Exchange {

    address public feeAccount;

    constructor(address _feeAccount){
        feeAccount = _feeAccount;
    }

}
