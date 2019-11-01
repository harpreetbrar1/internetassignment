console.log('asdas')


function gameStart() {
    
    let gameIntro = document.getElementById('game-intro');
    gameIntro.classList.toggle('disappearIntro')
    let scoreboard = document.getElementById('scoreboard');
    let terminateButton = document.getElementById('terminate-button')

    setTimeout(function(){
        gameIntro.style.display = 'none'
        scoreboard.style.display = 'inline-flex'
        terminateButton.style.display= 'block'

        mainFunction(1);
    },1000)
}



function mainFunction(level) {
//Lowest Difficulty 4X4 1   4
//4X4 4                 1   4
//4X4 5                 2   5  
    
//5X5 with 4tiles       3   4
//5X5 with 5 tiles      4   5
//5X5 with 6 tiles      5   6
    
//6X6 5tiles            6   5
//6X6 6tiles            7   6
    
//Higest Difficulty 6X6 6tiles 
    
    let columns = 4
    let tileSize = 80
    let tilePadding = 0.3
    let correctTiles = 4;


    //Generate Tiles based on difficulty Level
    switch(level){
        case 1:
                rows = 4; columns = 4; tileSize = 80; 
                tilePadding = 0.3; correctTiles = 4
                break;
        case 2:
                rows = 4; columns = 4; tileSize = 80; 
                tilePadding = 0.3; correctTiles = 5
                break;
        case 3:
                rows = 5; columns = 5; tileSize = 70; 
                tilePadding = 0.4; correctTiles = 4
                break;
        case 4:
                rows = 5; columns = 5; tileSize = 70; 
                tilePadding = 0.4; correctTiles = 5
                break;  
        case 5:
                rows = 5; columns = 5; tileSize = 70; 
                tilePadding = 0.4; correctTiles = 6
                break;
        case 6:
                rows = 6; columns = 6; tileSize = 60; 
                tilePadding = 0.5; correctTiles = 5
                break;
        case 7:
                rows = 6; columns = 6; tileSize = 60; 
                tilePadding = 0.5; correctTiles = 6
                break;                
        default:
                rows = 4; columns = 4; tileSize = 80; 
                tilePadding = 0.3; correctTiles = 4
                break;    
    } 
  
    generateTiles(rows,columns,tileSize,tilePadding)   
    let correctTilesIndexArray = generateCorrectTilesArray(correctTiles,rows*columns)
    //correctTilesIndexArray = [0,1,2,3,4]
    provideHintForCorrectTilesToUser(correctTilesIndexArray);

    setTimeout(function() {
        let attachTiles2 = document.getElementById('attach-tiles')
        attachTiles2.classList.toggle('rotatediv');
        setTimeout(() => {document.getElementById('audio').play()});    
        
    },4000)

      

   
    let matrix =  generateMatrix(rows,columns);   
    rotate(matrix)
    let newcorrectTilesIndexArray = generateTileArrayAfterRotation(correctTilesIndexArray,matrix,columns)
 
    //Change Level On Screen
    let scoreDiv = document.getElementsByClassName('scoreboard-element')
    scoreDiv[1].innerHTML = "Level " + level + ' of 6' 

      //Game Starts
      
     changeColorOfCorrectTilesOnClick(newcorrectTilesIndexArray,correctTiles)
    
      

}




function changeLevelOrEndGameBasedOnCurrentGame(wrongTileClickCount,level) {
    
    //let scoreDiv = document.getElementsByClassName('scoreboard-element')

    console.log('wrongTileClickCount ', wrongTileClickCount)
    console.log('Current Level ', level )
    console.log(wrongTileClickCount);

    for(let i = 0; i < 1; i++){

        //If Number of Wrong Clicks are greater than current Level then difficulty decreases
        if(level>1 && wrongTileClickCount>level) {
            level--;
            break
        }
        //On First Level If Number of Wrong Clicks are greater than current Level then difficulty remains same
        if(level===1 && wrongTileClickCount>level) {
            level = 1;
            break;
        }

        //On First Level If Number of Wrong Clicks are greater than current Level then difficulty increases
        if(level===1 && wrongTileClickCount<=level) {
            level++;
            break;
        }
        //
        if(level>1 && level <=6 && wrongTileClickCount<=level) {
            level++;
            break;
        }
        if (level>6) {
            level = 6;
            break;
        }
        else {
            console.log('Do  nothing');
        }
    }
   
    setTimeout(function(){resetGame(level)}, 1000)


}



//Change Color Of Tiles On Click After Rotation (Level Change or  Game Quit)
function changeColorOfCorrectTilesOnClick(newcorrectTilesIndexArray, numberOfCorrectTiles) {
    let tileElementsArray = document.getElementsByClassName('tile');
    
    //Converting score from string to integer and set number of correct Tiles
    let scoreDiv = document.getElementsByClassName('scoreboard-element');
    scoreDiv[0].innerHTML = "Tiles " + numberOfCorrectTiles
    let string = scoreDiv[2].innerHTML
    let array = string.split(' ')
    let score = parseInt(array[array.length-1])   
    let wrongTileClickCount = 0;
    let levelString = scoreDiv[1].innerHTML 
    let levelStringArray = levelString.split(' ');
    let level = parseInt(levelStringArray[1]);

    //----------------------------------------
    let correctTileCounter = 0;
    //Converting score from string to integer
    for(let i = 0; i<tileElementsArray.length; i++) {
         tileElementsArray[i].onclick = function(){
            tileElementsArray[i].style.backgroundColor = 'red';
            tileElementsArray[i].style.transition = '1s';
            tileElementsArray[i].style.transform = 'rotateY(180deg)'
            for(let j = 0; j<newcorrectTilesIndexArray.length; j++) {
                if(newcorrectTilesIndexArray[j]===i) {
                    tileElementsArray[i].style.backgroundColor = 'blue';
                    tileElementsArray[i].style.transition = '1s';
                    tileElementsArray[i].style.transform = 'rotateY(180deg)'
                    score++;
                    localStorage.setItem('gameScore',score);
                    scoreDiv[2].innerHTML= 'Score' +' '+ score                
                    correctTileCounter++;
                }               
            }
            if(tileElementsArray[i].style.backgroundColor === 'red') {
                score--;
                wrongTileClickCount++;
                localStorage.setItem('gameScore',score);
                scoreDiv[2].innerHTML='Score' +' '+ score
                console.log('DCoresef ',score)
            }
            if(score<0){
                setTimeout(function(){restartGameAtScoreMinusOne();},500)
            }
            if(correctTileCounter===numberOfCorrectTiles) {
                counter=0;
                setTimeout(function(){
                    changeLevelOrEndGameBasedOnCurrentGame(wrongTileClickCount,level)
                },1000)
            }
        }
    }

    
}

//Reset Game with all tiles to default Color
function resetGame(level) {
    let tileElementsArray = document.getElementsByClassName('tile');
    let attachTiles = document.getElementById('attach-tiles')
    for(let i = 0; i < tileElementsArray.length; i++) {

        tileElementsArray[i].style.backgroundColor = 'brown'         
    }

    setTimeout( function() {
       
        attachTiles.classList.toggle('rotatediv');
        setTimeout(() => {document.getElementById('audio').play()},3000);
    },2000)
     
    for(let i = 0; i < tileElementsArray.length; i++) {
        attachTiles.removeChild(tileElementsArray[i]);
    }

    mainFunction(level);   
}



// provide Hint For Correct Tiles To User at the begin of each game
function provideHintForCorrectTilesToUser(correctTilesIndexArray) {
    let attachTiles = document.getElementsByClassName('tile');

    for(let i = 0; i <correctTilesIndexArray.length;i++) {
        setTimeout(function(){
        attachTiles[correctTilesIndexArray[i]].style.transition = '1s';
        attachTiles[correctTilesIndexArray[i]].style.backgroundColor = 'blue';
        attachTiles[correctTilesIndexArray[i]].style.transform = 'rotateY(180deg)';
        },500)
        setTimeout(function() {
            attachTiles[correctTilesIndexArray[i]].style.transition = '1s';
            attachTiles[correctTilesIndexArray[i]].style.backgroundColor = 'brown';
            attachTiles[correctTilesIndexArray[i]].style.transform = 'rotateY(0deg)';
        },1500
        )
    }
}

// Generates array of correct Tiles
function generateCorrectTilesArray(numberOfCorrectTiles, totalTiles) {
    let correctTilesIndexArray = [];
    let bool = true;
    for(let i = 0; i < numberOfCorrectTiles; i++) {
        let newRandomNumber = Math.floor(Math.random() * totalTiles);
        for(let j =0; j <correctTilesIndexArray.length;j++) {
            if(correctTilesIndexArray[j]===newRandomNumber) {
                bool = false;
                break;
            }
        }
        if(bool === true) {
            correctTilesIndexArray[i] = newRandomNumber
        }
        if(bool === false) {
            i--;
            bool = true;
        }
    }
    correctTilesIndexArray.sort(function(a, b){return a - b});
    return correctTilesIndexArray;
}

//Generate Tiles of desired rows and columns
function generateTiles(height, width, tileSize, padding) {
    let s =  document.getElementById('attach-tiles');
    s.innerHTML ='';
    s.style.maxWidth =  tileSize * (width+padding) +'px' 
    s.style.maxHeight = tileSize * (height+padding) + 'px'
    s.style.margin= 'auto'
    s.style.marginTop= '-3%'

    for(let i = 0; i <height*width; i++) {
        let tile = document.createElement('div');
        tile.style.width = tileSize-1+'px';
        tile.style.height = tileSize-1 +'px';
        tile.style.cursor = 'pointer'
        tile.className = 'tile'
        tile.style.backgroundColor = 'brown'
        tile.style.display = 'inline-block'
        tile.style.margin = '1px'
        tile.style.marginTop = '-5px'
        s.appendChild(tile);    
    }
    
}



//Link to the code of this function
//https://www.geeksforgeeks.org/how-to-create-two-dimensional-array-in-javascript/
function generateMatrix(rows,columns) {
    let matrix = new Array(rows);
    var h = 0;
    for (let i = 0; i < matrix.length; i++) { 
        matrix[i] = new Array(columns); 
    } 

    for (let i = 0; i < columns; i++) { 
        for (let j = 0; j < rows; j++) { 
            matrix[i][j] = h++; 
           
        } 
    }
    return matrix; 
}


//Link to code of this function
//https://code.likeagirl.io/rotate-an-2d-matrix-90-degree-clockwise-without-create-another-array-49209ea8b6e6 
function rotate(matrix) {
    const n = matrix.length;
    const x = Math.floor(n/ 2);
    const y = n - 1;
    for (let i = 0; i < x; i++) {
       for (let j = i; j < y - i; j++) {
          k = matrix[i][j];
          matrix[i][j] = matrix[y - j][i];
          matrix[y - j][i] = matrix[y - i][y - j];
          matrix[y - i][y - j] = matrix[j][y - i]
          matrix[j][y - i] = k
       }
    }
  }

function generateTileArrayAfterRotation(correctTilesIndexArray,matrix,rows) {
    let newcorrectTilesIndexArray = [];
    for(let i=0;i<correctTilesIndexArray.length;i++) {
        let matrixRow = Math.floor(correctTilesIndexArray[i]/rows);
        let matrixColumn = correctTilesIndexArray[i]%rows;

        newcorrectTilesIndexArray[i]= matrix[matrixRow][matrixColumn];
    }

    return newcorrectTilesIndexArray
}



function terminateButton() {
    let  body = document.getElementsByTagName('body');
    
    let  terminationConfirmation = document.getElementById('terminationConfirmation');
    terminationConfirmation.style.display = 'block';

}





function restartGameAtScoreMinusOne() {
    
    let score = localStorage.getItem('gameScore');
    if(score<0) {score=0 }
    localStorage.setItem('gameScore',score);
    
    window.location.replace('/html/summary.html');


}


function quitYes() {
    restartGameAtScoreMinusOne();
}

function quitNo() {
    let  terminationConfirmation = document.getElementById('terminationConfirmation');
    terminationConfirmation.style.display = 'none';
}