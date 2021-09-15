
let customSelects, noOfCustomSelects, noOfOptions, stockSelects, selectedItem, optionList, optionItem, optionValue;
let sameAsSelected, selects, previousSibling, noOfSelects, noOfSameAsSelected;

let currentWindowWidth;
let currentWindowHeight;
let boxWidth;
let ageIsGood, employRateIsGood;

function main() {
    /* Look for any elements with the class "custom-select": */
    customSelects = document.getElementsByClassName("custom-select");
    noOfCustomSelects = customSelects.length;
    
    for (let i = 0; i < noOfCustomSelects; i++) {
        stockSelects = customSelects[i].getElementsByTagName("select")[0];
        noOfOptions = stockSelects.length;
        /* For each element, create a new DIV that will act as the selected item: */
        selectedItem = document.createElement("div");
        selectedItem.setAttribute("class", "select-selected");
        // we need a unique id for each dropdown.
        selectedItem.setAttribute("id", "answer" + i);
        selectedItem.innerHTML = stockSelects.options[stockSelects.selectedIndex].innerHTML;
        customSelects[i].appendChild(selectedItem);
        /* For each element, create a new DIV that will contain the option list: */
        optionList = document.createElement("div");
        optionList.setAttribute("class", "select-items select-hide");
      
        for (let j = 1; j < noOfOptions; j++) {
            /* For each option in the original select element,
            create a new DIV that will act as an option item: */
            optionItem = document.createElement("DIV");

            optionValue = optionItem.setAttribute("value", j);
            // get the option from the original select and make a div with that
            optionItem.innerHTML = stockSelects.options[j].innerHTML;
            optionItem.addEventListener("click", function(e) {
                /* When an item is clicked, update the original select box,
                and the selected item: */
                

                selects = this.parentNode.parentNode.getElementsByTagName("select")[0];
                noOfSelects = selects.length;
                previousSibling = this.parentNode.previousSibling;
                for (let ii = 0; ii < noOfSelects; ii++) {
                    if (selects.options[ii].innerHTML == this.innerHTML) {
                        selects.selectedIndex = ii;
                        previousSibling.innerHTML = this.innerHTML;

                        // TODO this is how we get the answer.
                        // console.log("answer" + i + ": " + this.innerHTML);
                        // it does not have a value. only a div
                        sameAsSelected = this.parentNode.getElementsByClassName("same-as-selected");
                        noOfSameAsSelected = sameAsSelected.length;
                        
                        for (let k = 0; k < noOfSameAsSelected; k++) {
                            sameAsSelected[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                }
                }
                previousSibling.click();
            });
            optionList.appendChild(optionItem);
        }
        customSelects[i].appendChild(optionList);
        selectedItem.addEventListener("click", function(e) {
            /* When the select box is clicked, close any other select boxes,
            and open/close the current select box: */
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }
    
    function closeAllSelect(elmnt) {
      /* A function that will close all select boxes in the document,
      except the current select box: */
      var selectItems, selectSelecteds, noOfCustomSelects, noOfSelectSelecteds, arrNo = [];
      selectItems = document.getElementsByClassName("select-items");
      selectSelecteds = document.getElementsByClassName("select-selected");
      noOfCustomSelects = customSelects.length;
      noOfSelectSelecteds = selectSelecteds.length;
      for (let i = 0; i < noOfSelectSelecteds; i++) {
        if (elmnt == selectSelecteds[i]) {
          arrNo.push(i)
        } else {
          selectSelecteds[i].classList.remove("select-arrow-active");
        }
      }
      for (let i = 0; i < noOfCustomSelects; i++) {
        if (arrNo.indexOf(i)) {
          selectItems[i].classList.add("select-hide");
        }
      }
    }
    
    /* If the user clicks anywhere outside the select box,
    then close all select boxes: */
    document.addEventListener("click", closeAllSelect);
    
    if (document.getElementById("answer8").innerHTML == "Yes") {
        // TODO this should show the thing
    }

    currentWindowWidth = window.innerWidth;
    currentWindowHeight = window.innerHeight;
    console.log("main is done");
}

var canvas;

 // answers for all the questions
let q1_answer, 
    q1a_answer, 
    q1b_answer, 
    q2_answer, 
    q3_answer, 
    q4_answer, 
    q5_answer, 
    q6_answer, 
    q7_answer, 
    q8_answer, 
    q9_answer, 
    q10_answer, 
    q10a_answer,
    q11_answer,
    q12_answer,
    q13_answer;
//  values for all the questions
let q1_value, 
    q1a_value, 
    q1b_value, 
    q2_value, 
    q3_value, 
    q4_value, 
    q5_value, 
    q6_value, 
    q7_value, 
    q8_value, 
    q9_value, 
    q10_value, 
    q10a_value,
    q11_value,
    q12_value,
    q13_value;

// colors
let black = (0, 0, 0);
let white = (255, 255, 255);
let grey = (100,100,100);

var theFont;
let vizIsVisible = false;
let yGrid;

let row1Y, row2Y, row3Y, row4Y, row5Y;

let vertSpacing;


let lineHeight;


let boxRounding = 40;


// boxes
let expectationBox, originBox, nope2Box, yes2Box, ageBox, 
    nope3Box, employRateBox, nope4Box, yes5Box, nope5Box;
// array to hold all boxes
let boxes;


let connectors = [];
let lines = [];

// coordinates
let centerX, centerY;


function setup() {
        // canvas = createCanvas(windowWidth, windowHeight);
        canvas = createCanvas(document.body.clientWidth, window.innerHeight);
        canvas.parent('sketch_holder');
        background(black);
        
        // currentWindowWidth = windowWidth;
        // currentWindowHeight = windowHeight;
        currentWindowWidth = document.body.clientWidth;
        currentWindowHeight = window.innerHeight;
        
        rectMode(CENTER, CENTER);
        textAlign(CENTER, CENTER);
        
        theFont = loadFont("fonts/AdobeGaramondProRegular.ttf")
        textFont(theFont);
        textSize(10 + 6 * ((currentWindowWidth - 320) / 680));
        
        yGrid = currentWindowHeight / 6;
        row1Y = yGrid;
        row2Y = yGrid * 2;
        row3Y = yGrid * 3;
        row4Y = yGrid * 4;
        row5Y = yGrid * 5;
    
        
        black = color(0, 0, 0);
        white = color(255, 255, 255);
    
        // // coordinates UTIL
        centerX = currentWindowWidth / 2;
        centerY = currentWindowHeight / 2;
        vertSpacing = currentWindowHeight / 6;
        noStroke();
        
        expectationBox = new Box("How quickly do you believe\nthat you will get a job?");
        originBox = new Box("Origin");
        nope2Box = new Box("High risk of\nlong term unemployment");
        yes2Box = new Box("Low risk of\nlong term unemployment");
        nope3Box = new Box("High risk of\nlong term unemployment");
        ageBox = new Box("Age");
        employRateBox = new Box("Employment rate");
        nope4Box = new Box("High risk of\nlong term unemployment");
        yes5Box = new Box("Low risk of\nlong term unemployment");
        nope5Box = new Box("High risk of\nlong term unemployment");    
        console.log("sketch setup done");

        displayBoxes();
}

function draw() 
{
    if (vizIsVisible) 
    {
        background(black);
        currentWindowWidth = windowWidth;
        currentWindowHeight = windowHeight;
        centerX = currentWindowWidth / 2;
        // this works.
        // resizeCanvas(currentWindowWidth, currentWindowHeight);
    
        strokeWeight(10);
        stroke(255, 0, 0);
    
        // display the things
    
        textAlign(CENTER, CENTER);
        noStroke();
        fill(white);
        // text("The STAR algorithm", centerX, 100);
    
        drawGrid();

        lineHeight = currentWindowHeight / 25;
        
        // boxWidth = 100 + 6 * ((currentWindowWidth - 320) / 680)
        boxWidth = currentWindowWidth / 6;
    
    
        // for every line
        lines[0].update();
        lines[0].display();
        if (lines[1] != null) 
        {
            if (lines[0].hasArrived) 
            {
                expectationBox.updateAnswerAlpha();
                expectationBox.displayAnswer();
    
                lines[1].update();
                lines[1].display();
            }
        }
        if (lines[2] != null) 
        {
            if (lines[1].hasArrived) 
            {
                lines[2].update();
                lines[2].display();
            }
        }
        if (lines[3] != null) 
        {
            if (lines[2].hasArrived) 
            {
                originBox.updateAnswerAlpha();
                originBox.displayAnswer();
    
                lines[3].update();
                lines[3].display();
            }
        }
        if (lines[4] != null) 
        {
            if (lines[3].hasArrived) 
            {
                ageBox.updateAnswerAlpha();
                if (ageBox.isActive) {
                    ageBox.displayAnswer();
                }
    
                lines[4].update();
                lines[4].display();
            }
        }
        if (lines[5] != null) 
        {
            if (lines[4].hasArrived) 
            {
                lines[5].update();
                lines[5].display();
            }
        }
        if (lines[6] != null) 
        {
            if (lines[5].hasArrived) 
            {
                employRateBox.updateAnswerAlpha();
                if (employRateBox.isActive) {
                    employRateBox.displayAnswer();
                }
                lines[6].update();
                lines[6].display();
            }
        }
        if (lines[7] != null) 
        {
            if (lines[6].hasArrived) 
            {
                lines[7].update();
                lines[7].display();
            }
        }
        if (lines[8] != null) 
        {
            if (lines[7].hasArrived) 
            {
                lines[8].update();
                lines[8].display();
            }
        }
        if (lines[9] != null) 
        {
            if (lines[8].hasArrived) 
            {
                lines[9].update();
                lines[9].display();
            }
        }
    }

    displayBoxes();
     
}

// This prevents the page from scrolling down to where it was previously.
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
// This is needed if the user scrolls down during page load and you want to make sure the page is scrolled to the top once it's fully loaded. This has Cross-browser support.
window.scrollTo(0,0);


// ************************ P5 ****************************
function calcPath() {
    // always start with resetting
    lines.length = 0;

    // first line is always the same
    expectationBox.isActive = true;
    lines.push(
        new Line(
            expectationBox.xpos, expectationBox.ypos,
            expectationBox.xpos, expectationBox.ypos + vertSpacing / 2
        )
    )
    
    if (expectationBox.value == "atRisk") {
        console.log("END at nope 1")
        lines.push(
            // cross -> over nopeBox
            new Line (
                expectationBox.xpos, expectationBox.ypos + vertSpacing / 2,
                nope2Box.xpos, nope2Box.ypos - vertSpacing / 2
            ), 
            // over nopeBox -> nopeBox
            new Line(
                nope2Box.xpos, nope2Box.ypos - vertSpacing / 2,
                nope2Box.xpos, nope2Box.ypos
            )
        );
        nope2Box.isActive = true;
    }
    else if (expectationBox.value == "lowRisk") {
        console.log("End at yes 1")
        lines.push(
            // cross -> over yes2Box
            new Line(
                expectationBox.xpos, expectationBox.ypos + vertSpacing / 2,
                yes2Box.xpos, yes2Box.ypos - vertSpacing / 2
            ),
            // over yes2Box -> yes2Box
            new Line(
                yes2Box.xpos, yes2Box.ypos - vertSpacing / 2,
                yes2Box.xpos, yes2Box.ypos
            )
        )
        yes2Box.isActive = true;
    }
    else if (expectationBox.value == "further") {
        console.log("going to originBox")
        lines.push(
            // cross -> originBox
            new Line(
                expectationBox.xpos, expectationBox.ypos + vertSpacing / 2,
                originBox.xpos, originBox.ypos
            ),
            // originBox -> cross
            new Line(
                originBox.xpos, originBox.ypos,
                originBox.xpos, originBox.ypos + vertSpacing / 2
            )
        )
        originBox.isActive = true;

        if (originBox.value == "atRisk") {
            lines.push(
                // cross -> over nopeBox2
                new Line(
                    originBox.xpos, originBox.ypos + vertSpacing / 2,
                    nope3Box.xpos, originBox.ypos + vertSpacing / 2
                ),
                // over nopeBox2 -> nopeBox2
                new Line(
                    nope3Box.xpos, nope3Box.ypos - vertSpacing / 2,
                    nope3Box.xpos, nope3Box.ypos
                )
            )
            nope3Box.isActive = true;
        }
        else if (originBox.value == "further") {
            lines.push(
                // cross -> ageBox
                new Line(
                    originBox.xpos, originBox.ypos + vertSpacing / 2,
                    ageBox.xpos, ageBox.ypos
                ),
                // ageBox -> cross
                new Line(
                    ageBox.xpos, ageBox.ypos, 
                    ageBox.xpos, ageBox.ypos + vertSpacing / 2
                )
            )
            ageBox.isActive = true;

            if (ageBox.value == "atRisk") {
                lines.push(
                    // cross -> over nopeBox3
                    new Line(
                        ageBox.xpos, ageBox.ypos + vertSpacing / 2,
                        nope4Box.xpos, ageBox.ypos + vertSpacing / 2
                    ),
                    // over nopeBox3 -> nopeBox3
                    new Line(
                        nope4Box.xpos, nope4Box.ypos - vertSpacing / 2,
                        nope4Box.xpos, nope4Box.ypos
                    )
                )
                nope4Box.isActive = true;
            }
            else if (ageBox.value == "further") {
                lines.push(
                    // cross -> employRateBox
                    new Line(
                        ageBox.xpos, ageBox.ypos + vertSpacing / 2,
                        employRateBox.xpos, employRateBox.ypos
                    ),
                    // employRateBox -> cross
                    new Line(
                        employRateBox.xpos,  employRateBox.ypos,
                        employRateBox.xpos, employRateBox.ypos + vertSpacing / 2
                    )
                )
                employRateBox.isActive = true;
                
                if (employRateBox.value == "atRisk") {
                    console.log("employratebox: at risk");
                    lines.push(
                        // cross -> over yes5Box
                        new Line(
                            employRateBox.xpos, employRateBox.ypos + vertSpacing / 2,
                            nope5Box.xpos, employRateBox.ypos + vertSpacing / 2
                        ),
                        // over yes5Box -> yes5Box
                        new Line (
                            nope5Box.xpos, nope5Box.ypos - vertSpacing / 2,
                            nope5Box.xpos, nope5Box.ypos
                        )
                    )

                    nope5Box.isActive = true;
                }
                else if (employRateBox.value == "lowRisk") {
                    lines.push(
                        new Line(
                            employRateBox.xpos, employRateBox.ypos + vertSpacing / 2,
                            yes5Box.xpos, employRateBox.ypos + vertSpacing / 2
                        ),
                        new Line(
                            yes5Box.xpos, yes5Box.ypos - vertSpacing / 2,
                            yes5Box.xpos, yes5Box.ypos
                        )
                    )
                    nope5Box.isActive = false;
                    yes5Box.isActive = true;
                }
            }

        }

    }
}


class Box 
{
    constructor(_text) 
    {
        this.text = _text;
        this.answerFadeSpeed = 3;
        this.ansCurrentAlpha = 0;
        
    }
    setAnswer(_answer) {
        this.answer = _answer;
    }
    setValue(_value) {
        this.value = _value;
    }

    updateAnswerAlpha() {
        if (this.ansCurrentAlpha < 255) {
            this.ansCurrentAlpha += this.answerFadeSpeed;
        }
    }

    displayAnswer() {
        noStroke();
        
        if (currentWindowWidth > 800) {
            textSize(currentWindowWidth / 70);
        }
        else {
            textSize(currentWindowWidth / 45);
        }
        
        fill(255, 255, 255, this.ansCurrentAlpha);
        textAlign(LEFT, BOTTOM);
        if (this == ageBox) {
            text("You entered: " + this.answer + " years old", this.xpos + 10, this.ypos + vertSpacing / 2 - 8);
        }
        else if (this == employRateBox) {
            text("You entered: " + this.answer + " / 36 months", this.xpos + 10, this.ypos + vertSpacing / 2 - 8);
        }
        else {
            text("You entered: " + this.answer, this.xpos + 10, this.ypos + vertSpacing / 2 - 8);
        }
    }

    
    display(_xpos, _ypos, _xsize, _ysize) {
        this.xpos = _xpos;
        this.ypos = _ypos;
        this.xsize = _xsize;
        this.ysize = _ysize;
        noStroke();
        rectMode(CENTER, CENTER);
        
        // is this an active box?
        if (this.isActive) {
            fill(white);
        }
        else {
            fill(grey);
        }
        rect(_xpos, _ypos, _xsize, _ysize, 20, 0, 0, 0);
        fill(black);
        // TODO can this be according to screenwidth?
        textAlign(CENTER, CENTER);
        // textSize(10 + 6 * ((currentWindowWidth - 320) / 680));
        if (currentWindowWidth > 800) {
            textSize(currentWindowWidth / 60);
        }
        else {
            textSize(currentWindowWidth / 40);
        }
        text(this.text, this.xpos, this.ypos);
    }
}

function drawGrid() {
    stroke(grey);
    line(
        expectationBox.xpos, expectationBox.ypos, 
        expectationBox.xpos, expectationBox.ypos + vertSpacing /2);
    line(
        expectationBox.xpos, expectationBox.ypos + vertSpacing /2, 
        originBox.xpos, originBox.ypos);
    line(
        expectationBox.xpos, expectationBox.ypos + vertSpacing /2, 
        yes2Box.xpos, yes2Box.ypos - vertSpacing / 2);
    line(
        expectationBox.xpos, expectationBox.ypos + vertSpacing /2, 
        nope2Box.xpos, nope2Box.ypos - vertSpacing / 2);
    line(
        nope2Box.xpos, nope2Box.ypos - vertSpacing / 2, 
        nope2Box.xpos, nope2Box.ypos);
    line(
        yes2Box.xpos, yes2Box.ypos - vertSpacing / 2, 
        yes2Box.xpos, yes2Box.ypos);
    line(
        originBox.xpos, originBox.ypos, 
        originBox.xpos, originBox.ypos + vertSpacing / 2);
    line(
        originBox.xpos, originBox.ypos + vertSpacing / 2, 
        ageBox.xpos, ageBox.ypos);
    line(
        originBox.xpos, originBox.ypos + vertSpacing / 2, 
        nope3Box.xpos, nope3Box.ypos - vertSpacing / 2);
    line(
        nope3Box.xpos, nope3Box.ypos - vertSpacing / 2, 
        nope3Box.xpos, nope3Box.ypos);
    line(
        ageBox.xpos, ageBox.ypos, 
        ageBox.xpos, ageBox.ypos + vertSpacing/2);
    line(
        ageBox.xpos, ageBox.ypos + vertSpacing/2, 
        nope4Box.xpos, nope4Box.ypos - vertSpacing / 2);
    line(
        nope4Box.xpos, nope4Box.ypos - vertSpacing / 2, 
        nope4Box.xpos, nope4Box.ypos);
    line(
        ageBox.xpos, ageBox.ypos + vertSpacing/2, 
        employRateBox.xpos, employRateBox.ypos);
    line(
        employRateBox.xpos, employRateBox.ypos, 
        employRateBox.xpos, employRateBox.ypos + vertSpacing / 2);
    line(
        employRateBox.xpos, employRateBox.ypos + vertSpacing / 2, 
        yes5Box.xpos, yes5Box.ypos - vertSpacing / 2);
    line(
        employRateBox.xpos, employRateBox.ypos + vertSpacing / 2, 
        nope5Box.xpos, nope5Box.ypos - vertSpacing / 2);
    line(
        yes5Box.xpos, yes5Box.ypos - vertSpacing / 2, 
        yes5Box.xpos, yes5Box.ypos);
    line(
        nope5Box.xpos, nope5Box.ypos - vertSpacing / 2, 
        nope5Box.xpos, nope5Box.ypos);

}

function displayBoxes() {
    var extraSpace = 40;
    expectationBox.display(centerX, row1Y, boxWidth + 100, 2*lineHeight);
        originBox.display(centerX, row2Y, boxWidth-20, lineHeight);
        ageBox.display(centerX, row3Y, boxWidth-20, lineHeight);
        employRateBox.display(centerX, row4Y, boxWidth + 10, lineHeight);
        nope2Box.display(centerX + width / 4, row2Y, boxWidth + extraSpace, lineHeight*2);
        yes2Box.display(centerX - width / 4, row2Y, boxWidth + extraSpace, lineHeight*2);
        nope3Box.display(centerX - width / 4, row3Y, boxWidth + extraSpace, lineHeight*2); 
        nope4Box.display(centerX + width / 4, row4Y, boxWidth + extraSpace, lineHeight*2);
        yes5Box.display(centerX - width / 5, row5Y, boxWidth + extraSpace, lineHeight*2);
        nope5Box.display(centerX + width / 5, row5Y, boxWidth + extraSpace, lineHeight*2);
}

function Line(startX, startY, endX, endY) {
    this.startX = startX;
    this.startY = startY;
    this.currentX = startX;
    this.currentY = startY;
    this.endX = endX;
    this.endY = endY;
    this.speed = 5;
    this.hasArrived = false;
    this.dir = "undecided";
    
    //  calculate length of line
    if (endX == startX) {
        this.dir = "vertical";
        this.length = abs(this.endY - this.startY);
    }
    else if (endY == startY) {
        this.length = abs(this.endX - this.startX);

        if (this.endX < this.startX) {
            this.dir = "left";
        }
        else if (this.endX > this.startX) {
            this.dir = "right";
        }
    }
    this.update = function() {
        // TODO adjust at the end to not overshoot
        if (this.dir == "vertical") {
            if (this.currentY < this.endY) {
                this.currentY += this.speed;
            }
            else {
                this.hasArrived = true;
                this.currentY = this.endY;
            }
        }
        if (this.dir == "left") {
            if (this.currentX > this.endX) {
                this.currentX -= this.speed;
            }
            else {
                this.hasArrived = true;
                this.currentX = this.endX;
            }
        }
        else if (this.dir == "right") {
            if (this.currentX < this.endX) {
                this.currentX += this.speed;
            }
            else {
                this.hasArrived = true;
                this.currentX = this.endX;
            }
        }
    }

    this.display = function() {
        
        stroke(white);
        line(this.startX, this.startY, this.currentX, this.currentY);
    }
}

// take all answers and set the values of the boxes
function setValues() {
    // set what the expectationBox needs
    expectationBox.setAnswer(document.getElementById("answer2").innerHTML);
    if (
        expectationBox.answer == "I have a new job, but I haven't started yet" || 
        expectationBox.answer == "Within 1 month" ||
        expectationBox.answer == "Within 3 months") {
            expectationBox.setValue("lowRisk");
        }
        else if (
            expectationBox.answer == "It will be more than 6 months" ||
            expectationBox.answer == "I expect to go on maternity leave soon" ||
            expectationBox.answer == "I expect to retire soon") {
                expectationBox.setValue("atRisk");
            }
            else if (
                expectationBox.answer == "Within 6 months" || 
                expectationBox.answer == "Don't know") {
                    expectationBox.setValue("further");
                }
                
                
                
    
    originBox.setAnswer(document.getElementById("answer9").innerHTML);
    if (
        originBox.answer == "Western immigrant" ||
        originBox.answer == "Western descendant" ||
        originBox.answer == "Non-western descendant") {
            originBox.setValue("atRisk");
    }
    else if (
        originBox.answer == "Danish" ||
        originBox.answer == "Non-western immigrant" ||
        originBox.answer == "Origin unknown") {
            originBox.setValue("further")
    }

    ageBox.setAnswer(document.getElementById("ageInput").value);
    if (ageBox.answer < 56) {
        ageBox.setValue("further");
    }
    else if (ageBox.answer >= 56) {
        ageBox.setValue("atRisk");
    }

    employRateBox.setAnswer(document.getElementById("employrateInput").value);
    if (employRateBox.answer != null) {
        if (employRateBox.answer < 3) {
            employRateBox.setValue("atRisk");
        }
        else if (employRateBox.answer >= 3) {
            employRateBox.setValue("lowRisk");
        }
    }

    var _boxes = [
        expectationBox,
        originBox,
        ageBox,
        employRateBox
    ];

    for (var _box of _boxes) {
        console.log(_box + ": " + _box.value);
    }

    
}

function displayViz() {
    calcPath();
    vizIsVisible = true;
}


// ************** INPUT **************
function checkAge() {
    var enteredAge = document.getElementById("ageInput").value;
    if (enteredAge > 0 && enteredAge <= 125) {
        ageIsGood = true;
    }
    else {
        ageIsGood = false;
    }
}

function checkEmployRate() {
    var enteredRate = document.getElementById("employrateInput").value;
    if (enteredRate >= 0 && enteredRate <= 36) {
        employRateIsGood = true;
    }
    else {
        employRateIsGood = false;
    }
}


function setDefaultColor() {
    document.getElementById("ageWarning").style.color = "black";
    document.getElementById("rateWarning").style.color = "black";
}


function windowResized() {
    console.log("window was resized to: " + document.body.clientWidth + " x " + document.body.clientHeight);
    calcPath();
    resizeCanvas(document.body.clientWidth, document.body.clientHeight);
 }

document.addEventListener("DOMContentLoaded", function(event) { 
    main();
});

// ************** SCROLLING **************
function scrollToSketch() {
    document.getElementById("defaultCanvas0").scrollIntoView();
}

function scrollUp() {
    
    
    if (isInViewport(document.getElementById("opening_screen"))) {
        // do nothing
        console.log("cannot scroll up from opening screen");
    }
    else if (isInViewport(document.getElementById("q1"))) {
        document.getElementById("opening_screen").scrollIntoView();
    }
    else if (isInViewport(document.getElementById("q1a"))) {
        document.getElementById("q1").scrollIntoView();
    }
    else if (isInViewport(document.getElementById("q2"))) {
        document.getElementById("q1a").scrollIntoView();
    }
    else if (isInViewport(document.getElementById("q3"))) {
        document.getElementById("q2").scrollIntoView();
    }
    else if (isInViewport(document.getElementById("q4"))) {
        document.getElementById("q3").scrollIntoView();
    }
    else if (isInViewport(document.getElementById("q5"))) {
        document.getElementById("q4").scrollIntoView();
    }
    else if (isInViewport(document.getElementById("q6"))) {
        document.getElementById("q5").scrollIntoView();
    }
    else if (isInViewport(document.getElementById("q7"))) {
        document.getElementById("q6").scrollIntoView();
    }
    else if (isInViewport(document.getElementById("q8"))) {
        document.getElementById("q7").scrollIntoView();
    }
    else if (isInViewport(document.getElementById("q9"))) {
        document.getElementById("q8").scrollIntoView();
    }
    else if (isInViewport(document.getElementById("q10"))) {
        document.getElementById("q9").scrollIntoView();
    }
    else if (isInViewport(document.getElementById("q10a"))) {
        document.getElementById("q10").scrollIntoView();
    }
    else if (isInViewport(document.getElementById("info"))) {
        if (document.getElementById("answer8").innerHTML == "Yes") {
            document.getElementById("q10a").scrollIntoView();
        }
        else {
            document.getElementById("q10").scrollIntoView();
        }
    }
    else if (isInViewport(document.getElementById("q11"))) {
        document.getElementById("info").scrollIntoView();
    }
    else if (isInViewport(document.getElementById("q12"))) {
        document.getElementById("q11").scrollIntoView();
    }
    else if (isInViewport(document.getElementById("q13"))) {
        document.getElementById("q12").scrollIntoView();
    }
    else if (isInViewport(document.getElementById("viz_screen"))) {
        document.getElementById("q13").scrollIntoView();
    }
    else if (isInViewport(document.getElementById("closing_screen"))) {
        document.getElementById("viz_screen").scrollIntoView();
    }
}

function displaySpecify() {
    var otherDifficulty = document.getElementById("otherDifficulty");
    var specifyBox = document.getElementById("specifyDifficulty");
    if (otherDifficulty.checked) {
        specifyBox.style.visibility = "visible";
    }
    else {
        specifyBox.style.visibility = "hidden";
        specifyBox.value = "";
    }
}
    
function scrollDown() {
    if (isInViewport(document.getElementById("opening_screen"))) {
        document.getElementById("q1").scrollIntoView();
    }
    else if (isInViewport(document.getElementById("q1"))) {
        document.getElementById("q1a").scrollIntoView();
    }
    else if (isInViewport(document.getElementById("q1a"))) {
        document.getElementById("q2").scrollIntoView();
    }
    else if (isInViewport(document.getElementById("q2"))) {
        document.getElementById("q3").scrollIntoView();
    }
    else if (isInViewport(document.getElementById("q3"))) {
        document.getElementById("q4").scrollIntoView();
    }
    else if (isInViewport(document.getElementById("q4"))) {
        document.getElementById("q5").scrollIntoView();
    }
    else if (isInViewport(document.getElementById("q5"))) {
        document.getElementById("q6").scrollIntoView();
    }
    else if (isInViewport(document.getElementById("q6"))) {
        document.getElementById("q7").scrollIntoView();
    }
    else if (isInViewport(document.getElementById("q7"))) {
        document.getElementById("q8").scrollIntoView();
    }
    else if (isInViewport(document.getElementById("q8"))) {
        document.getElementById("q9").scrollIntoView();
    }
    else if (isInViewport(document.getElementById("q9"))) {
        document.getElementById("q10").scrollIntoView();
    }
    else if (isInViewport(document.getElementById("q10"))) {
        if (document.getElementById("answer8").innerHTML == "Yes") {
            document.getElementById("q10a").scrollIntoView();
        }
        else {
            document.getElementById("info").scrollIntoView();
        }
    }
    else if (isInViewport(document.getElementById("q10a"))) {
        document.getElementById("info").scrollIntoView();
    }
    else if (isInViewport(document.getElementById("info"))) {
    document.getElementById("q11").scrollIntoView();
}
    else if (isInViewport(document.getElementById("q11"))) {
        document.getElementById("q12").scrollIntoView();
        // document.getElementById("ageInput").focus();
    }
    else if (isInViewport(document.getElementById("q12"))) {
        checkAge();
        if (!ageIsGood) {
            console.log("age is not good");
            displayAgeWarning();
        }
        else {
            console.log("age is good");
            document.getElementById("q13").scrollIntoView();
        }
    }
    else if (isInViewport(document.getElementById("q13"))) {
        checkEmployRate();
        if (!employRateIsGood) {
            document.getElementById("rateWarning").style.color= "white";
        }
        else {
            document.getElementById("viz_screen").scrollIntoView();
            showViz();
        }
    }
    else if (isInViewport(document.getElementById("viz_screen"))) {
        document.getElementById("closing_screen").scrollIntoView();
    }
}

function displayAgeWarning() {
    document.getElementById("ageWarning").style.color= "white";
}

function ifOnAge() {
    // console.log("scrolled");
    if (isInViewport(document.getElementById("q12"))) {
        checkAge();
    }
}

var isInViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        // bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};
function resetAll() {
    window.location.reload(true);
    document.refresh();
}