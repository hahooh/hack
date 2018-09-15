function fnMove(seq) {
    var offset;
    if (seq === '1') {
        offset = $("#status").offset();
    }
    if (seq === '2') {
        offset = $('#success').offset();

        var hashAddress = document.getElementById('passport').value;
        var currentStatus = document.getElementById('userStatus').value;
        var expireDate = document.getElementById('expireDate').value;
        var expireDateObj = new Date(expireDate);

        var visaStatus = getVisaStatus();
        updateContract(visaStatus, hashAddress, currentStatus, expireDateObj.getTime());
    }
    if (seq === '3') {
        offset = $('#inputPp').offset();
    }
    $('html, body').animate({scrollTop: offset.top}, 700);
}

$.get('http://localhost:3000')
    .then(function (result) {
        var options = '';
        result.forEach(function (passport) {
            options += '<option value="' + passport.HashAddress + '">' + passport.PassportNumber + '</option>';
        });
        document.getElementById('passport').innerHTML = options;
    })
    .catch(function (error) {
        console.log(error);
    });

