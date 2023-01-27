const grid = document.getElementById('grid');
const slider = document.getElementById('gridSlider');
const gridSize = document.getElementById('grid-size');
const clearGrid = document.getElementById('clearBtn');
const eraserMode = document.getElementById('eraser');
const colorSelect = document.getElementById('colorSelect');
const colorMode = document.getElementById('color');
const rainbowMode = document.getElementById('rainbow');

let colorSetting = 'black';
let mouseDown = false;
let currentMode = 'color';

document.body.addEventListener('mousedown', function(){
    mouseDown = true;
});
document.body.addEventListener('mouseup', function(){
    mouseDown = false;
});

function gridSetup(size){
    grid.style.gridTemplateColumns = `repeat(${size},1fr)`;
    grid.style.gridTemplateRows = `repeat(${size},1fr)`;

    for(i = 0;i < size * size; i++){
        gridItem();
    }
}

function gridItem(){
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridItem.addEventListener('mousedown', colorChange );
    gridItem.addEventListener('mouseover', colorChange );
    grid.appendChild(gridItem);
}

function randomColor(){
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal; 
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);   
    return `#${randColor.toUpperCase()}`
}

function colorChange(e)
{
    console.log(currentMode);
    if(e.type === 'mouseover' && !mouseDown) return

    if(currentMode == 'rainbow'){
        e.target.style.backgroundColor = randomColor();
    }
    else if(currentMode === 'color' || currentMode == 'colorSelect'){
        colorSetting = colorSelect.value;
        e.target.style.backgroundColor = colorSetting;
    }
    else if (currentMode == 'eraser'){
        e.target.style.backgroundColor = 'white';
    }
} 

function emptyGrid(){
    grid.innerHTML = '';
}
gridSetup(16);


slider.addEventListener('input', updateSize);
clearGrid.addEventListener('click',updateSize);
eraserMode.addEventListener('click', updateMode);
colorSelect.addEventListener('input',updateMode);
colorMode.addEventListener('click', updateMode);
rainbowMode.addEventListener('click', updateMode)

function updateSize(){
    gridSize.innerHTML = `${slider.value} x ${slider.value}`;
    emptyGrid();
    gridSetup(slider.value);
}

function updateMode(e){
    currentMode = e.target.id;
}
