/**
 * @author Thomas Nguyen
 * @version 1.0.0
 * ...
 */

//Initialize DOM variable objects
const grid = document.getElementById('grid');
const slider = document.getElementById('gridSlider');
const gridSize = document.getElementById('grid-size');
const clearGrid = document.getElementById('clearBtn');
const eraserMode = document.getElementById('eraser');
const colorSelect = document.getElementById('colorSelect');
const colorMode = document.getElementById('color');
const rainbowMode = document.getElementById('rainbow');

//Default settings
let colorSetting = 'black';
let mouseDown = false;
let currentMode = 'color';
colorMode.classList.add('active');


//Listener for mouse up and down states
document.body.addEventListener('mousedown', function(){
    mouseDown = true;
});
document.body.addEventListener('mouseup', function(){
    mouseDown = false;
});

//Changes color based on current mode
function colorChange(e)
{
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

//Clears out grid
function emptyGrid(){
    grid.innerHTML = '';
}

/**
* Creates grid based on size
* @param {integer} size - Height/Width of grid from slider
*/
function gridSetup(size){
    grid.style.gridTemplateColumns = `repeat(${size},1fr)`;
    grid.style.gridTemplateRows = `repeat(${size},1fr)`;

    for(i = 0;i < size * size; i++){
        gridItem();
    }
}

//Adds grid item elements into grid object
function gridItem(){
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridItem.addEventListener('mousedown', colorChange );
    gridItem.addEventListener('mouseover', colorChange );
    grid.appendChild(gridItem);
}

//Randomises colour selection
function randomColor(){
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal; 
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);   
    return `#${randColor.toUpperCase()}`
}

//Sets which mode is active (i.e. color, rainbow, eraser, colorSelect)
function updateMode(e){
    currentMode = e.target.id;

    rainbowMode.classList.remove('active');
    colorMode.classList.remove('active');
    eraserMode.classList.remove('active');

    if(currentMode == 'rainbow'){
        rainbowMode.classList.add('active');
    }
    else if(currentMode === 'color' || currentMode == 'colorSelect'){
        colorMode.classList.add('active');
    }
    else if (currentMode == 'eraser'){
        eraserMode.classList.add('active');
    }
}

//Updates size of grid based on slider values
function updateSize(){
    gridSize.innerHTML = `${slider.value} x ${slider.value}`;
    emptyGrid();
    gridSetup(slider.value);
}

//Grid start up
gridSetup(16);

//Listener events for control buttons
slider.addEventListener('input', updateSize);
clearGrid.addEventListener('click',updateSize);
eraserMode.addEventListener('click', updateMode);
colorSelect.addEventListener('input',updateMode);
colorMode.addEventListener('click', updateMode);
rainbowMode.addEventListener('click', updateMode);