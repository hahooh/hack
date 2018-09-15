function fnMove(seq) {
    var offset;
    if (seq === '1') {
        console.log(seq);
        offset = $("#inputPp").offset();
    }
    if (seq === '2') {
        offset = $("#status").offset();
    }
    if (seq === '3') {
        offset = $('#success').offset();

        $('html, body').animate({scrollTop: offset.top}, 700);

        var biometric = document.getElementById('passportBiometric').value;
        var passwordNumber = document.getElementById('passportNumber').value;
        var countryCode = document.getElementById('countryCode').value;
        var userPassword = document.getElementById('userPassword').value;
        var expireDate = document.getElementById('expireDate').value;
        var expireDateObj = new Date(expireDate);
        var status = parseInt(document.getElementById('userStatus').value);
        var hashKey = sha256(biometric + userPassword);

        $.post('http://localhost:3000', {
            passportNumber: passwordNumber + countryCode,
            hashAddress: hashKey
        }).then(function (result) {
            console.log(result);
        }).catch(function (error) {
            console.log(error);
        });

        var visaStatus = getVisaStatus();
        issueContract(visaStatus, hashKey, status, expireDateObj.getTime());
    }
    if (seq === '4') {
        offset = $('#scanPspt').offset();
    }

    $('html, body').animate({scrollTop: offset.top}, 700);
}

function view() {
    $("#passport").css("visibility", "visible");
    $("#change").css("display", "none");
}