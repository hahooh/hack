var VisaStatusContractABI = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "key",
                "type": "string"
            }
        ],
        "name": "getStatusFromKey",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "key",
                "type": "string"
            },
            {
                "name": "newStatus",
                "type": "uint8"
            },
            {
                "name": "expiryDate",
                "type": "uint256"
            }
        ],
        "name": "changeStatusAndExpiry",
        "outputs": [
            {
                "name": "sufficient",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "key",
                "type": "string"
            }
        ],
        "name": "getStatusExpiryFromKey",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "_permissionsAddress",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "key",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "visaStatus",
                "type": "uint8"
            },
            {
                "indexed": false,
                "name": "expiryDate",
                "type": "uint256"
            }
        ],
        "name": "updateStatusAndExpiry",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "key",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "expiryDate",
                "type": "uint256"
            }
        ],
        "name": "updateExpiry",
        "type": "event"
    }
];