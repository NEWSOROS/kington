pragma solidity >=0.5.0;

abstract contract IMessageWall {
    function addMessage(string message) public virtual;
}

/*
 * Exception codes
 * 100 - message sender is not a wallet owner.
 * 101 - invalid transfer value.
 */
contract Kington is IMessageWall {
    uint256 owner;

    struct Post {
        uint256 balance;
        bytes message;
        uint16 count;
        uint lastPayAt;
    }

    mapping(uint256 => Post) wall;

    modifier alwaysAccept {
        tvm.accept();
        _;
    }

    modifier onlyOwner {
        require(msg.pubkey() == owner, 100);
        tvm.accept();
        _;
    }

    modifier wasPaid {
        require(msg.value > 0, 101);
        tvm.accept();
        _;
    }

    constructor() public alwaysAccept {
        owner = tvm.pubkey();
    }

    function addMessage(string message) public override wasPaid {
        bytes shortMessage = message;

        if (message.byteLength() > 120) {
            shortMessage = message.substr(0, 120);
        }

        uint256 id = tvm.hash(shortMessage);

        optional(Post) value = wall.fetch(id);

        if (value.hasValue()) {
            Post post = value.get();
            post.balance += msg.value;
            post.count++;
            post.lastPayAt = now;
            wall[id] = post;
        } else {
            wall[id] = Post(msg.value, shortMessage, 1, now);
        }
    }

    function getMessages() public view alwaysAccept returns (mapping(uint256 => Post)) {
        return wall;
    }

    function withdraw(address destinationAddress, uint128 amount) public onlyOwner {
        destinationAddress.transfer(amount);
    }

    function remove(uint256 id) public onlyOwner {
        delete wall[id];
    }
}
