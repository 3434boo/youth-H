let currentScreen = 'main-screen';
let screenHistory = [];
let selectedFacility = '';
let selectedTime = '';
let reservations = [];
let existingReservations = {};

function showScreen(screenId) {
  document.getElementById(currentScreen).classList.remove('active');
  screenHistory.push(currentScreen);
  currentScreen = screenId;
  document.getElementById(screenId).classList.add('active');
  if (screenId === 'datetime-screen') initializeDateTimeScreen();
}

function selectFacility(element) {
  document.querySelectorAll('.facility-card').forEach(card => card.classList.remove('selected'));
  element.classList.add('selected');
  selectedFacility = element.querySelector('.facility-name').textContent;
}

function selectTimeSlot(element) {
  if (element.classList.contains('unavailable')) return;
  document.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('selected'));
  element.classList.add('selected');
  selectedTime = element.getAttribute('data-time');
}

function initializeDateTimeScreen() {
  const today = new Date();
  const todayStr = today.toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'short'
  });
  document.getElementById('today-date').textContent = todayStr;
}

function completeReservation() {
  const name = document.getElementById('user-name').value;
  const birth = document.getElementById('user-birth').value;
  const phone = document.getElementById('user-phone').value;
  if (!name || !birth || !phone || !selectedFacility || !selectedTime) {
    alert('모든 정보를 입력해주세요.');
    return;
  }
  const date = new Date().toLocaleDateString('ko-KR');
  const reservation = { name, birth, phone, facility: selectedFacility, date, time: selectedTime };
  reservations.push(reservation);
  if (!existingReservations[selectedFacility]) existingReservations[selectedFacility] = [];
  existingReservations[selectedFacility].push(selectedTime);
  updateSuccessScreen(selectedFacility, date, selectedTime);
  showScreen('success-screen');
}

function updateSuccessScreen(facility, date, time) {
  const infoDiv = document.querySelector('#success-screen div');
  infoDiv.innerHTML = `<p><strong>시설:</strong> ${facility}</p>
    <p><strong>날짜:</strong> ${date}</p>
    <p><strong>시간:</strong> ${time}</p>`;
}
