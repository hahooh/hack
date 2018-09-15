function getVisaStatus() {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
    }

    web3.eth.defaultAccount = web3.eth.accounts[0];
    var VisaStatusContract = web3.eth.contract(VisaStatusContractABI);
    return VisaStatusContract.at("0xf25186b5081ff5ce73482ad761db0eb0d25abfbf");
}

function updateContract(VisaStatus, hashAddress, currentStatus, expireDate) {
    console.log(VisaStatus);
    VisaStatus.changeStatusAndExpiry(hashAddress, currentStatus, expireDate);
}

function issueContract(VisaStatus, hashAddress, currentStatus, expireDate) {
    updateContract(VisaStatus, hashAddress, currentStatus, expireDate);
}

function getExpireTimeStamp(VisaStatus, hashKey) {
    return parseInt(VisaStatus.getStatusExpiryFromKey.call(hashKey));
}

function getStatusCode(VisaStatus, hashKey) {
    return parseInt(VisaStatus.getStatusFromKey(hashKey));
}