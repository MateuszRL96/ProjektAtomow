
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()
const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Colors


    /**
     * Stałeee
     */
    const parameters = {}
    parameters.insideColor = '#ff6030'
    parameters.outsideColor = '#1b3984'
    parameters.radius = 5
    parameters.firstCount = 10
    parameters.secoundCount = 8
    parameters.thirdCount = 18

    let material = null
    
    let geometry = null



/**
 * Floor
 */


    const createSphere =(r = 1, color = 0xb61241) => {
    const sphereGeo = new THREE.SphereGeometry(r, 20, 20);
    const sphereMat = new THREE.MeshPhongMaterial({
        color,
        shininess: 40,
        uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
    })
    
    return new THREE.Mesh(sphereGeo, sphereMat);
    };


    const createPointLight = (i = 1, color = 0xd117ef) => {
        return new THREE.PointLight(color, i);
    }




    const createElectron3 = (r = 0.7, color = 0xFAF3080) => {
        const sphere = createSphere(r, color);
        const pivot = new THREE.Object3D();
        pivot.add(sphere);
        return {
            sphere,
            pivot
        }
    }
    let tab1 = [];
    let tab2 = [];
    //wczytajLiczby(10,5)
    const wczytajLiczby = (ilosc , promien) => 
        {
            /**
             * Geometry
             */
            geometry = new THREE.BufferGeometry()

            const position = new Float32Array(ilosc * 3)
            const scales = new Float32Array(parameters.count * 1)

            for(let i = 0; i < ilosc; i++ )
            {
                const i3 = i * 3
                // Position
                const radius = Math.random() * promien

                const branchAngle = (i % ilosc) / ilosc * Math.PI * 2

                position[i3 + 0] = Math.cos(branchAngle) * radius
                position[i3 + 1] = Math.sin(branchAngle) * radius
                position[i3 + 2] = 0;
                /*
                let c = i;
                let d = i;
                tab1 = [c];
                //console.log(a);
                //console.log(b);
                c = createElectron3(0.5);
                tab2 = [d];
                c.sphere.position.set(2 * d, 10,0);
                scene.add(c.pivot);
                console.log(c);
                console.log(d);
                */
                // Scale
                 scales[i] = Math.random()
            } 
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

            material = (r = 0.7, color = 0x443FF4) => {
                const sphere = createSphere(r, color);
                const pivot = new THREE.Object3D();
                pivot.add(sphere);
                return {
                    sphere,
                    pivot
                }
            }
        }

     wczytajLiczby(10 , 10)



     
     console.log(tab1)
     console.log(tab2)


    const nucleus = createSphere(3);
    const l1 = createPointLight();
    const l2 = createPointLight();
    l1.position.set(30, 5, 30);
    l2.position.set(-30, 15, 40);

    scene.add(nucleus, l2);
    nucleus.add(l1);

    
/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 2, 30)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
    
    
    
}

tick()