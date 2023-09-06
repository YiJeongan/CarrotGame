const runBtn = document.querySelector('.runBtn');
const pauseBtn = document.querySelector('.pauseBtn');
const replayBtn =document.querySelector('.replay');
const Box = document.querySelector('.Box');
const timer = document.querySelector('.timer');
const count = document.querySelector('.count');
const gameArea = document.querySelector('.gameArea');
const ending = document.querySelector('.ending');
const replay = document.querySelector('.replay');

let sec = 10;
let carrotCt= null;
var carrotPull = new Audio('sound/carrot_pull.mp3');
var bugPull = new Audio('sound/bug_pull.mp3');
var gameWin = new Audio('sound/game_win.mp3');
var bg = new Audio('sound/bg.mp3');
var alert = new Audio('sound/alert.wav');

window.addEventListener('DOMContentLoaded', function()
{   
    bg.loop = true;
    bg.play()
});

runBtn.addEventListener('click',()=>{
    gameStart()
    },{once:true})

pauseBtn.addEventListener('click',()=>{
    clearInterval(interval);
    pauseBtn.style.visibility="hidden"
    ending.innerHTML='replay?'
    Box.style.visibility = 'visible';
    });

replay.addEventListener('click',()=>{
    sec = 10;
    gameArea.replaceChildren();
    gameStart()
    })



function Timer(){
    if(sec>0){
        timer.innerText="0:"+sec;
        sec = sec-1;
 
    }else if(sec==0){
        timer.innerText="0:0";
        clearInterval(interval)
        alert.loop = false;
        alert.play();
        pauseBtn.style.visibility="hidden"
        Box.style.visibility = "visible";
        ending.innerHTML= 'You Lose🥲'
        console.log('Lose')
    }
}

function gameStart(){
    console.log('start');
    Box.style.visibility="hidden"
    runBtn.style.visibility="hidden";
    pauseBtn.style.visibility="visible";
    interval=setInterval(Timer,1000)
    showCarrotBug();
    gameIng()

}

function randomNumber(min,max){
    return Math.random()*(max - min) +min;
}


function showCarrotBug(){
    const xMax = gameArea.offsetWidth;
    const yMax = gameArea.offsetHeight;

    let i;
    for (i = 0; i<7; i++) {
        const span = document.createElement('span')
        span.setAttribute('class','bug')
        span.innerHTML=`
            <img src="img/bug.png">`

        const x = randomNumber(0,xMax);
        const y = randomNumber(0,yMax);

        span.style.position = 'absolute';
        span.style.left = `${x}px`;
        span.style.top = `${y}px`;
        
        gameArea.appendChild(span);
        }

    for (i = 0; i<10; i++) {
        const span2 = document.createElement('span')
        span2.setAttribute('class','carrot')
        span2.innerHTML=`
            <img src="img/carrot.png">`

        const x = randomNumber(0,xMax);
        const y = randomNumber(0,yMax);

        span2.style.position = 'absolute';
        span2.style.left = `${x}px`;
        span2.style.top = `${y}px`;

        gameArea.appendChild(span2)
        }
    }
    

function gameIng(){
    let carrots = document.querySelectorAll('.carrot');
    let carrotCt = carrots.length;
    count.innerHTML = carrotCt;

    let bugs =  document.querySelectorAll('.bug');

    carrots.forEach(carrot => {
        carrot.addEventListener('click', (e) => {
            if(carrotCt > 0){
                carrotPull.play();
                e.target.style.visibility ="hidden";
                e.target.parentNode.style.visibility="hidden";
                carrotCt--;
                count.innerHTML = carrotCt;
                if(sec>0 && carrotCt==0){
                    clearInterval(interval);
                    alert.play();
                    pauseBtn.style.visibility="hidden"
                    Box.style.visibility = "visible";
                    gameWin.play();
                    ending.innerHTML= 'YOU WIN🎉'
                    console.log('win')
                }
            }});
            });
        
        bugs.forEach(bug =>{
            bug.addEventListener('click',()=>{
                bugPull.play();
                clearInterval(interval)
                pauseBtn.style.visibility="hidden"
                Box.style.visibility = "visible";
                ending.innerHTML= 'You Lose🥲'
                console.log('Lose')
            })
        })
    }  

