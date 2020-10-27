pragma solidity >=0.5.0;

abstract contract IMessageWall {
    function addMessage(bytes message) public virtual;
}

contract Pay {
    function send(address destinationAddress, bytes message) public {
        tvm.accept();

        // @todo Runtime calculate fee
        uint fee = 50_000_000;
        uint amount = address(this).balance - fee;

        IMessageWall(destinationAddress).addMessage.value(amount)(message);

        selfdestruct(msg.sender);
    }
}
