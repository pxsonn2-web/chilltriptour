
const translations = {
  th:{ title:"ChillTripTour", tour1:{title:"ทัวร์เกาะสมุย",description:"เพลินกับทะเลใสและดำน้ำที่เกาะสมุย"}, tour2:{title:"ทัวร์ภูเก็ต",description:"สัมผัสธรรมชาติ & วัฒนธรรมของภูเก็ต"}, book:"จองทัวร์", modalTitle:"ฟอร์มจอง", submit:"ส่งข้อมูล",searchPlaceholder:"ค้นหาแพ็คเกจทัวร์..." },
  en:{ title:"ChillTripTour", tour1:{title:"Koh Samui Tour",description:"Enjoy crystal‑clear sea and snorkeling at Koh Samui"}, tour2:{title:"Phuket Tour",description:"Experience nature & culture of Phuket"}, book:"Book Now", modalTitle:"Booking Form", submit:"Submit", searchPlaceholder:"Search tour packages..." }
};
function setLanguage(lang){
  localStorage.setItem('lang', lang);
  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(e=>{
    const keys=e.getAttribute('data-i18n').split('.');
    let v=t; keys.forEach(k=>v=v[k]);
    if(v) e.textContent=v;
  });
  document.getElementById('searchInput').placeholder = t.searchPlaceholder;
}
function filterTours(){
  const q=document.getElementById('searchInput').value.toLowerCase();
  document.querySelectorAll('.tour-card').forEach(c=>{
    c.style.display = c.getAttribute('data-name').includes(q) ? '' : 'none';
  });
}
function openBooking(tour){
  document.getElementById('bTour').value = tour;
  new bootstrap.Modal(document.getElementById('bookingModal')).show();
}
async function submitBooking(e){
  e.preventDefault();
  const payload = {
    name: document.getElementById('bName').value,
    phone: document.getElementById('bPhone').value,
    date: document.getElementById('bDate').value,
    tour: document.getElementById('bTour').value
  };
  const resp = await fetch("YOUR_WEB_APP_URL", { method: 'POST', body: new URLSearchParams(payload) });
  const data = await resp.json();
  if(data.result==="success"){
    alert("Booking sent!");
    location.reload();
  }
}
function initMap(){
  const map=new google.maps.Map(document.getElementById('map'), {center:{lat:8.5,lng:99.5},zoom:6});
  [{title:"เกาะสมุย / Koh Samui",pos:{lat:9.5120,lng:100.0137}},
   {title:"ภูเก็ต / Phuket",pos:{lat:7.8804,lng:98.3923}}]
  .forEach(loc=>new google.maps.Marker({position:loc.pos,map, title:loc.title}));
}
window.onload = () => setLanguage(localStorage.getItem('lang')||'th');
