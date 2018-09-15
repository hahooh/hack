var VisaStatus = artifacts.require("./VisaStatus.sol");
var Permissions = artifacts.require("./Permissions.sol");

/*
module.exports = function(deployer) {
  deployer.deploy(VisaStatus);
  deployer.link(VisaStatus, Permissions);
  deployer.deploy(Permissions);
};
*/

module.exports = function(deployer) {
    deployer.deploy(Permissions).then(function() {
        return deployer.deploy(VisaStatus, Permissions.address);
    }).then(function() { })
  	deployer.link(VisaStatus, Permissions);
};