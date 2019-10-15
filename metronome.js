const SECOND = 60 //frames per second
const TEMPO = 80
const BEAT = SECOND**2/TEMPO
let time = 0

//let song

function preload(){
  //song = loadSound('')
}

function setup(){
  createCanvas(innerWidth, innerHeight)
  frameRate(SECOND)
  //song.play()
}

function draw(){
  background(lerpColor(color("purple"), color("yellow"), sinBeat()))
  translate(width/2, height/2)
  rotate(1.25*PI)
  rotate(HALF_PI*sinBeat())
  line(0, 0, 100, 0)

  time++
}

function sinBeat(){
  return (sin(TWO_PI*(time%BEAT/BEAT))+1)/2
}
