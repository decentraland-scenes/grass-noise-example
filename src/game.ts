import { Noise } from '@dcl/noise-utils'

@Component('WaveGrass')
export class WaveGrass {}

// --- Set up a system ---
let t = 0
class PerlinNoiseSystem implements ISystem {
  // this group will contain every entity that has a WaveGrass and a Transform component
  group = engine.getComponentGroup(WaveGrass, Transform)

  update(dt: number) {
    t += dt / 4

    // iterate over the entities of the group
    for (const entity of this.group.entities) {
      // get the Transform component of the entity
      const transform = entity.getComponent(Transform)

      // rotate grass blades along x axis based on noise
      transform.rotation.x =
        Noise.simplex3(
          transform.position.x / 16,
          t,
          transform.position.z / 16
        ) / 3

      // rotate grass blades along z axis based on noise
      transform.rotation.z =
        Noise.simplex3(
          transform.position.z / 16,
          t,
          transform.position.x / 16
        ) / 3
    }
  }
}
// --- ground ---
const ground = new Entity()
ground.addComponent(new Transform({ position: new Vector3(8, 0, 8) }))
ground.addComponent(new GLTFShape('models/ground.glb'))
engine.addEntity(ground)

/// --- Spawner function ---
engine.addSystem(new PerlinNoiseSystem())

function spawnGrass(shape: Shape, x: number, y: number, z: number) {
  // create the entity
  const grass = new Entity()

  // add a transform to the entity
  grass.addComponent(
    new Transform({
      position: new Vector3(x, y, z),
      rotation: Quaternion.Euler(0, Math.random() * 30, 0),
      scale: new Vector3(1, 0.5 + Math.random() / 2, 1),
    })
  )

  // add a shape to the entity
  grass.addComponent(shape)
  grass.addComponent(new WaveGrass())

  const col = new Material()
  col.albedoColor = new Color3(x / 16, y / 16, z / 4)
  grass.addComponent(col)

  // add the entity to the engine
  engine.addEntity(grass)

  return grass
}

/// --- Spawn grass blades ---

const grassShape = new GLTFShape('models/grass.glb')
const grass2Shape = new GLTFShape('models/grass2.glb')
const grass3Shape = new GLTFShape('models/grass3.glb')

for (let x = 0.7; x < 15.4; x++) {
  for (let y = 0.7; y < 15.4; y++) {
    // select a glb mesh randomly from the 3 variations
    const selector = Math.random()

    if (selector > 0.66) {
      spawnGrass(grassShape, x, 0, y)
    } else if (selector > 0.33) {
      spawnGrass(grass2Shape, x, 0, y)
    } else {
      spawnGrass(grass3Shape, x, 0, y)
    }
  }
}

let started = false
