// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Exchange {
    event DepositToken(
        address token,
        address user,
        uint256 amount,
        uint256 balance
    );

    event Withdraw(
        address token,
        address user,
        uint256 amount,
        uint256 balance
    );

    address public feeAccount;
    uint256 public feePercent;
    // token, msg.sender, balances
    mapping(address => mapping(address => uint256)) public tokens;

    constructor(address _feeAccount, uint256 _feePercent) {
        feeAccount = _feeAccount;
        feePercent = _feePercent;
    }

    function depositToken(address _tokenAddress, uint256 _amount) public {
        IERC20(_tokenAddress).transferFrom(msg.sender, address(this), _amount);
        tokens[_tokenAddress][msg.sender] += _amount;
        emit DepositToken(
            _tokenAddress,
            msg.sender,
            _amount,
            tokens[_tokenAddress][msg.sender]
        );
    }
    
    function withdrawToken(address _tokenAddress, uint256 _amount) public {
        require(tokens[_tokenAddress][msg.sender] >= _amount);
        IERC20(_tokenAddress).transfer(msg.sender, _amount);
        tokens[_tokenAddress][msg.sender] -= _amount;
        emit Withdraw(
            _tokenAddress,
            msg.sender,
            _amount,
            tokens[_tokenAddress][msg.sender]
        );
    }

    function getBalanceOf(address _token, address _user)
        public
        view
        returns (uint256)
    {
        return tokens[_token][_user];
    }
}
