const nameInput = document.getElementById('name-i');
const creditsInput = document.getElementById('credits-i');
const gradeInput = document.getElementById('grade-i');
const listContainer = document.getElementById('list-container');
const totalCreditsElmnt = document.getElementById('total-credits');
const twelvePointElmnt = document.getElementById('12-point');
const fourPointElmnt = document.getElementById('4-point');
const percentElmnt = document.getElementById('percent');
let courseList = []

function addCourse() {
    if (nameInput.value === '') return;

    const creditsNum = Number(creditsInput.value);
    if (isNaN(creditsNum) || !Number.isInteger(creditsNum) || creditsNum < 0) return;

    const gradeNum = Number(gradeInput.value);
    if (isNaN(gradeNum) || !Number.isInteger(gradeNum) || gradeNum < 0) return;

    let li = document.createElement('li');
    li.innerText = nameInput.value;
    listContainer.appendChild(li);
    let span1 = document.createElement('span');
    span1.innerText = creditsInput.value;
    li.appendChild(span1);
    let span2 = document.createElement('span');
    span2.innerText = gradeInput.value;
    li.appendChild(span2);
    let cross = document.createElement('span');
    cross.innerHTML = '\u00d7';
    li.appendChild(cross);

    courseStats = [gradeNum, creditsNum];
    courseList.push(courseStats);
    
    calculateGPA();
    saveData();
}

function calculateGPA() {
    if (courseList.length === 0) {
        totalCreditsElmnt.innerText = 'Total Credits: 0';
        twelvePointElmnt.innerText = '12-Point Scale: 0';
        fourPointElmnt.innerText = '4-Point Scale: 0';
        percentElmnt.innerText = 'Percentage: 0%';
        return;
    }

    let totalCredits = 0;
    let maxCredits = 0;
    let percentSum = 0;
    for (let i=0; i<courseList.length; i++) {
        totalCredits += courseList[i][0] * courseList[i][1];
        maxCredits += courseList[i][1] * 12;
        percentSum += convert12ToPercent(courseList[i][0]);
    }
    let rawPercent = (totalCredits / maxCredits);
    let twelvePoint = (12 * rawPercent).toFixed(2);

    let percentage = percentSum / (courseList.length);
    let percentFixed = percentage.toFixed(2);
    let fourPoint = ((4/100) * percentage).toFixed(2);

    totalCreditsElmnt.innerText = 'Total Credits: ' + totalCredits;
    twelvePointElmnt.innerText = '12-Point Scale: ' + twelvePoint;
    fourPointElmnt.innerText = '4-Point Scale: ' + fourPoint;
    percentElmnt.innerText = 'Percentage: ' + percentFixed + '%';
}

function convert12ToPercent(grade) {
    switch (grade) {
        case 12:
            return 100;
        case 11:
            return 89;
        case 10:
            return 84;
        case 9:
            return 79;
        case 8:
            return 76;
        case 7:
            return 72;
        case 6:
            return 69;
        case 5:
            return 66;
        case 4:
            return 62;
        case 3:
            return 59;
        case 2:
            return 56;
        case 1:
            return 52;
        default:
            return 49;
    }
}

function saveData() {
    localStorage.setItem('listHTML', listContainer.innerHTML);

    let jsonArray = JSON.stringify(courseList);
    localStorage.setItem('courseList', jsonArray);
}

function loadData() {
    listContainer.innerHTML = localStorage.getItem('listHTML');

    let jsonArray = localStorage.getItem('courseList');
    courseList = JSON.parse(jsonArray) || [];
    calculateGPA();
}

document.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') addCourse();
});

listContainer.addEventListener('click', function(e){
    if (e.target.tagName === 'SPAN') {
        let parentElement = e.target.parentElement;
        let grandParentElement = parentElement.parentNode;
        let index = Array.prototype.indexOf.call(grandParentElement.children, parentElement);
        courseList.splice(index - 1, 1);
        parentElement.remove();

        calculateGPA();
    }

    saveData()
}, false);

loadData();