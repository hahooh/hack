function fnMove(seq) {
    var offset;
    if (seq === '1') {
        offset = $("#inputPp").offset();
    }
    if (seq === '2') {
        offset = $("#status").offset();

        var biometric = document.getElementById('biometric').value;
        var password = document.getElementById('password').value;
        var hashKey = sha256(biometric + password);
        var visaStatus = getVisaStatus();
        var expiryTimeStamp = getExpireTimeStamp(visaStatus, hashKey);
        var statusCode = getStatusCode(visaStatus, hashKey);
        var expiryDate = new Date(expiryTimeStamp);
        var today = new Date();
        var status = ['Citizen', 'Permanent Resident', 'Long term worker', 'short term worker', 'student', 'visitor'];
        var statusContainer = document.getElementById('statusVisa');
        var expiryDateContainer = document.getElementById('expiryDate');

        var statusString = status[statusCode - 1];
        if (statusCode === 0) {
            statusString = 'UNDEFINED';
        }

        var expireReadable = readableTimeString(expiryDate);
        var nowReadable = readableTimeString(today);
        var caseToday = false;
        if (expireReadable === nowReadable) {
            caseToday = true;
        }
        var isExpired = caseToday ? false : expiryDate < today;

        var expireTimeString = expireReadable + ' (' + (isExpired ? 'expired' : 'valid') + ')';
        if (expiryTimeStamp === 0) {
            expireTimeString = 'INVALID';
        }

        statusContainer.innerText = '';
        statusContainer.innerText = statusString;
        expiryDateContainer.innerText = '';
        expiryDateContainer.innerText = expireTimeString;
    }

    $('html, body').animate({scrollTop: offset.top}, 700);
}

function readableTimeString(time) {
    return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
}