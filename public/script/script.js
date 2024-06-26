const notices = [
  '첫 번째 공지',
  '두 번째 공지',
  '세 번째 공지'
];

let currentNoticeIndex = 0;

function showNotice(index) {
  const noticeContent = document.querySelector('.notice-content');
  noticeContent.textContent = notices[index];
}

document.getElementById('prevNotice').addEventListener('click', () => {
  currentNoticeIndex = (currentNoticeIndex - 1 + notices.length) % notices.length;
  showNotice(currentNoticeIndex);
});

document.getElementById('nextNotice').addEventListener('click', () => {
  currentNoticeIndex = (currentNoticeIndex + 1) % notices.length;
  showNotice(currentNoticeIndex);
});

setInterval(() => {
  currentNoticeIndex = (currentNoticeIndex + 1) % notices.length;
  showNotice(currentNoticeIndex);
}, 4000);

showNotice(currentNoticeIndex);


const rankingList = document.getElementById('rankingList');
const nextRankButton = document.getElementById('nextRank');
let currentRank = 1;

function updateRank() {
  const items = rankingList.getElementsByTagName('li');
  for (let i = 0; i < items.length; i++) {
    if (i === currentRank - 1) {
      items[i].style.display = 'block'; 
    } else {
      items[i].style.display = 'none'; // 나머지 항목은 숨김
    }
  }
}

nextRankButton.addEventListener('click', () => {
  currentRank = (currentRank % 10) + 1; 
  updateRank();
});

// 자동으로 순위 업데이트
setInterval(() => {
  currentRank = (currentRank % 10) + 1; 
  updateRank();
}, 4000);

updateRank();
