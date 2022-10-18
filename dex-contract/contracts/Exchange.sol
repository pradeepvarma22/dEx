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

    event Order(
        uint256 id,
        address user,
        address tokenGet,
        uint256 amountGet,
        address tokenGive,
        uint256 amountGive,
        uint256 timestamp
    );

    event Cancel(
        uint256 id,
        address user,
        address tokenGet,
        uint256 amountGet,
        address tokenGive,
        uint256 amountGive,
        uint256 timestamp
    );

    struct _Order {
        uint256 id;
        address user;
        address tokenGet;
        uint256 amountGet;
        address tokenGive;
        uint256 amountGive;
        uint256 timestamp;
    }

    address public feeAccount;
    uint256 public feePercent;
    uint256 public ordersCount;

    // token, msg.sender, balances
    mapping(address => mapping(address => uint256)) public tokens;
    mapping(uint256 => _Order) public orders;
    mapping(uint256 => bool) public ordersCancelled;

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
        require(
            tokens[_tokenAddress][msg.sender] >= _amount,
            "insufficient amount"
        );
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

    function makeOrder(
        address _tokenGet,
        uint256 _amountGet,
        address _tokenGive,
        uint256 _amountGive
    ) public {
        require(
            getBalanceOf(_tokenGive, msg.sender) >= _amountGive,
            "insufficient amount"
        );
        ordersCount += 1;
        orders[ordersCount] = _Order(
            ordersCount,
            msg.sender,
            _tokenGet,
            _amountGet,
            _tokenGive,
            _amountGive,
            block.timestamp
        );

        emit Order(
            ordersCount,
            msg.sender,
            _tokenGet,
            _amountGet,
            _tokenGive,
            _amountGive,
            block.timestamp
        );
    }

    function cancelOrder(uint256 _id) public {
        _Order storage _order = orders[_id];
        require(msg.sender == _order.user, "unauthorized");
        require(_order.id == _id, "There is no order");
        ordersCancelled[_id] = true;
        emit Cancel(
            _order.id,
            msg.sender,
            _order.tokenGet,
            _order.amountGet,
            _order.tokenGive,
            _order.amountGive,
            block.timestamp
        );
    }
}
