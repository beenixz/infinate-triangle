// Firebase 구성
const firebaseConfig = {
    apiKey: "AIzaSyArMV9ooaMARHInOZxYVaiQ0d2P4OYQ798",
    authDomain: "nodap-66f4d.firebaseapp.com",
    databaseURL: "https://nodap-66f4d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "nodap-66f4d",
    storageBucket: "nodap-66f4d.firebasestorage.app",
    messagingSenderId: "644458840711",
    appId: "1:644458840711:web:eb48a7888cca24deca2e22"
};

// Firebase 초기화
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let hasParticipated = false; // 부스 참여 여부를 저장할 변수

function loginOrRegister() {
    const studentId = document.getElementById('studentId').value;

    // 데이터베이스에 학생 등록
    const studentRef = database.ref('students/' + studentId);
    studentRef.once('value', (snapshot) => {
        if (!snapshot.exists()) {
            // 학생이 등록되지 않은 경우
            studentRef.set({
                student_id: studentId
            }).then(() => {
                alert("회원가입 및 로그인 성공");
                proceedToNextStep(studentId); // 다음 단계로 진행
            }).catch((error) => {
                alert("회원가입 실패: " + error);
            });
        } else {
            // 학생이 이미 등록된 경우
            alert("로그인 성공");
            proceedToNextStep(studentId); // 다음 단계로 진행
        }
    });
}

// 다음 단계로 진행하는 함수
function proceedToNextStep(studentId) {
    document.getElementById('loginStatus').style.display = 'block';
    document.getElementById('loggedInStudentId').innerText = studentId;
    document.getElementById('boothParticipation').style.display = 'block';
}

function checkCode() {
    const boothId = document.getElementById('boothSelect').value;
    const code = document.getElementById('codeInput').value;

    // 부스 인증 코드 확인
    const boothRef = database.ref('booths/' + boothId);
    boothRef.once('value', (snapshot) => {
        if (snapshot.exists() && snapshot.val().code === code) {
            alert("부스 참여 성공");
            document.getElementById('participateButton').style.display = 'block';
        } else {
            alert("유효하지 않은 인증 코드입니다.");
        }
    });
}

function participate() {
    const boothId = document.getElementById('boothSelect').value;
    const studentId = document.getElementById('studentId').value;

    // 이미 참여한 경우
    if (hasParticipated) {
        alert("이미 부스에 참여하였습니다. 다른 부스에 참여할 수 없습니다.");
        return;
    }

    // 부스 참여 데이터 추가
    const participationRef = database.ref('booth_participation/' + studentId + '/' + boothId);
    participationRef.set({
        student_id: studentId,
        booth_id: boothId
    }).then(() => {
        alert("부스 참여 완료");
        hasParticipated = true; // 참여 상태 업데이트
        removeBoothFromSelect(boothId); // 부스 선택지에서 제거
    }).catch((error) => {
        alert("부스 참여 실패: " + error);
    });
}

// 부스 선택지에서 부스를 제거하는 함수
function removeBoothFromSelect(boothId) {
    const boothSelect = document.getElementById('boothSelect');
    const optionToRemove = boothSelect.querySelector(`option[value="${boothId}"]`);
    if (optionToRemove) {
        boothSelect.removeChild(optionToRemove);
    }
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}
