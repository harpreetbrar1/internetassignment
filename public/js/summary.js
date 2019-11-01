function displayScores() {
     
    
    let score = localStorage.getItem('gameScore')
    scoreDiv = document.getElementById('scores').innerHTML = score
    console.log(score)
}

displayScores()

function showLeaderBoardPage() {
    let name = document.getElementById('name')

    if(name.value === ""){
        alert('Invalid Name');
    }
    else {
    localStorage.setItem('gameName', name);
    window.location.replace('/html/leaderboard.html');
    }
    
    
}



function restartGame() {
    window.location.replace('../');
}

