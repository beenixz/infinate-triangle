function loginOrRegister() {
    const studentId = document.getElementById('studentId').value;
    
    fetch('index.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `student_id=${studentId}`
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('loginStatus').style.display = 'block';
        document.getElementById('loggedInStudentId').innerText = studentId;
        alert(data); // 서버 응답 메시지 표시
        document.getElementById('boothParticipation').style.display = 'block';
    })
    .catch(error => console.error('Error:', error));
}

function checkCode() {
    const boothId = document.getElementById('boothSelect').value;
    const code = document.getElementById('codeInput').value;
    const studentId = document.getElementById('studentId').value;

    fetch('index.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `booth_id=${boothId}&code=${code}&student_id=${studentId}`
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // 서버 응답 메시지 표시
        if (data.includes("부스 참여 성공")) {
            document.getElementById('participateButton').style.display = 'block';
        }
    })
    .catch(error => console.error('Error:', error));
}

function participate() {
    const boothId = document.getElementById('boothSelect').value;
    const studentId = document.getElementById('studentId').value;

    fetch('index.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `booth_id=${boothId}&student_id=${studentId}`
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // 서버 응답 메시지 표시
    })
    .catch(error => console.error('Error:', error));
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}
