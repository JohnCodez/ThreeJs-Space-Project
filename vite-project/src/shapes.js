import moonImg from '../images/moon.jpg'
import moonNormalImg from '../images/normal.jpg'

import {
  Mesh,
  MeshStandardMaterial,
  SphereGeometry,
  TextureLoader,
} from "three";
import { getRandomXYZ } from "./helpers";

const moonTexture = new TextureLoader().load(moonImg)
const normalTexture = new TextureLoader().load(moonNormalImg)

export const moon = new Mesh(
  new SphereGeometry(8, 32, 32),
  new MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
)

export function moonIdleAnimation(){
  moon.rotation.x += 0.001
  moon.rotation.y += 0.005
  moon.rotation.z += 0.001
}

export function generateStars({ amount, scene }) {
  const geometry = new SphereGeometry(0.25, 24, 24)
  const material = new MeshStandardMaterial({ color: 0xffffff })

  for(let i = 0; i < amount; i++) {
    const star = new Mesh( geometry, material )
    const {x, y, z} = getRandomXYZ(200)
    star.position.set(x, y, z)
    scene.add(star)
  }
}
