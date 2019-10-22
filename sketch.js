//branches
const SPREAD = 1000
const FORKS = 1
let branches = []
let head
let oldHeadX = 0
let oldHeadY = 0

//time
const SECOND = 60 //frames per second
const TEMPO = 30
const BEAT = SECOND**2/TEMPO
let time = 0

let song

class branch{
    constructor(x, y){
        this.x = x
        this.y = y
        this.children = []
        this.fresh = true
        this.alpha = 0
    }

    split(){
        let newX = (random(SPREAD)+random(SPREAD))/2 - SPREAD/2 + this.x
        let newY = (random(SPREAD)+random(SPREAD))/2 - SPREAD/2 + this.y

        let newBranch = new branch(newX, newY)
        this.children.push(newBranch)
        return newBranch
    }

    drawLines(){
        for(var c of this.children){
            stroke(160, 120, 85, c.alpha)
            c.alpha += 255/BEAT
            line(c.x, c.y, this.x, this.y)
        }
    }
}

function preload(){
    song = loadSound('iWishYouLove.mp3')
}

function setup(){
    createCanvas(innerWidth, innerHeight)
    frameRate(SECOND)
    if(song.isLoaded()){
        song.play()
    }

    head = new branch(0, 0)
    branches.push(head)
}

function draw(){
    background(212, 185, 150)
    translate(width/2 - map((time-1)%BEAT, 0, BEAT, oldHeadX, head.x), height/2 - map((time-1)%BEAT, 0, BEAT, oldHeadY, head.y))

    if(time%BEAT == 0){
        for(var b of branches){
            //are we on screen?
            if(abs(b.x-head.x) < width/2 && abs(b.y-head.y) < height/2){
                if(b.fresh){
                    b.fresh = false
                    for(var i = FORKS; i > 0; i--){
                        branches.unshift(b.split())
                    }
                }
            }
            //if not then remove it
            else{//javascript problem, not my fault
                //branches = branches.filter(value => b == value)
            }
        }

        //new head
        oldHeadX = head.x
        oldHeadY = head.y
        head = head.split()
        branches.push(head)
        //slight bias to avoid screen clutter
        head.y+= SPREAD/8
    }

    for(var b of branches){
        b.drawLines()
    }
    
    time++
}

function sinBeat(){
  return (sin(TWO_PI*(time%BEAT/BEAT))+1)/2
}
