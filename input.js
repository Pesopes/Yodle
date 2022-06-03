// Input

document.addEventListener( "keyup", (e)=>{
    MyKeyboardEvent(e)
})
let holdInterval = null
let holdTimeout = null
gEl("keyboard-cont").addEventListener("pointerup", (e)=>{
    clearInterval(holdInterval)
    clearTimeout(holdTimeout)
    holdInterval = null
    holdTimeout = null
    const target = e.target
    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent
    if (target.id === "back-button") {
        key = "Backspace"   
    }

    //because mobile -_-
    //document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
    //document.dispatchEvent(new KeyboardEvent("input", {'key': key}))
    MyKeyboardEvent(e={'key':key})
})
// holding keys will repeat them (only backspace because otherwise its annoying)
gEl("keyboard-cont").addEventListener("pointerdown", (e)=>{
    if (e.target.id !== "back-button" && holdTimeout === null && holdInterval === null)
        return;

    //set timeout then interval if it isnt set already
    holdTimeout = setTimeout((e)=>{
        holdInterval = setInterval((e)=>{
            const target = e.target
            if (!target.classList.contains("keyboard-button")) {
                return
            }
            let key = target.textContent
            if (target.id === "back-button") {
                key = "Backspace"   
            }
            MyKeyboardEvent(e={'key':key})
        },KEY_HOLD_INTERVAL,e)
    },KEY_HOLD_DELAY,e)
})


function MyKeyboardEvent(e){
    if(game.screen.id != "game")
        return
    let k = e.key
    if(k == "Enter"){
        enterWord()
    }else if(k == "Backspace" && e.ctrlKey){
        removeCurrentWord()
    }else if(k == "Backspace"){
        removeLastLetter()
    }else{
        let found = k.match(/[a-z]/gi)
        if (!found || found.length > 1)
            return
        addLetter(found)
    }
    if (game.end) 
        return
    refresh()
}

function enterWord(){
    
    if(game.guesses[game.guesses.length-1].length >= game.wordLength && !game.end)
    {
        //if word exists
        if(wordExists(game.guesses[game.guesses.length-1]))
            game.guesses[game.guesses.length] = "ENTER"
    }else if(game.end){
        handleEnd(0)
    }
}

function removeCurrentWord(){
    game.guesses[game.guesses.length-1] = ""
}

function removeLastLetter(){
    game.guesses[game.guesses.length-1] = game.guesses[game.guesses.length-1].slice(0, -1)
}

function addLetter(letter){
    if (game.end) 
        return
    let index = game.guesses.length-1
    if (game.guesses[index].length < game.wordLength) {
        game.guesses[index] += letter
    }
}