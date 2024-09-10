// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract AntugrowEscrow is ReentrancyGuard {
    struct Loan {
        address investor;
        uint256 amount;
        uint256 repaidAmount;
        uint256 dueDate;
        bool isActive;
    }

    IERC20 public token;
    address public owner;
    uint256 public loanIdCounter;

    mapping(uint256 => Loan) public loans;
    mapping(address => uint256[]) public investorLoans;

    event LoanCreated(uint256 loanId, address investor, uint256 amount);
    event LoanRepaid(uint256 loanId, uint256 amount);

    constructor(address _token) {
        token = IERC20(_token);
        owner = msg.sender;
    }

    function createLoan(uint256 _amount, uint256 _duration) external nonReentrant {
        require(token.transferFrom(msg.sender, address(this), _amount), "Transfer failed");

        uint256 loanId = loanIdCounter++;
        loans[loanId] = Loan({
            investor: msg.sender,
            amount: _amount,
            repaidAmount: 0,
            dueDate: block.timestamp + _duration,
            isActive: true
        });

        investorLoans[msg.sender].push(loanId);

        emit LoanCreated(loanId, msg.sender, _amount);
    }

    function repayLoan(uint256 _loanId, uint256 _amount) external nonReentrant {
        Loan storage loan = loans[_loanId];
        require(loan.isActive, "Loan is not active");
        require(token.transferFrom(msg.sender, address(this), _amount), "Transfer failed");

        loan.repaidAmount += _amount;
        if (loan.repaidAmount >= loan.amount) {
            loan.isActive = false;
            token.transfer(loan.investor, loan.amount);
        }

        emit LoanRepaid(_loanId, _amount);
    }

    function getLoanDetails(uint256 _loanId) external view returns (Loan memory) {
        return loans[_loanId];
    }

    function getInvestorLoans(address _investor) external view returns (uint256[] memory) {
        return investorLoans[_investor];
    }

}