import './style.css'
import spaceBG from './images/spaceBG.jpg'

import { generateStars } from './src/shapes'
import { 
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PointLight,
  AmbientLight,
  TextureLoader,
} from "three";

const FOV = 75
let cameraWidth = window.innerWidth
let cameraHeight = window.innerHeight
const scene = new Scene();
const camera = new PerspectiveCamera(FOV, cameraWidth / cameraHeight, 20, 1000)
const renderer = new WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(cameraWidth, cameraHeight)
camera.position.setZ(30)
camera.position.setX(-25)

renderer.render(scene, camera)

const pointLight = new PointLight(0xffffff)
pointLight.position.set(1, 5, 5)
const ambientLight = new AmbientLight(0xffffff)


const spaceTexture = new TextureLoader().load(spaceBG)
scene.background = spaceTexture

scene.add(pointLight, ambientLight)
generateStars({scene, amount: 300})

let cameraTrackerX = 0.1
let cameraTrackerY = 0.1
let cameraTrackerZ = 0.1

function moveCamera() {
  cameraTrackerX += 0.025
  cameraTrackerY += 0.025
  cameraTrackerZ += 0.025
}
document.body.onscroll = moveCamera

const rotationSpeed = 0.01
const rotationStop = 0.01
function animate() {
  requestAnimationFrame( animate )

  cameraWidth = window.innerWidth
  cameraHeight = window.innerHeight

  if(cameraTrackerX > rotationStop){
    camera.rotation.x += cameraTrackerX * rotationSpeed
    cameraTrackerX -= cameraTrackerX * rotationSpeed
  }
  if(cameraTrackerY > rotationStop){
    camera.rotation.y += cameraTrackerY * rotationSpeed
    cameraTrackerY -= cameraTrackerY * rotationSpeed
  }
  if(cameraTrackerZ > rotationStop){
    camera.rotation.z += cameraTrackerZ * rotationSpeed
    cameraTrackerZ -= cameraTrackerZ * rotationSpeed
  }

  renderer.render( scene, camera )
};
animate()