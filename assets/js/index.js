"use strict"
// =========================================
// API Documentation
// https://tinyurl.com/cosmos-docs
const apiKey='GODw1jxABAeKpmtcqmGfOg2JBmn63CmqhdiUqidT'
// =========================================
// =========================================
// Sidebar Section
// 1) Main Variables
let sidebar = document.querySelector('#sidebar');
let overlay = document.getElementById('overlay');
let navLinks = document.querySelectorAll('#sidebar a');
let sections = document.querySelectorAll('#main-content section');
// 2) Main Functions
function openSideBar(){
    sidebar.classList.add('sidebar-open');
    overlay.classList.add('sidebar-overlay');
}
function closeSideBar(){
    sidebar.classList.remove('sidebar-open');
    overlay.classList.remove('sidebar-overlay');
}
function resetAllLinks(){
    navLinks.forEach( (navlink) => {
        navlink.classList.remove('text-blue-400','bg-blue-500/10');
        navlink.classList.add('text-slate-300','hover:bg-slate-800');
    });
}
function resetAllSections(){
    sections.forEach( (section) => {
        section.classList.add('hidden');
    });
}
function showSection(dataSection){
    resetAllSections();
    sections.forEach( (section) => {
        if (section.getAttribute('id') === dataSection){
            section.classList.remove('hidden');
        }
    });
}
// 3) Main Logic
navLinks.forEach( (navlink) => {
    navlink.addEventListener('click',function(e){
        resetAllLinks();
        e.currentTarget.classList.add('text-blue-400','bg-blue-500/10');
        e.currentTarget.classList.remove('text-slate-300','hover:bg-slate-800');
        showSection(e.currentTarget.getAttribute('data-section'));
        closeSideBar();
    });
})
// =========================================
// =========================================
// Header Section
// 1) Main Variables
let sidebarToggle = document.querySelector('#header #sidebar-toggle');
// 2) Main Functions
// 3) Main Logic
sidebarToggle.addEventListener('click',openSideBar);
document.addEventListener('click', function(e){
    if(!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)){
        closeSideBar();
    }
});

// =========================================
// =========================================
// Today-In-Space Section
// 1) Main Variables
let pictureDate = document.getElementById("picture-date");
let apodDateInput = document.getElementById("apod-date-input");
let loadDateBtn = document.getElementById("load-date-btn");
let todayApodBtn = document.getElementById("today-apod-btn");
let apodImage = document.getElementById("apod-image");
let apodImageFullHd = document.getElementById("apod-image-full-hd");
let apodTitle = document.querySelector("#today-in-space #apod-title");
let apodDateDetail = document.querySelector("#today-in-space #apod-date-detail");
let apodExplanation = document.querySelector("#today-in-space #apod-explanation");
let apodCopyright = document.querySelector("#today-in-space #apod-copyright");
let apodDateInfo = document.querySelector("#today-in-space #apod-date-info");
let apodMediaType = document.querySelector("#today-in-space #apod-media-type");
let apodLoader = document.querySelector("#today-in-space #apod-loading");
// 2) Main Functions
function displayData(data){
    if (data.url == undefined){ // To not to make any error
        data.url="";
        data.hdurl="";
        apodLoader.classList.remove('hidden');
        apodLoader.innerHTML = `
        <i class="fa-solid text-4xl text-red-400 mb-4 fa-triangle-exclamation"></i>
        <p class="text-slate-400">Failed to load image</p>
        `
        apodImage.classList.add('hidden');
        apodImageFullHd.classList.add('hidden');
    }
    else{
        apodLoader.classList.add('hidden');
        apodImage.classList.remove('hidden');
        apodImageFullHd.classList.remove('hidden');
    }
    pictureDate.innerHTML = getDateFormat2(data.date, 'long');
    apodImage.setAttribute('src',data.url);
    apodImageFullHd.setAttribute('href',data.hdurl);
    apodTitle.innerHTML = data.title;
    apodCopyright.innerHTML = `${ (data.copyright) ? `&copy; Copyright: ${data.copyright}` :  "" } `
    apodDateDetail.innerHTML = `<i class="far fa-calendar mr-2"></i>${getDateFormat2(data.date, 'long')}</span>`
    apodMediaType.innerHTML = data.media_type;
    apodExplanation.innerHTML = data.explanation;
    apodDateInfo.innerHTML = getDateFormat2(data.date, 'long')
}
async function getAstronomyPicture(apiKey,date=0){
    try{
        apodLoader.classList.remove('hidden');
        apodLoader.innerHTML = `
        <i
        class="fas fa-spinner fa-spin text-4xl text-blue-400 mb-4"
        ></i>
        <p class="text-slate-400">Loading today's image...</p>
        `
        apodImage.classList.add('hidden');
        apodImageFullHd.classList.add('hidden');
        let respone = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}${ (date) ? `&date=${date}` : ''}`
        ,{method: 'GET',});
        if (!respone.ok){
            throw new Error('Problem happened when getting data')
        }

        let data= await respone.json();
        displayData(data);
    }
    catch (error){
        console.log(error.message);
    }
}
// 3) Main Logic
todayApodBtn.addEventListener('click', function(e){
    let todayDate = new Date();
    apodDateInput.nextElementSibling.innerHTML = getDateFormat2(todayDate);
    getAstronomyPicture(apiKey);
});
loadDateBtn.addEventListener('click', function(){
    let date = apodDateInput.value;
    if (date == ''){
        let todayDate = new Date();
        apodDateInput.nextElementSibling.innerHTML = getDateFormat2(todayDate);
        getAstronomyPicture(apiKey);
    }
    else{
        getAstronomyPicture(apiKey,date);
    }
});
apodDateInput.addEventListener('change', function(e){
    e.currentTarget.nextElementSibling.innerHTML = getDateFormat2(e.currentTarget.value);
});

// =========================================
// =========================================
// Launches Section
// 1) Main Variables
// 2) Main Functions
// 3) Main Logic
// =========================================
// =========================================
// Planets Section
// 1) Main Variables
let planets = document.querySelectorAll('#planets #planets-grid .planet-card');
let planetDetailImage = document.querySelector('#planets #planet-detail-image');
let planetDetailName = document.querySelector('#planets #planet-detail-name');
let planetDetailDescription = document.querySelector('#planets #planet-detail-description');
let planetDistance = document.querySelector('#planets #planet-distance');
let planetRadius = document.querySelector('#planets #planet-radius');
let planetMass = document.querySelector('#planets #planet-mass');
let planetDensity = document.querySelector('#planets #planet-density');
let planetOrbitalPeriod = document.querySelector('#planets #planet-orbital-period');
let planetRotation = document.querySelector('#planets #planet-rotation');
let planetMoons = document.querySelector('#planets #planet-moons');
let planetGravity = document.querySelector('#planets #planet-gravity');
let planetDiscoverer = document.querySelector('#planets #planet-discoverer');
let planetDiscoveryDate = document.querySelector('#planets #planet-discovery-date');
let planetBodyType = document.querySelector('#planets #planet-body-type');
let planetVolume = document.querySelector('#planets #planet-volume');
let planetFacts = document.querySelectorAll('#planets #planet-facts li span');
let planetPerihelion = document.querySelector('#planets #planet-perihelion');
let planetAphelion = document.querySelector('#planets #planet-aphelion');
let planetEccentricity = document.querySelector('#planets #planet-eccentricity');
let planetInclination = document.querySelector('#planets #planet-inclination');
let planetAxialTilt = document.querySelector('#planets #planet-axial-tilt');
let planetTemp = document.querySelector('#planets #planet-temp');
let planetEscape = document.querySelector('#planets #planet-escape');

let filteredPlanet={};
let allPlanets=[];
// 2) Main Functions
function toMillionKm(value){
  if(typeof value !== "number") return "Invalid number";
  return `${(value / 1_000_000).toFixed(1)}M km`;
}

function formatNumber(value){
  if(typeof value !== "number") return "Invalid number";
  return `${value.toLocaleString()} km`; 
}

function formatMass(obj){
  if(!obj || typeof obj.massValue !== "number" || typeof obj.massExponent !== "number"){
    return "Invalid mass object";
  }
  return `${obj.massValue} × 10^${obj.massExponent} kg`;
}

function formatDensityValue(value){
  if(typeof value !== "number") return "Invalid number";
  return `${value} g/cm³`;
}

function formatDays(days) {
    return `${days.toFixed(2)} days`;
}

function formatHours(hours) {
    return `${hours.toFixed(2)} hours`;
}

function formatGravity(value) {
    return `${value.toFixed(2)} m/s²`;
}

function formatVolume(volObj) {
  if (
    typeof volObj !== "object" ||
    typeof volObj.volValue !== "number" ||
    typeof volObj.volExponent !== "number"
  ) {
    return "Invalid input";
  }
  return `${volObj.volValue} × 10^${volObj.volExponent} km³`;
}

function formatDegree(value) {
  if (typeof value !== "number") return "Invalid number";
  return `${value.toFixed(2)}°`;
}

function formatCelsius(value) {
  if (typeof value !== "number") return "Invalid number";
  return `${value.toFixed(0)}°C`;
}

function formatSpeedKmPerSec(value) {
  if (typeof value !== "number") return "Invalid number";
  const kmPerSec = value / 1000;
  return `${kmPerSec.toFixed(2)} km/s`;
}

function displayPlanetDetails(planet){
    planetDetailImage.setAttribute('src', planet.image);
    planetDetailName.innerHTML = planet.englishName;
    planetDetailDescription.innerHTML = planet.description;
    planetDistance.innerHTML = toMillionKm(planet.semimajorAxis);
    planetRadius.innerHTML = formatNumber(planet.meanRadius);
    planetMass.innerHTML = formatMass(planet.mass);
    planetDensity.innerHTML = formatDensityValue(planet.density);
    planetOrbitalPeriod.innerHTML = formatDays(planet.sideralOrbit);
    planetRotation.innerHTML = formatHours(planet.sideralRotation);
    planetMoons.innerHTML = (planet.moons) ? planet.moons.length : 0;
    planetGravity.innerHTML = formatGravity(planet.gravity);
    planetDiscoverer.innerHTML = (planet.discoveredBy) ? planet.discoveredBy : 'Known since antiquity';
    planetDiscoveryDate.innerHTML = (planet.discoveryDate) ? planet.discoveryDate : 'Ancient times';
    planetBodyType.innerHTML = planet.bodyType;
    planetVolume.innerHTML = formatVolume(planet.vol);
    let quickFactsObj ={
        mass: `Mass: ${formatMass(planet.mass)}`,
        gravity: `Surface gravity: ${formatGravity(planet.gravity)}`,
        density: `Density: ${formatDensityValue(planet.density)}`,
        axialTilt: `Axial tilt: ${formatDegree(planet.axialTilt)}`
    };
    let c=0;
    for (let fact of planetFacts){
        fact.innerHTML = Object.values(quickFactsObj)[c];
        c++;
    }
    planetPerihelion.innerHTML = toMillionKm(planet.perihelion);
    planetAphelion.innerHTML = toMillionKm(planet.aphelion),
    planetEccentricity.innerHTML = planet.eccentricity,
    planetInclination.innerHTML = formatDegree(planet.inclination),
    planetAxialTilt.innerHTML = formatDegree(planet.axialTilt),
    planetTemp.innerHTML = formatCelsius(planet.avgTemp),
    planetEscape.innerHTML = formatSpeedKmPerSec(planet.escape)
}

async function getAllPlanets() {
    try{
        let response = await fetch('https://solar-system-opendata-proxy.vercel.app/api/planets');
        if (!response.ok){
            throw new Error('Problem happened when getting planets');
        }
        let data = await response.json();
        allPlanets = data.bodies;
        console.log(allPlanets);
        getPlanet();
    }
    catch(error){
        console.log(error.message);
    }
}
function getPlanet(planetId='terre'){
    let filteredPlanet={};
    filteredPlanet = allPlanets.find(planet => planet.id === planetId);
    displayPlanetDetails(filteredPlanet);
}
// 3) Main Logic
planets.forEach( (planet) => {
    planet.addEventListener('click',function(e){
        getPlanet(e.currentTarget.getAttribute('data-planet-id'));
});
});
// =========================================
// =========================================
// Shared Functions
function getDateFormat1(input){ // 2025-04-01
    let day = input.getDate() < 10 ? "0" + input.getDate() : input.getDate();
    let month = input.getMonth() + 1 < 10 ? "0" + (input.getMonth() + 1) : input.getMonth() + 1;
    let year = input.getFullYear();
    return `${year}-${month}-${day}`;
}
function getDateFormat2(input,n='short'){ //  April 1, 2025
    let selectedDate = new Date(input);
    let options = { year: "numeric", month: `${n}`, day: "numeric" };
    let formatted = selectedDate.toLocaleDateString("en-US", options);
    return formatted;
}
// =========================================
// =========================================
// 2) Main Functions of Whole Porject
function init(){
    let todayDate = new Date();
    apodDateInput.setAttribute('max',getDateFormat1(todayDate));
    apodDateInput.setAttribute('value',getDateFormat1(todayDate));
    apodDateInput.nextElementSibling.innerHTML = getDateFormat2(todayDate);
    getAstronomyPicture(apiKey);
    showSection('today-in-space');
    document.querySelector('#sidebar a').classList.remove('text-slate-300','hover:bg-slate-800');
    document.querySelector('#sidebar a').classList.add('text-blue-400','bg-blue-500/10');
    closeSideBar();
    getAllPlanets();
}
// 3) Main Logic of Whole Porject
init();
// =========================================