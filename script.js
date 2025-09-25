// DARK MODE
const btn = document.getElementById('themeToggle');
btn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  updateChartsColor();
});

// NAVIGATION
const sidebarLinks = document.querySelectorAll('.sidebar li');
const pages = document.querySelectorAll('.page');

sidebarLinks.forEach(link=>{
  link.addEventListener('click',()=>{
    sidebarLinks.forEach(l=>l.classList.remove('active'));
    link.classList.add('active');
    const section = link.getAttribute('data-section');
    pages.forEach(page=>{
      page.classList.toggle('active',page.classList.contains(section+'-page'));
    });
  });
});

// CHARTS
function getTextColor(){return document.body.classList.contains('dark') ? '#f5f5f5':'#333';}

const userGrowthCtx=document.getElementById('userGrowthChart').getContext('2d');
const engagementCtx=document.getElementById('engagementChart').getContext('2d');
let userGrowthChart=new Chart(userGrowthCtx,{
  type:'line',
  data:{labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],datasets:[{label:'Users',data:[400,550,650,500,800,600,900],borderColor:'#00d1b2',backgroundColor:'rgba(0,209,178,0.1)',tension:0.3,fill:true}]},
  options:{plugins:{legend:{labels:{color:getTextColor()}}},scales:{x:{ticks:{color:getTextColor()}},y:{ticks:{color:getTextColor()}}}}
});
let engagementChart=new Chart(engagementCtx,{
  type:'doughnut',
  data:{labels:['Twitter','Facebook','Instagram','YouTube'],datasets:[{data:[25,20,35,20],backgroundColor:['#1da1f2','#3b5998','#e1306c','#ff0000']}]},
  options:{plugins:{legend:{labels:{color:getTextColor()}}}}
});

// Analytics Page Charts
const monthlyGrowthCtx=document.getElementById('monthlyGrowth').getContext('2d');
let monthlyGrowth=new Chart(monthlyGrowthCtx,{
  type:'bar',
  data:{labels:['Jan','Feb','Mar','Apr','May','Jun'],datasets:[{label:'New Users',data:[300,450,400,600,700,800],backgroundColor:'#00d1b2'}]},
  options:{plugins:{legend:{labels:{color:getTextColor()}}},scales:{x:{ticks:{color:getTextColor()}},y:{ticks:{color:getTextColor()}}}}
});
const platformBreakdownCtx=document.getElementById('platformBreakdown').getContext('2d');
let platformBreakdown=new Chart(platformBreakdownCtx,{
  type:'pie',
  data:{labels:['Twitter','Facebook','Instagram'],datasets:[{data:[40,30,30],backgroundColor:['#1da1f2','#3b5998','#e1306c']}]},
  options:{plugins:{legend:{labels:{color:getTextColor()}}}}
});

// UPDATE CHART COLORS WHEN DARK MODE TOGGLES
function updateChartsColor(){
  [userGrowthChart,engagementChart,monthlyGrowth,platformBreakdown].forEach(chart=>{
    chart.options.plugins.legend.labels.color=getTextColor();
    if(chart.options.scales){
      if(chart.options.scales.x)chart.options.scales.x.ticks.color=getTextColor();
      if(chart.options.scales.y)chart.options.scales.y.ticks.color=getTextColor();
    }
    chart.update();
  });
}
// PowerBI style charts

const trafficStackedCtx=document.getElementById('trafficStacked').getContext('2d');
let trafficStacked=new Chart(trafficStackedCtx,{
  type:'bar',
  data:{
    labels:['Week 1','Week 2','Week 3','Week 4'],
    datasets:[
      {label:'Twitter',data:[1200,1500,1400,1800],backgroundColor:'#1da1f2'},
      {label:'Facebook',data:[1000,1300,1250,1400],backgroundColor:'#3b5998'},
      {label:'Instagram',data:[900,1100,1150,1300],backgroundColor:'#e1306c'}
    ]
  },
  options:{
    plugins:{legend:{labels:{color:getTextColor()}}},
    responsive:true,
    scales:{
      x:{stacked:true,ticks:{color:getTextColor()}},
      y:{stacked:true,ticks:{color:getTextColor()}}
    }
  }
});

const engagementTrendCtx=document.getElementById('engagementTrend').getContext('2d');
let engagementTrend=new Chart(engagementTrendCtx,{
  type:'line',
  data:{
    labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    datasets:[
      {label:'Likes',data:[400,500,600,550,700,800,900],borderColor:'#00d1b2',backgroundColor:'rgba(0,209,178,0.2)',fill:true,tension:0.3},
      {label:'Comments',data:[150,200,250,300,280,320,400],borderColor:'#ff9800',backgroundColor:'rgba(255,152,0,0.2)',fill:true,tension:0.3}
    ]
  },
  options:{
    plugins:{legend:{labels:{color:getTextColor()}}},
    responsive:true,
    scales:{
      x:{ticks:{color:getTextColor()}},
      y:{ticks:{color:getTextColor()}}
    }
  }
});

// Hook into dark mode color updates
function updateChartsColor(){
  [userGrowthChart,engagementChart,monthlyGrowth,platformBreakdown,trafficStacked,engagementTrend].forEach(chart=>{
    chart.options.plugins.legend.labels.color=getTextColor();
    if(chart.options.scales){
      if(chart.options.scales.x)chart.options.scales.x.ticks.color=getTextColor();
      if(chart.options.scales.y)chart.options.scales.y.ticks.color=getTextColor();
    }
    chart.update();
  });
}
// SPARKLINES FOR KPI CARDS
function createSparkline(id,data,color){
  const ctx=document.getElementById(id).getContext('2d');
  new Chart(ctx,{
    type:'line',
    data:{labels:data.map((_,i)=>i+1),datasets:[{data:data,borderColor:color,borderWidth:2,fill:false,pointRadius:0}]},
    options:{
      responsive:true,
      plugins:{legend:{display:false},tooltip:{enabled:false}},
      scales:{x:{display:false},y:{display:false}}
    }
  });
}

// Generate random small trend data
function sparkData(){ return Array.from({length:7},()=>Math.floor(Math.random()*10+80)); }

// Create sparklines
createSparkline('sparkRevenue',sparkData(),'#00d1b2');
createSparkline('sparkUsers',sparkData(),'#00d1b2');
createSparkline('sparkConversions',sparkData(),'#00d1b2');
createSparkline('sparkBounce',sparkData(),'#ff4d4f');

// FILTERS UPDATE CHARTS (already exist from previous step)
function updateAnalyticsCharts(){
  const data=getMockData(timeSelect.value,regionSelect.value);

  // Update stacked bar
  trafficStacked.data.datasets[0].data=data.trafficStacked.Twitter;
  trafficStacked.data.datasets[1].data=data.trafficStacked.Facebook;
  trafficStacked.data.datasets[2].data=data.trafficStacked.Instagram;

  // Update multi-line trend
  engagementTrend.data.datasets[0].data=data.engagementTrend.Likes;
  engagementTrend.data.datasets[1].data=data.engagementTrend.Comments;

  trafficStacked.update();
  engagementTrend.update();
}

// Ensure charts render when analytics page visible
if(document.querySelector('.analytics-page').classList.contains('active')){
  updateAnalyticsCharts();
}
// SPA Navigation, Dark Mode, Charts, Analytics filters, Sparklines, AI insights
// (Use previous JS code here)

// Modal Logic
const modal = document.getElementById('authModal');
const modalTitle = document.getElementById('modalTitle');
const authForm = document.getElementById('authForm');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const closeBtn = document.querySelector('.close');

loginBtn.onclick = () => { modal.style.display = 'flex'; modalTitle.textContent = 'Log In'; }
signupBtn.onclick = () => { modal.style.display = 'flex'; modalTitle.textContent = 'Sign Up'; }
closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = e => { if(e.target == modal) modal.style.display = 'none'; }

authForm.onsubmit = e => {
  e.preventDefault();
  alert(`${modalTitle.textContent} successful! (mock)`); 
  modal.style.display='none';
  authForm.reset();
}
