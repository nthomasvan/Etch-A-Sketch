const grid = document.getElementById('grid');
const slider = document.getElementById('gridSlider');
const gridSize = document.getElementById('grid-size');
let isClicked = false;
let mouseDown = false;

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

function colorChange(e)
{
    console.log(mouseDown);
    if(e.type === 'mouseover' && !mouseDown) return

    e.target.style.backgroundColor = 'black';
} 

function clearGrid(){
    grid.innerHTML = '';
}
gridSetup(16);


slider.addEventListener('input', updateValue)

function updateValue(){
    gridSize.innerHTML = `${slider.value} x ${slider.value}`;
    clearGrid();
    gridSetup(slider.value);
}
//console.log(slider.value);