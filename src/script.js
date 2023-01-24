
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Floor
 */


    const createSphere =(r = 1, color = 0xb61241) => {
    const sphereGeo = new THREE.SphereGeometry(r, 20, 20);
    const sphereMat = new THREE.MeshPhongMaterial({
        color,
        shininess: 40,
    })
    return new THREE.Mesh(sphereGeo, sphereMat);
    };


    const createPointLight = (i = 1, color = 0xd117ef) => {
        return new THREE.PointLight(color, i);
    }



    const createElectron2 = (r = 0.7, color = 0x443FF4) => {
        const sphere = createSphere(r, color);
        const pivot = new THREE.Object3D();
        pivot.add(sphere);
        return {
            sphere,
            pivot
        }
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
    const wczytajLiczby = (a) => 
        {
            for(let i = 0; i < a; i++ )
            {
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
            } //for
            return tab1, tab2;
        }
     wczytajLiczby(10)
     
     console.log(tab1)
     console.log(tab2)

    /**for(let i=1; i<10; i++)
    {
        
        const i = createElectron3(0.5);
        //i.sphere.position.set(0, 3 ,0);
        i.sphere.position.x = 3;
        i.sphere.position.y = 3;
        i.sphere.position.z = 0;

    
        scene.add(i.pivot);
        
        tab[i] = i;
        console.log(tab[i])
        
    }
    
    
    for(let i =0; i < 9; i++)
    {
        let a = i;
        let b = i;
        tab1 = [b];
        //console.log(a);
        //console.log(b);
         a = createElectron3(0.5);
         tab2 = [a];
        a.sphere.position.set(2 * b, 10,0);
        scene.add(a.pivot);
        console.log(a);
        console.log(b);

    }
    */
    
/**
 *     
let e11 = createElectron3(0.5);
    e11.sphere.position.set(0,3,0);
    scene.add(e11.pivot);
 */





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
camera.position.set(2, 2, 20)
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