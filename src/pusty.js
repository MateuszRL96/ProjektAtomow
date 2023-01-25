const GenerateAtom = () =>
    {
        const positions1 = new Float32Array(parameters.firstCount * 3)
        const scales = new Float32Array(parameters.count * 1)

        const insideColor = new THREE.Color(parameters.insideColor)
        const outsideColor = new THREE.Color(parameters.outsideColor)

        const createElectron2 = (r = 0.7, color = 0x443FF4) => {
            const sphere = createSphere(r, color);
            const pivot = new THREE.Object3D();
            pivot.add(sphere);
            return {
                sphere,
                pivot
            }
        }

        for(let i = 0; i < parameters.thirdCount; i++)
        {
            let c = i;
            const i3 = i * 3
            //Position
            const branchAngle = (i % parameters.branches) / parameters.secoundCount * Math.PI * 2

            position[i3 + 0] = Math.cos(branchAngle) * radius
            position[i3 + 1] = Math.sin(branchAngle) * radius
            position[i3 + 2] = 0;

            c = createElectron2(0.5);
        c.sphere.position.set(2 * d, 10,0);
        scene.add(c.pivot);
            
            
        }

        
        


    }

    GenerateAtom();