/* 
Brugeren skal handle i blinde. Træet skal først være synligt til til sidst. 
der skal både være mulighed for multiple choice og text/number input.
to sider. Skal de begge være artsy eller er det kun vis, der skal være det?
Skal den første være tør, eller skal det også være artsy.

Der skal være en boks til at starte med, hvor der står:
Dette er et kunstprojekt. Intet bliver logget. Du bliver spurgt om personfølsomme data.
Intet af dette bliver logget eller brugt til andet end din egen oplevelse lige nu og her.
*/

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

// coordinates
let centerX, centerY;

let lineHeight = 30;


let boxRounding = 40;


// boxes
let expectationBox, originBox, nope2Box, yes2Box, ageBox, 
    nope3Box, employRateBox, nope4Box, yes5Box, nope5Box;
// array to hold all boxes
let boxes;

// connectors
let connectFirstOrigin;
let connectFirstYes;
let connectFirstNope;
let connectors = [];
let lines = [];

function setup() {
    console.log("sketch setup running");
    createCanvas(windowWidth, windowHeight);
    
    rectMode(CENTER, CENTER);
    textAlign(CENTER, CENTER);
    
    theFont = loadFont("./fonts/EbGaramondSmallcaps12Regular-XBAZ.ttf")
    textFont(theFont);
    textSize(25);
    
    yGrid = windowHeight / 6;
    row1Y = yGrid;
    row2Y = yGrid * 2;
    row3Y = yGrid * 3;
    row4Y = yGrid * 4;
    row5Y = yGrid * 5;

    
    black = color(0, 0, 0);
    white = color(255, 255, 255);

    // coordinates UTIL
    centerX = windowWidth / 2;
    centerY = windowHeight / 2;
    vertSpacing = windowHeight / 6;
    
    // instantiate the boxes
    expectationBox = new Box(
        centerX, row1Y, 400, 2*lineHeight, 
        "how quickly do you believe\nthat you will get a job?", 
        "2_dropdown");
    
    originBox = new Box(
        centerX, row2Y, 200, lineHeight, 
        "Origin", 
        "11_dropdown");
    
    nope2Box = new Box(
        centerX + width / 4, row2Y, 300, lineHeight*2, 
        "High risk of\nlong term unemployment");
    yes2Box = new Box(
        centerX - width / 4, row2Y, 300, lineHeight*2, 
        "Low risk of\nlong term unemployment");
    
    
    nope3Box = new Box(
        centerX - width / 4, row3Y, 300, lineHeight*2, 
        "High risk of\nlong term unemployment");
    ageBox = new Box(
        centerX, row3Y, 200, lineHeight, 
        "Age", 
        "12_input");
    
    employRateBox = new Box(
        centerX, row4Y, 200, lineHeight, 
        "employment rate", 
        "13_dropdown");
    nope4Box = new Box(
        centerX + width / 4, row4Y, 300, lineHeight*2, 
        "High risk of\nlong term unemployment");
    
    yes5Box = new Box(
        centerX - width / 5, row5Y, 300, lineHeight*2, 
        "Low risk of\nlong term unemployment");
    nope5Box = new Box(
        centerX + width / 5, row5Y, 300, lineHeight*2, 
        "High risk of\nlong term unemployment");
    
    boxes = new Array(
        expectationBox, 
        originBox, 
        nope2Box, 
        yes2Box, 
        ageBox,
        nope3Box,
        employRateBox,
        nope4Box,
        yes5Box,
        nope5Box
    );
}

function draw() {
    if (vizIsVisible) {
        
        background(black);

        strokeWeight(10);
    
        // display the things
        drawGrid();
        // calcPath();

        textAlign(CENTER, CENTER);
        noStroke();
        textSize(60);
        fill(white);
        text("The STAR algorithm", centerX, 100);
    
        // for every line
        lines[0].update();
        lines[0].display();
        if (lines[1] != null) {
            if (lines[0].hasArrived) {
                expectationBox.updateAnswerAlpha();
                expectationBox.displayAnswer();

                lines[1].update();
                lines[1].display();
            }
        }
        if (lines[2] != null) {
            if (lines[1].hasArrived) {
                lines[2].update();
                lines[2].display();
            }
        }
        if (lines[3] != null) {
            if (lines[2].hasArrived) {
                originBox.updateAnswerAlpha();
                originBox.displayAnswer();

                lines[3].update();
                lines[3].display();
            }
        }
        if (lines[4] != null) {
            if (lines[3].hasArrived) {
                ageBox.updateAnswerAlpha();
                ageBox.displayAnswer();

                lines[4].update();
                lines[4].display();
            }
        }
        if (lines[5] != null) {
            if (lines[4].hasArrived) {
                lines[5].update();
                lines[5].display();
            }
        }
        if (lines[6] != null) {
            if (lines[5].hasArrived) {
                employRateBox.updateAnswerAlpha();
                employRateBox.displayAnswer();
                lines[6].update();
                lines[6].display();
            }
        }
        if (lines[7] != null) {
            if (lines[6].hasArrived) {
                lines[7].update();
                lines[7].display();
            }
        }
        if (lines[8] != null) {
            if (lines[7].hasArrived) {
                lines[8].update();
                lines[8].display();
            }
        }
        if (lines[9] != null) {
            if (lines[8].hasArrived) {
                lines[9].update();
                lines[9].display();
            }
        }
        
        for (const box of boxes) {
            box.display();
            if (mouseX > box.xpos - box.xsize / 2 && mouseX < box.xpos + box.xsize / 2) {
                {
                    if (mouseY > box.ypos - box.ysize / 2 && mouseY < box.ypos + box.ysize / 2) {
                        rectMode(CORNER, CORNER);
                        fill(white, 100);
                        rect(mouseX, mouseY, 200, 100, 20);
                    }
                }
            }
        }

    }
}

// This prevents the page from scrolling down to where it was previously.
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
// This is needed if the user scrolls down during page load and you want to make sure the page is scrolled to the top once it's fully loaded. This has Cross-browser support.
window.scrollTo(0,0);



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
                    yes5Box.isActive = true;
                }
            }

        }

    }
    console.log("number of lines: " + lines.length);
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
// TODO this is where it breaks
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

function showViz() {
    setAllAnswers();
    calcPath();
    document.getElementById("defaultCanvas0").scrollIntoView();
    vizIsVisible = true;
}

class Box 
{
    constructor(_xpos, _ypos, _xsize,_ysize, _text, q) 
    {
        this.xpos = _xpos;
        this.ypos = _ypos;
        this.xsize = _xsize;
        this.ysize = _ysize;
        this.text = _text;
        this.element = q;
        this.answerFadeSpeed = 3;
        this.ansCurrentAlpha = 0;
        
        // this.ansBox = new AnswerBox(this, this.answer, _xpos + 200, _ypos + 200);
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
        textSize(20);
        fill(255, 255, 255, this.ansCurrentAlpha);
        textAlign(LEFT, BOTTOM);
        text(this.answer, this.xpos + 10, this.ypos + vertSpacing / 2 - 10);
    }

    
    display() {
        noStroke();
        rectMode(CENTER, CENTER);
        
        // is this an active box?
        if (this.isActive) {
            fill(white);
        }
        else {
            fill(grey);
        }
        rect(this.xpos, this.ypos, this.xsize, this.ysize, boxRounding, 1);
        fill(black);
        // TODO can this be according to screenwidth?
        textAlign(CENTER, CENTER);
        textSize(20);
        text(this.text, this.xpos, this.ypos);

        // this.ansBox.display();
    }
}

function debug() {
    for (box of boxes) {
        if (box.answer != null) {
            fill(white);
            text(box.answer, box.xpos + box.xsize / 2, box.ypos);
        }
    }
    // for (var i = 0 ; i < lines.length ; i++) {
    //     if (lines[i].hasArrived) {
    //         lines[i].color = (255, 0, 0);
    //     }
    // }
}

function setAllAnswers() {
    set_q2();
    set_q11();
    set_q12();
    set_q13();
    // showViz();
}

class AnswerBox {
    constructor(parentBox, answer, xpos, ypos) {
        this.parentBox = parentBox;
        this.answer = answer;
        this.xpos = xpos;
        this.ypos = ypos;
        this.startAlpha = 0;
        this.endAlpha = 255;
        this.currentAlpha = 0;

        this.trigger = get(this.xpos - 30, this.ypos);
    }


    update() {
        if (this.currentAlpha < 255) {
            this.currentAlpha += 5;
        }
    }

    display() {
        fill(255, 0, 0);
        text(this.answer, this.xpos, this.ypos);
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

function getSelectedText(elementId) {
    var element = document.getElementById(elementId);

    if (element.selectedIndex == -1) {
        return null;
    }
    else {
        return element.options[element.selectedIndex].text;
    }
}

function goToQuestions() {
    document.getElementById("q1").scrollIntoView();
}

// TODO this is the new dropdown
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  } 


// there are more questions, but those are not used for the visualisation
function set_q2() {
    q2_value = document.getElementById("2_dropdown").value;
    q2_answer = getSelectedText("2_dropdown");
    expectationBox.setAnswer(q2_answer);
    expectationBox.setValue(q2_value);
    console.log("expectationBox.value = " + q2_value);
    // answers[0] = (q2_answer);
    expectationBox.ansBox = new AnswerBox(expectationBox, q2_answer, expectationBox.xpos + 100, expectationBox.ypos);
}
function set_q11() {
    q11_value = document.getElementById("11_dropdown").value;
    q11_answer = getSelectedText("11_dropdown");
    originBox.setAnswer(q11_answer);
    originBox.setValue(q11_value);
    console.log("originBox.answer = " + q11_answer);
    // answers[1] = (q11_answer);
}
function set_q12() {
    q12_answer = document.getElementById("12_input").value;
    ageBox.setAnswer(q12_answer);
    if (q12_answer < 56.5) {
        ageBox.setValue("further");
    }
    else if (q12_answer > 56.5) {
        ageBox.setValue("atRisk");
    }
    console.log("ageBox.answer = " + q12_answer)
    // answers[2] = (q12_answer);
}
function set_q13() {
    q13_value = document.getElementById("13_dropdown").value;
    q13_answer = getSelectedText("13_dropdown");
    employRateBox.setAnswer(q13_answer);
    employRateBox.setValue(q13_value);
    console.log("employRateBox.answer = " + q13_answer)
    // answers[3] = (q13_answer);
}

function set_demo() {
    console.log(document.getElementById("myDropdown").lastChild.value);
}

// TODO this does not work yet
if (document.getElementById("10_dropdown").value) {
    document.getElementById("10a_dropdown").style.visibility = 'visible';
}
else (document.getElementById("10a_dropdown").style.visibility = 'hidden');


