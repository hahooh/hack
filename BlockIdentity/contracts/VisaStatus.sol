pragma solidity ^0.4.18;
import "../contracts/Permissions.sol";
contract VisaStatus {
    enum Status { CITIZEN, PERMANENT_RESIDENT, LONG_TERM_WORKER, SHORT_TERM_WORKER, STUDENT, VISITOR }
    mapping (string => Status) visaStatusFromKey;
    mapping (string => uint256) visaStatusExpiryFromKey;
    event updateStatusAndExpiry(string key, Status visaStatus,uint256 expiryDate);
    event updateExpiry(string key, uint256 expiryDate);
    address permissionsAddress;
    address owner = msg.sender;
    function VisaStatus(address _permissionsAddress) {
        permissionsAddress = _permissionsAddress;
    }
    function changeStatusAndExpiry(string key, Status newStatus, uint256 expiryDate) public returns(bool sufficient) {
        assert(uint(newStatus) != 0);
        Permissions permissionRecord = Permissions(permissionsAddress);
        Permissions.PermissionLevel accountPermission = permissionRecord.getPermissionFromAddress(owner);
        uint256 permissionExpiry = permissionRecord.getPermissionExpiryFromAddress(owner);
        if (((accountPermission ==  Permissions.PermissionLevel.SUPER ||
            accountPermission ==  Permissions.PermissionLevel.OFFICER) &&
            (permissionExpiry >= now)) ||
            permissionRecord.getFirstSuperAddress() == owner)
            {
                visaStatusFromKey[key] = newStatus;
                visaStatusExpiryFromKey[key] = expiryDate;
                emit updateStatusAndExpiry(key, newStatus, expiryDate);
                return true;
            } else {
                return false;
            }
    }
    function getStatusFromKey(string key) public view returns(Status) {
        return visaStatusFromKey[key];
    }
    function getStatusExpiryFromKey(string key) public view returns(uint256) {
        return visaStatusExpiryFromKey[key];
    }
}