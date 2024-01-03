const table = document.querySelector("table");
const form = document.querySelector("#wrapper form");
form.addEventListener('submit', onSubmit);
const elements = [
    { id: "name", regex: /^[a-zA-ZА-Яа-яґҐєЄіІїЇ]+ [A-ZА-ЯҐЄІЇ]\.[A-ZА-ЯҐЄІЇ]\.$/, field: "ПІБ" },
    { id: "group", regex: /^[A-ZА-ЯҐЄІЇ]{2}-\d\d$/, field: "Група" },
    { id: "phone", regex: /^\(\d\d\d\)-\d\d\d-\d\d-\d\d$/, field: "Телефон" },
    { id: "address", regex: /^м\. [a-zA-ZА-Яа-яґҐєЄіІїЇ]+$/, field: "Адреса" },
    { id: "e-mail", regex: /^[a-z\.-]+@[a-z]+\.com$/, field: "E-mail" },
    ]
elements.forEach(element => setRandomColorOnHover(element.id))
function onSubmit(event) {
    event.preventDefault();
    elements.forEach(element => checkElementWithRegexById(element.id,
        element.regex))
    const isCorrectInput = elements.every(element =>
        checkElementWithRegexById(element.id, element.regex));
    if (isCorrectInput) {
        showOutput(elements);
    }
    else {
        hideOutput();
    }
}
function checkElementWithRegexById(id, regex) {
    const value = document.getElementById(id).value;
    if (regex.test(value)) {
        markCorrect(id);
        return true;
    }
    else {
        markError(id);
        return false;
    }
}
function markError(id) {
    const element = document.getElementById(id);
    element.style.border = '1px solid red';
}
function markCorrect(id) {
    const element = document.getElementById(id);
    element.style.border = '1px solid lightgray';
}
function showOutput() {
    const output = document.getElementById("output");
    output.style.display = "block";
    elements.forEach(element => {

        const elementValue = document.getElementById(element.id).value;
        const targetElement = document.getElementById("output-" +

            element.id);

        targetElement.innerHTML = `<b>${element.field}:</b>
${elementValue}`;
    })
}
function hideOutput() {
    const output = document.getElementById("output");
    output.style.display = "none";
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function setRandomColorOnHover(id, keepRandomColor = false) {
    const element = document.getElementById(id);
    element.addEventListener("mouseover", () => {
        element.style.backgroundColor = getRandomColor();
    });
    if (!keepRandomColor) {
        element.addEventListener("mouseout", () => {
            element.style.backgroundColor = "transparent";
        })
    }
}
const variant = 6;
const variantCellId = `cell-${variant}`;
const rowLength = 7;

for (let row = 0; row < rowLength; row++) {
    const rowElement = document.createElement('tr');
    for (let cell = 0; cell < rowLength; cell++) {
        const index = (cell + 1 + (row * rowLength)).toString();
        const dataElement = document.createElement('td');
        dataElement.innerHTML = index;

        dataElement.id = `cell-${index}`;
        rowElement.appendChild(dataElement);
        table.appendChild(rowElement);
    }
}

setRandomColorOnHover(variantCellId, true);
const variantCell = document.getElementById(variantCellId);
variantCell.addEventListener("click", () => {
    variantCell.style.backgroundColor = document.getElementById("color-picker").value;
});
variantCell.addEventListener("dblclick", () => {
    backgroundColorOfCells = document.getElementById("color-picker").value;
    for (let index = 1; index <= rowLength ** 2; index += 1) {
        if (index % rowLength >= variant || index % rowLength == 0) {
            const cell = document.getElementById(`cell-${index}`);
            cell.style.backgroundColor = backgroundColorOfCells;
        }
    }
})
