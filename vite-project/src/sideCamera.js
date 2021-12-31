import '../style.css'

import { moon, moonIdleAnimation } from './shapes'
import { 
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PointLight,
  AmbientLight,
} from "three";

let FOV = 50
let cameraWidth = window.innerWidth/2
let cameraHeight = window.innerHeight
const scene = new Scene();
const camera = new PerspectiveCamera(FOV, cameraWidth / cameraHeight, 1, 1000)
const renderer = new WebGLRenderer({
  canvas: document.querySelector('#moon'),
  alpha: true
})
camera.position.set(0, 0, 40)
let isIdle = true

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(cameraWidth, cameraHeight)

renderer.render(scene, camera)

const pointLight = new PointLight(0xffffff)
pointLight.position.set(200, 10, 15)
const ambientLight = new AmbientLight(0xffffff)
scene.background = "transparent"

document.getElementById('moon').onmousedown = () => {
  FOV = 40
  isIdle = false
  document.getElementById('moon').onmousemove = (event) => {
    moon.rotation.y += event.movementX * 0.005
    moon.rotation.x += event.movementY * 0.005
  }
}
document.getElementById('moon').onmouseup = () => {
  document.getElementById('moon').onmousemove = null
  FOV = 50
  isIdle = true
}
console.log(document.getElementById('moon'))

scene.add(moon, pointLight, ambientLight)

function animate() {
  requestAnimationFrame( animate )

  cameraWidth = window.innerWidth/2
  cameraHeight = window.innerHeight

  if(isIdle){
    moonIdleAnimation()
  }

  renderer.render( scene, camera )
};
animate()