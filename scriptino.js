let solutionValue = document.getElementById('insertWord');
let guessWord = document.getElementById('guess');
let letter = document.getElementById('inputGuess');
let solution = [];
let copySolution = [];
let heart = '<img src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/microsoft/209/heavy-black-heart_2764.png">';
let lifes = [heart, heart, heart, heart];
let usedLetters = [];

setLifes = () => {
    document.getElementById('life').innerHTML = '';
    lifes.forEach(function(item){
        document.getElementById('life').innerHTML = document.getElementById('life').innerHTML + item + ' ';
    })
}
setLifes()

takeWord = () => {
    solution = solutionValue.value.split('');
    copySolution = [...solution];
    for (let j = 1; j < copySolution.length - 1; ++j) {
        copySolution[j] = ' ';
    }
    buildWord(copySolution, solution)
    solutionValue.value = '';
}

buildWord = (copySolution, solution) => {
    let table = '<table><tr>';

    for (let i = 0; i < copySolution.length; ++i) {
        table += `<td>${copySolution[i]}</td>`;
    }
    
    table += '</tr></table>';
    document.getElementById('guess').innerHTML = table;
    console.log('copysolution :' + copySolution)
    console.log('solution : ' + solution)
    if (JSON.stringify(copySolution) === JSON.stringify(solution)){
        document.body.innerHTML = '';
        document.body.innerHTML = 'YOU WIN!';
        console.log('yess')
    }
}

guessWord = () => {
    document.getElementById('usedLetters').innerHTML = '';
    if (!usedLetters.includes(letter.value)){
        usedLetters.push(letter.value);document.getElementById('usedLetters').innerHTML = usedLetters;
        let index = [];
        for (let i = 0; i < solution.length; i++) {
            if (solution[i] === letter.value) {
                index.push(i);
            }
        }
        if (index.length != 0) {
            for (let x = 0; x < index.length; x++) {
                copySolution[index[x]] = solution[index[x]];
            }
            buildWord(copySolution, solution);
        } else{
            handleErrors()
        }

    } else {
        alert('hai già inserito questa lettera!')
    }
    
    letter.value = '';
}

handleErrors = () => {
    lifes.pop()
    setLifes();
    if (lifes.length === 0){
        document.body.innerHTML = '';
        document.body.innerHTML = 'YOU LOSE!';
    }
}