const canvas = document.getElementsByTagName('canvas')[0]
const ctx = canvas.getContext('2d')
const canvasSize = 200

canvas.width = canvasSize
canvas.height = canvasSize

let atualPlayer = 'x'
let gameState = []

const getClickCoords = (key)=>{
    const rect = canvas.getBoundingClientRect()
    let x = key.clientX - rect.left
    let y = key.clientY - rect.top
    return {'x': x, 'y': y}
}


const findCellByCoords = (coord)=>{
    let groups = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    let l = undefined
    let c = undefined
    if (coord.y < canvasSize/3) {
        l = 0
    } else if (coord.y < canvasSize/3 *2){
        l = 1
    } else if (coord.y < canvasSize) {
        l = 2
    }
    if(coord.x < canvasSize/3){
        c = 0
    } else if(coord.x < canvasSize/3*2){
        c = 1
    } else if(coord.x < canvasSize) {
        c = 2
    }
    return groups[l][c]
}

const atualizeGameState = (cell, player)=>{
    if(gameState[cell - 1] == null) {
        gameState[cell - 1] = player
        if(player === 'x'){
            atualPlayer = 'o'
        } else {
            atualPlayer = 'x'
        }
    }
}

canvas.addEventListener('mousedown', (key)=>{
    let keyCoord = getClickCoords(key)
    let clickedCell = findCellByCoords(keyCoord)
    atualizeGameState(clickedCell, atualPlayer)
    run()
})

const drawLines = ()=>{
    ctx.moveTo(canvasSize/3, 0)
    ctx.lineTo(canvasSize/3, canvasSize)
    ctx.moveTo(canvasSize/3*2, 0)
    ctx.lineTo(canvasSize/3*2, canvasSize)
    ctx.moveTo(0, canvasSize/3)
    ctx.lineTo(canvasSize, canvasSize/3)
    ctx.moveTo(0, canvasSize/3*2)
    ctx.lineTo(canvasSize, canvasSize/3*2)
    ctx.stroke()
}

const drawBackgroundAtualPlayer = ()=>{
    const setBackgroundColor = ()=>{
        if(atualPlayer === 'x'){
            ctx.fillStyle = '#b5ffab'
            ctx.fillRect(0, 0, canvasSize, canvasSize)
        } else {
            ctx.fillStyle = '#ffabab'
            ctx.fillRect(0, 0, canvasSize, canvasSize)
        }
    }
    setBackgroundColor()
    const drawCircle = ()=>{
        ctx.font = '300px Arial'
        ctx.fillStyle = 'white'
        ctx.fillText('o', canvasSize/12, canvasSize/ 1.13)
    }
    const drawCross = ()=>{
        ctx.font = '300px Arial'
        ctx.fillStyle = 'white'
        ctx.fillText('x', canvasSize/8, canvasSize/ 1.09)
    }
    if (atualPlayer === 'x'){
        drawCross()
    } else {
        drawCircle()
    }
}

const drawPlayers = ()=>{
    let line = undefined
    let column = undefined
    const playerCoord = ()=>{
        if(line == undefined){

        }
    }
    const drawCircle = (line, column)=>{
        ctx.beginPath()
        ctx.arc(canvasSize/3/2 + canvasSize/3*line, canvasSize/3/2 + canvasSize/3*column, canvasSize/12, 0, 2 * Math.PI)
        ctx.stroke()
    }
    const drawCross = (line, column)=>{
        ctx.beginPath()
        ctx.moveTo(0 + canvasSize/12 + canvasSize/3*line, 0 + canvasSize/12 + canvasSize/3*column)
        ctx.lineTo(canvasSize/3 - canvasSize/12 + canvasSize/3*line, canvasSize/3 - canvasSize/12 + canvasSize/3*column)
        ctx.stroke()
        
        ctx.beginPath()
        ctx.moveTo(canvasSize/3 - canvasSize/12 + canvasSize/3*line, 0 + canvasSize/12 + canvasSize/3*column)
        ctx.lineTo(0 + canvasSize/12 + canvasSize/3*line, canvasSize/3 - canvasSize/12 + canvasSize/3*column)
        ctx.stroke()
    }
    for(c = 0; gameState.length > c; c++){
        if(gameState[c] != null) {
            if(c < 3){
                column = 0
            } else if(c < 6){
                column = 1
            } else if(c < 9){
                column = 2
            }
            if (c == 0 || c == 3 || c == 6){
                line = 0
            } else if (c == 1 || c == 4 || c == 7) {
                line = 1
            } else if (c == 2 || c == 5 || c == 8) [
                line = 2
            ]
            if(gameState[c] == 'x'){
                drawCross(line, column)
            }
            if(gameState[c] == 'o'){
                drawCircle(line, column)
            }
        }
    }
}

const resetGame = ()=>{
    atualPlayer = 'x'
    gameState = [null, null, null, null, null, null, null, null, null]
}

const checkWinner = ()=>{
    let winningPatterns = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ]
    for(c = 0; c < winningPatterns.length; c++) {
        let x = winningPatterns[c][0] -1 
        let y = winningPatterns[c][1] -1
        let z = winningPatterns[c][2] -1
        if(gameState[x] == gameState[y] && gameState[x] == gameState[z] && gameState[x] != null && gameState[y] != null && gameState[z] != null){
            alert("Jogador " + gameState[x] + ' Ganhou!')
            return true
        }
    }
    if(gameState.length == 9) {
        alert('Empate')
        return true
    }
}

const calc = ()=>{
    checkWinner()
}

const draw = ()=>{
    if (checkWinner() == true) {
        location.reload()
    } else {  
        drawBackgroundAtualPlayer()
        drawLines()
        drawPlayers()
    }
}

const run = ()=>{
    calc()
    draw()
}
run()