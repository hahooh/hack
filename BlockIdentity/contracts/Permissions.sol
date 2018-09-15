pragma solidity ^0.4.18;
contract Permissions {
    enum PermissionLevel { NONE, SUPER, OFFICER }
    mapping (address => PermissionLevel) permissionFromAddress;
    mapping (address => uint256) permissionExpiryFromAddress;
    event updatePermissionLevelAndExpiry(address updateAddress, PermissionLevel permission, uint256 expiryDate);

    address owner = msg.sender;
    function getFirstSuperAddress() public view returns(address) {
        return owner;
    }
    function changePermission(address updateAddress,
                                PermissionLevel permission, uint256 expiryDate) public returns(bool sufficient) {
        require(expiryDate != 0);
        if(permissionFromAddress[msg.sender] == PermissionLevel.SUPER ||
            permissionFromAddress[msg.sender] == PermissionLevel.OFFICER) {
            permissionFromAddress[updateAddress] = permission;
            permissionExpiryFromAddress[updateAddress] = expiryDate;
            emit updatePermissionLevelAndExpiry(updateAddress, permission, expiryDate);
            return true;
        } else  {
            return false;
        }
    }
    function getPermissionFromAddress(address lookupAddress) public view returns(PermissionLevel) {
        return permissionFromAddress[lookupAddress];
    }
    function getPermissionExpiryFromAddress(address lookupAddress)  public  view returns(uint256) {
        return permissionExpiryFromAddress[lookupAddress];
    }
}