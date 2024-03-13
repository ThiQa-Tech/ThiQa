//check if there is local storage
let maincolor = localStorage.getItem("color-option");
if (maincolor != null) {
    document.documentElement.style.setProperty("--main-color", maincolor);
    //check for active class
    //remove active class from all elements 
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        if (element.dataset.color == maincolor) {
            element.classList.add("active");
        }
    });
}

//random background option
let backgroundOption = true;
// variable to control background the interval
let backgroundInterval;

//check if there is local storage random background
let backgroundLocalItem = localStorage.getItem("background-option");
if (backgroundLocalItem !== null) {
    if (backgroundLocalItem == true) {
        backgroundOption = true;
    }
    else {
        backgroundOption = false;
    }

    //remove active class from all spans
    document.querySelectorAll(".random span").forEach(e => {
        e.classList.remove("active");
    });

    if (backgroundLocalItem === 'true') {
        document.querySelector(".yes").classList.add("active");
    }
    else {
        document.querySelector(".no").classList.add("active");
    }

}
// start toggle settings 

document.querySelector(".toggle-settings i").onclick = function () {
    document.querySelector(".setting-box").classList.toggle("opened");
    this.classList.toggle("fa-spin");
}

// end toggle settings 
//  change color 
const colorsli = document.querySelectorAll(".colors-list li");

colorsli.forEach(li => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        // set color on localstorage 
        localStorage.setItem("color-option", e.target.dataset.color);
        //remove active class
        Activate(e);
    });
});


//random back ground active
const optionsYesNo = document.querySelectorAll(".random span");

optionsYesNo.forEach(span => {
    span.addEventListener("click", (e) => {
        //change backgrounds

        //add to local storage

        Activate(e);

        if (e.target.dataset.background === 'Yes') {
            backgroundOption = true;
            Randomize();
            localStorage.setItem("background-option", true);

        }
        else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            backgroundLocalItem = localStorage.setItem("background-option", false);

        }
    });
});
// //select landing page element
// let landingPage = document.querySelector(".landing-page");

// function Randomize() {
//     if (backgroundOption == true) {
//         backgroundInterval = setInterval(() => {
//             let random = Math.floor(Math.random() * 5);
//             if (random != 0) {
//                 landingPage.style.backgroundImage = `url("../Images/0${random}.jpg")`;
//             }
//         }, 1000);
//     }
// }
// Randomize();



///===========================================
let OurSKills = document.querySelector(".skills");

window.onscroll = function () {
    // get offset top of skills 
    let skillsOffsetTop = OurSKills.offsetTop;

    //skills Outer Height 
    let skillsOuterHeight = OurSKills.offsetHeight;
    // window height 
    let windowHeight = this.innerHeight;

    let WindowScrollTop = this.pageYOffset;
    let OurSKillsProgress = document.querySelectorAll(".skill-box .prog span");

    if (WindowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        OurSKillsProgress.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
    else {

        OurSKillsProgress.forEach(skill => {
            skill.style.width = 0;
        });
    }
}

//create popup Image 

let OurGallaryImage = document.querySelectorAll(".gallary img");
OurGallaryImage.forEach(img => {
    img.addEventListener('click', (i) => {
        //create overlay
        let overlay = document.createElement("div");
        overlay.classList.add("popup-overlay");
        document.body.appendChild(overlay);

        //create popup box

        let popupBox = document.createElement("div");
        popupBox.classList.add("popup-box");
        //add image heading
        if (img.alt !== null) {
            //create Heading
            let imgHeading = document.createElement("h4");
            let imgText = document.createTextNode(img.alt);
            //append The text to The Heading
            imgHeading.appendChild(imgText);
            popupBox.appendChild(imgHeading);
        }
        //create close Button
        let colseButton = document.createElement("span");
        colseButton.classList.add("button");
        let closeSign = document.createTextNode("X");

        colseButton.appendChild(closeSign);
        popupBox.appendChild(colseButton);
        // add img 

        let popupImg = document.createElement("img");
        popupImg.src = img.src;
        popupBox.appendChild(popupImg);

        document.body.appendChild(popupBox);

    });

    //close popup box
    document.addEventListener("click", function (e) {
        if (e.target.className == "button") {
            //remove parent (popup-box)
            e.target.parentElement.remove();
            //remove layout 
            document.querySelector(".popup-overlay").remove();
        }
    })
});

//handle scroll functionallity
function ScrollToSomeWhere(elements)
{
    elements.forEach(ele =>
        {
            ele.addEventListener("click",(i) =>{
                //scroll into view 
                document.querySelector( `.${i.target.dataset.section}`).scrollIntoView({
                    behavior: 'smooth'
                })
                document.querySelector( `.${i.target.dataset.section}`).toggle(".active");
            });
        }); 
}

let allBullets = document.querySelectorAll(".nav-bullets .bullet");
let allLinks = document.querySelectorAll(".links a");

ScrollToSomeWhere(allBullets);
ScrollToSomeWhere(allLinks);

//handle active class functionallity

function Activate(ev)
{
    ev.target.parentElement.querySelectorAll(".active").forEach(e =>
    {
        //remove active class from all element
        e.classList.remove("active");
    });

    //add active class to target
    ev.target.classList.add("active");
};


//start toggle menue 

let toggle = document.querySelector(".toggle-menue");
let links = document.querySelector(".links");
toggle.onclick = function(e)
{
    e.stopPropagation();
    links.classList.toggle("opened");
    toggle.classList.toggle("menue-active");
}

//click any where 
document.addEventListener("click",(e) =>
{
    if(e.target !== toggle && e.target !== links)
    {
        links.classList.remove("opened");
        toggle.classList.remove("menue-active");    
    }
});


