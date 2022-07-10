pragma solidity ^0.4.17;

contract CampaignList{
    address[] public camp_address;
    //create a campaign for fundraising using this function
    function createCampaign(string name1) public {
        address addr_campaign = address(new Campaign(msg.sender,name1));
        camp_address.push(addr_campaign);
    }

    //to get the address of the deployed campaigns 
    function getDeployedCampaigns() public view returns(address[] memory) {
        return camp_address;
    }
}

contract Campaign{

    struct Donor_details{
        string name;
        string message;
        address donar;
        uint amount;
        uint timestamp; 
    }

    struct Requests{
        address receiver;
        uint amount;
        uint votingPercentage;
        string reason;
        bool status;
        mapping(address => bool) voters;  
    }

    address public owner;
    string public campaign_Name;
    uint public balance;
    bool public status = false;
    
    mapping(address => bool) donors;
    mapping(address => uint) public donors_amount; 
    Requests[] public request;
    Donor_details[] public donors_details;

    constructor(address owner_add, string name) public{
        owner = owner_add;
        campaign_Name = name;
    }

    //users can donate here the amount for a campaign
    function donations(string name,string message) payable public{
        require(msg.value > 0, "Please check the amount entered");
        require(!status);
        donors_details.push(Donor_details(name,message,msg.sender,msg.value,block.timestamp));
        donors[msg.sender] = true;
        donors_amount[msg.sender] += msg.value;
        balance += msg.value;
    }

    //the function restricted to owner,  the owner creats the request asking 
    //certain amount of money from total balance and stating reason behind that 

    function CreateRequest(string memory reason, uint amount, address receiver) public restricted {
        Requests memory newRequest = Requests({
            receiver: receiver,
            amount: amount,
            votingPercentage: 0,
            reason: reason,
            status: false
        });
        request.push(newRequest); //!DO NOT TOUCH
    }

    //The function allows the users to vote and gives 1 vote to 1 donar
    //checks whether the voter is a donar or not 

    function voting(uint index) public {
        //checking whether a donar or not
        require(donors[msg.sender]);
        //checking whether voted or not 
        require(!request[index].voters[msg.sender]);
        require(!status);
        require(!request[index].status,"already sent transaction");
        request[index].voters[msg.sender] = true;
    }

    //restricted ot owner to finalize the transfer of money
    //The function checks based upon the contribution from the total amount 
    //of indivisual voters and make sure that the total percentage is more than 50
    //if yes the transaction proceeds and the request closes 
 
    function finalSubmition(uint index) public restricted{
       Requests storage req = request[index];
       uint percent = 0;
       uint amount = 0;
       address adrs;
       for(uint i = 0 ; i < donors_details.length ; ++i){
           if(req.voters[donors_details[i].donar]){
                adrs = donors_details[i].donar;
                amount = donors_details[i].amount;
                uint p = amount * 100;
                percent = percent + p/balance;
           }
       }
       req.votingPercentage = percent; 
       require(percent > 50, "not enough percentage");
       require(!req.status,"already sent transaction");
       req.receiver.transfer((req.amount));
       balance -= req.amount;
       req.status = true;
    }
    
     function VoteOrnot(uint index,address add) view public returns(bool){
        Requests storage req  = request[index];
        return req.voters[add];
    }

    function getDonarDetailsLength() view public returns(uint){
        return donors_details.length;
    }

    function getRequestLength() view public returns(uint){
        return request.length;
    }

    //the function to close the contract completly and owner have rights to do
    function closeCamplaign() public restricted{
        require(balance == 0,"the balance is not equal to 0");
        status = true;
    }

    function summary() public view returns (
        address , string , uint
    ) {
        return (
            owner,
            campaign_Name,
            balance
        );   
    }

    modifier restricted(){
        require(msg.sender == owner);
        _;
    }

}
