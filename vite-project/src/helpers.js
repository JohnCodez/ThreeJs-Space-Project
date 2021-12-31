import {
  MathUtils,
} from "three";

export function getRandomXYZ(range) {
  const coordinates = {
    x: MathUtils.randFloatSpread( range ),
    y: MathUtils.randFloatSpread( range ),
    z: MathUtils.randFloatSpread( range ),
  }
  return coordinates;
}
