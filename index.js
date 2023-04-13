async function circ() {
get0 = await fetch('https://vite-api.thomiz.dev/supply/circulating/tti_22d0b205bed4d268a05dfc3c')
get3 = await get0.json()
var circulatingSupply = get3.circulating_supply;
var maxSupply = get3.max_supply;
var percentage = (circulatingSupply / maxSupply) * 100;
var roundedPercentage = percentage.toFixed(2);
document.getElementById('circ').textContent = roundedPercentage + '%'
}
circ()
async function burn() {
get0 = await fetch('https://vite-api.thomiz.dev/supply/circulating/tti_22d0b205bed4d268a05dfc3c')
get3 = await get0.json()
var circulatingSupply = get3.total_burned;
var maxSupply = get3.max_supply;
var percentage = (circulatingSupply / maxSupply) * 100;

var roundedPercentage = percentage.toFixed(2);
document.getElementById('burn').textContent = roundedPercentage + '%'
}
burn()
async function price() {
  get0 = await fetch('https://vite-api.thomiz.dev/supply/circulating/tti_22d0b205bed4d268a05dfc3c')
  get3 = await get0.json()
  var circulatingSupply = get3.total_burned;
  var maxSupply = get3.max_supply;
  var percentage = (circulatingSupply / maxSupply) * 100;
  
  var roundedPercentage = percentage.toFixed(2);
  document.getElementById('burn').textContent = roundedPercentage + '%'
  }
  burn()
async function tess() {
    const get0 = await fetch('https://media-proxy.jeanouina.workers.dev/?url=https%3A%2F%2Fvitescan.io%2Fvs-api%2Ftoken%3FtokenId%3Dtti_22d0b205bed4d268a05dfc3c%26tabFlag%3Dholders%26pageNo%3D1');
    const get1 = await get0.json();
    document.getElementById('myParagraph').textContent = get1.data.total;
  }
tess()
function mobileMenu(){
    let mbMn = document.getElementById("mbMenu");
    if (mbMn.style.display === "block") {
      mbMn.style.display = "none";
    } else {
      mbMn.style.display = "block";
    }
  }
  function goDark(){
var element = document.body;
element.classList.toggle("dark");
};
async function price() {
  get0 = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=vitamin-coin&vs_currencies=usd')
  get3 = await get0.json()
  let pric = (get3['vitamin-coin'].usd).toFixed(5)
  document.getElementById('usd').textContent = pric
  }
  price()
