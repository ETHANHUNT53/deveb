import * as THREE from 'three'
import vertexShader from './shaders/vertexShader.glsl'
import fragmentShader from './shaders/fragmentShader.glsl'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

// // Setup scene
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#canvas'),
    antialias: true,
    alpha:true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// Create icosahedron
const geometry = new THREE.IcosahedronGeometry(2, 50,50)


const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        uTime: { value: 0 },
        uColorChange:{
            value: 0
        }
    },
    
    // wireframe: true
})
const mesh = new THREE.Mesh(geometry, material)
mesh.position.y = -2.5;
scene.add(mesh)

// Position camera
camera.position.z = 3;

var tl = gsap.timeline({
    scrollTrigger:{
        trigger: ".landing",
        start:"top top",
        end:"bottom center",
        scrub: 2,
        // markers: true
    }
})

tl.to(mesh.position,{
    y:0,
    z:-2,
    ease:"power2.inOut"
}, "a"
).to(material.uniforms.uColorChange,{
    value: 1 ,
    ease: "power2.inOut",
}, "a"
)
.to(".landing h1",{
    opacity:0
}, "a")
.to(".landing p",{
    opacity:1
})

// Animation loop
const clock = new THREE.Clock()

function animate() {
    const elapsedTime = clock.getElapsedTime()
    
    // Update uniforms
    material.uniforms.uTime.value = elapsedTime; 
    
    // Rotate mesh
    // mesh.rotation.x = elapsedTime * 0.3
    // mesh.rotation.y = elapsedTime * 0.2
    
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

// Handle resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})

animate();
