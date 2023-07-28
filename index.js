const elID = function(eId){return document.getElementById(eId)};
const show = function(eId){return document.getElementById(eId).style.display='block'};
const hide = function(eId){return document.getElementById(eId).style.display='none'};
const elVl = function(eId){return document.getElementById(eId).value};

// holders url
const hURL = 'https://media-proxy.jeanouina.workers.dev/?url=https%3A%2F%2Fvitescan.io%2Fvs-api%2Ftoken%3FtokenId%3Dtti_22d0b205bed4d268a05dfc3c%26tabFlag%3Dholders%26pageNo%3D1';
const vURL = 'https://api.vitex.net/api/v2/market?symbol=VITC-000_VITE';
const tURL = 'https://api.vitex.net/api/v2/ticker/24hr?symbols=VITC-000_VITE';
const sURL = 'https://vite-api.thomiz.dev/supply/circulating/tti_22d0b205bed4d268a05dfc3c'
const swapURL = 'https://vite-api.thomiz.dev/tvl/vitcswap'
const stakeURL = 'https://vite-api.thomiz.dev/tvl/beefstake'
const swapvol = 'https://vitcswap-api.thomiz.dev/api/volume/tti_22d0b205bed4d268a05dfc3c'
const dURL = 'https://discord.com/api/v9/invites/vitamincoin?with_counts=true';

// JSON fetcher
async function getData(tURL){
  return await fetch(tURL).then(res => res.json());
}
// get token holders
async function holderData() {
  let holders = await getData(hURL);
  elID('tokenHolders').innerHTML = holders.data.total;
};

// get marketdata
async function marketData(){
  let market = await getData(tURL);
  console.log(market)
  let nPrice = market.data[0].closePrice;
  let cPrice = market.data[0].priceChangePercent;
  if(cPrice > 0){pChange = '▲'} else {pChange = '▼'}
  elID('nPrice').innerHTML = nPrice;
  elID('cPrice').innerHTML = pChange + ' '+ (cPrice*100).toFixed(2)+'%';
  marketData2();
};
async function marketData2(){
  let market2 = await getData(vURL);
  let volVT = +market2.data.baseVolume;
  let volVC = +market2.data.volume;
  elID('volVT24').innerHTML = volVT.toFixed(2)+' VITE';
  elID('volVC24').innerHTML = volVC.toFixed(2)+' VITC';
  console.log(market2)
}
// get vitcswap and vitcstake TVL & volume
async function util() {
  let vitcswap = await getData(swapURL)
  let vitcstake = await getData(stakeURL)
  let vol = await getData(swapvol)
  let tvlswap = +vitcswap.tvl
  let tvlstake = +vitcstake.tvl
  let volswap = +vol.volume
  elID('tvlswap').innerHTML =   '$'+tvlswap.toFixed(2);
  elID('tvlstake').innerHTML =  '$'+tvlstake.toFixed(2);
  elID('volswap').innerHTML =   '$'+volswap.toFixed(2);
}
// get supply and burn data
async function supplyData(){
  let supply = await getData(sURL);
  cirS = supply.circulating_supply;
  maxS = supply.max_supply;
  brnS = supply.total_burned;
  cirP = (cirS / maxS) * 100;
  brnP = (brnS / 1000000000) * 100;
  elID('circS').innerHTML = cirP.toFixed(2)+'%';
  elID('circD').innerHTML = (cirS/1000000).toFixed(2)+'M'+' / '+(maxS/1000000).toFixed(2)+'M'
  elID('burnS').innerHTML = brnP.toFixed(2)+'%';
  elID('burnD').innerHTML = (brnS/1000000).toFixed(2)+'M'+' / 1B'
}

// get discord data
async function dcData(){
  let dcraw = await getData(dURL);
  console.log(await dcraw);
  elID('discordMembers').innerHTML = dcraw.approximate_member_count;
}

// Loader
async function loader(){
  await dcData();
  await holderData();
  await marketData();
  await supplyData();
  await util();

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
  localStorage.setItem('screenMode','dark')
  elID('darkBtn').setAttribute('onclick','goLight()');
};
function goLight(){
  var element = document.body;
  element.classList.toggle("dark");
  localStorage.setItem('screenMode','light');
  elID('darkBtn').setAttribute('onclick','goDark()');
};
function chkMode(){
  if(!localStorage.getItem('screenMode')){
    localStorage.setItem('screenMode','light')
  } else {
    if(localStorage.getItem('screenMode') === 'light'){
      console.log('its light')
    } else {
      goDark();
    }
  }
}
chkMode();

function priceHistory(coin, base, pair, color) {
  fetch('https://api.vitex.net/api/v2/klines?symbol=VITC-000_VITE&interval=day&limit=30')
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      var pMap = [];
      var tMap = [];
      var vMap = [];

      for (let i = 0; i < json.data.c.length; i++) {
        var cDte = new Date(json.data.t[i] * 1000).toLocaleDateString("id-ID");
        var cPrc = json.data.c[i].toFixed(10);
        var cVol = json.data.t[i].toFixed(2);
        pMap.push(cPrc);
        tMap.push(cDte);
        vMap.push(cVol);
      }

      var maxV = Math.max(...pMap).toFixed(10);
      var minV = Math.min(...pMap).toFixed(10);
      var maxVc = (Math.max(...pMap) * 1.05).toFixed(10);
      var minVc = (Math.min(...pMap) * 0.95).toFixed(10);
      var ratHL = ((maxV / minV) * 100).toFixed(2);

      var tVol = json.data.v.reduce(function(a, b) { return a + b; }, 0);
      var hVol = '';
      if (tVol >= 1000000000) {
        hVol = (tVol / 1000000000).toFixed(2) + ' B';
      } else if (tVol >= 1000000) {
        hVol = (tVol / 1000000).toFixed(2) + ' M';
      } else {
        hVol = (tVol / 1000).toFixed(2) + ' K';
      }

      var xValues = tMap;
      var yValues = pMap;
      
      new Chart("pCrt", {
        type: "line",
        data: {
          labels: xValues,
          datasets: [{
            fill: true,
            lineTension: 0.1,
            backgroundColor: "#5A5A5A",
            borderColor: "#e8581c",
            data: yValues
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 4/2,
          legend: {display: false},
          scales: {
            yAxes: [
              {ticks:
                {min: Number(minV), max: Number(maxV)}
              }
            ],
          }
        }
      });
    });
};

function defData(){
  coin="VITC-000";
  base="VITE";
  pair="VITC-000_VITE";
  priceHistory(coin,base,pair);
}
defData()