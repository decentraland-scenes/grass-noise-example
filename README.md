# grass-noise-example

Using the Noise Utils library to simulate random grass movement from wind

This scene uses the [noise utils](https://github.com/decentraland/decentraland-noise-utils) library to generate a semi-random sequence that uses a 3d version of the _Simplex_ formula to change the rotation of grass over time.

![](screenshot/screenshot.gif)

The first two dimensions of the Simplex formula are mapped to the x and z coordinate of each grass entity, the thrid dimension of the Simplex formula is iterated over time to create movement.

The grass movement is random, but follows a smooth series of transitions that appear to move close grass entities together. The movement patterns are deterministic, but start from a random seed and don't have clear recognizeable repeating patterns.

## Try it out

**Install the CLI**

Download and install the Decentraland CLI by running the following command:

```bash
npm i -g decentraland
```

**Previewing the scene**

Download this example and navigate to its directory, then run:

```
$:  dcl start
```

Any dependencies are installed and then the CLI opens the scene in a new browser tab.

**Scene Usage**

Click on the grass to start the movement. Each grass clump moves independently, following its own values from the Simplex random noise algorithm.

Learn more about how to build your own scenes in our [documentation](https://docs.decentraland.org/) site.

If something doesn’t work, please [file an issue](https://github.com/decentraland-scenes/Awesome-Repository/issues/new).

## Copyright info

This scene is protected with a standard Apache 2 licence. See the terms and conditions in the [LICENSE](/LICENSE) file.
