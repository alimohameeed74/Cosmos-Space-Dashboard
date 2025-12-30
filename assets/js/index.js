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
// 2) Main Functions
// 3) Main Logic
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
}
// 3) Main Logic of Whole Porject
init();
// =========================================