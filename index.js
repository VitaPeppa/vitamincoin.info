const elID = function(eId){return document.getElementById(eId)};
const show = function(eId){return document.getElementById(eId).style.display='block'};
const hide = function(eId){return document.getElementById(eId).style.display='none'};
const elVl = function(eId){return document.getElementById(eId).value};

// holders url
const hURL = 'https://media-proxy.jeanouina.workers.dev/?url=https%3A%2F%2Fvitescan.io%2Fvs-api%2Ftoken%3FtokenId%3Dtti_22d0b205bed4d268a05dfc3c%26tabFlag%3Dholders%26pageNo%3D1';
const vURL = 'https://api.vitex.net/api/v2/market?symbol=VITC-000_VITE';
const tURL = 'https://api.vitex.net/api/v2/ticker/24hr?symbols=VITC-000_VITE';
const sURL = 'https://vite-api.thomiz.dev/supply/circulating/tti_22d0b205bed4d268a05dfc3c'

// JSON fetcher
async function getData(tURL){
  let getRaw = await fetch(tURL);
  let toJson = await getRaw.json();
  return toJson;
}
// get token holders
async function holderData() {
  let holders = await getData(hURL);
  elID('tokenHolders').innerHTML = holders.data.total;
};

// get marketdata
async function marketData(){
  let market = await getData(tURL)
  let nPrice = market.data[0].closePrice;
  let cPrice = market.data[0].priceChangePercent;
  if(cPrice > 0){pChange = '▲'} else {pChange = '▼'}
  elID('nPrice').innerHTML = nPrice;
  elID('cPrice').innerHTML = pChange + ' '+ (cPrice*100).toFixed(2)+'%';
};

// get supply and burn data
async function supplyData(){
  let supply = await getData(sURL);
  cirS = supply.circulating_supply;
  maxS = supply.max_supply;
  brnS = supply.total_burned;
  cirP = (cirS / maxS) * 100;
  brnP = (brnS / maxS) * 100;
  elID('circS').innerHTML = cirP.toFixed(2)+'%';
  elID('circD').innerHTML = (cirS/1000000).toFixed(2)+'M'+' / '+(maxS/1000000).toFixed(2)+'M'
  elID('burnS').innerHTML = brnP.toFixed(2)+'%';
  elID('burnD').innerHTML = (brnS/1000000).toFixed(2)+'M'+' / '+(maxS/1000000).toFixed(2)+'M'
}
// Loader
async function loader(){
  await holderData();
  await marketData();
  await supplyData();
};
loader();
// DOM Script
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