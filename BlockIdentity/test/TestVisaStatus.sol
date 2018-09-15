pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/VisaStatus.sol";

contract TestVisaStatus {

  function testUpdateFunctionCompletes() public {
    VisaStatus visaStatus = VisaStatus(DeployedAddresses.VisaStatus());

    bytes16 myKey = "sampleKey";
    VisaStatus.Status myStatus = VisaStatus.Status.VISITOR;
    uint myDate = 12345;

    Assert.equal(visaStatus.changeStatusAndExpiry(myKey, myStatus, myDate), true, "Update Status function should reach completion.");
  }

  function testGetStatus() public {
    VisaStatus visaStatus = new VisaStatus();

    bytes16 myKey = "sampleKey";
    VisaStatus.Status myStatus = VisaStatus.Status.VISITOR;
    uint myDate = 12345;

    visaStatus.changeStatusAndExpiry(myKey, myStatus, myDate);

    Assert.equal(uint(visaStatus.getStatusFromKey(myKey)), uint(myStatus), "After populating status, it should be read correctly");
  }

  function testGetExpiry() public {
    VisaStatus visaStatus = new VisaStatus();

    bytes16 myKey = "sampleKey";
    VisaStatus.Status myStatus = VisaStatus.Status.VISITOR;
    uint myDate = 12345;

    visaStatus.changeStatusAndExpiry(myKey, myStatus, myDate);

    Assert.equal(visaStatus.getStatusExpiryFromKey(myKey), myDate, "After populating status and expiry, expiry should be read correctly");
  }

}
