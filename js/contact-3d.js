// 3D Model for Contact Page
document.addEventListener('DOMContentLoaded', function() {
    // Check if the canvas element exists
    const canvas = document.getElementById('contact-3d-canvas');
    if (!canvas) return;

    // Set canvas size to fill the screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize Three.js
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        antialias: true,
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xff0000, 1, 100);
    pointLight.position.set(10, 5, 0);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x0000ff, 1, 100);
    pointLight2.position.set(-10, -5, 0);
    scene.add(pointLight2);
    
    // Create a group to hold all objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    
    // Create a more complex 3D model - Tech-themed floating objects
    
    // 1. Central Sphere (Core)
    const coreGeometry = new THREE.IcosahedronGeometry(3, 1);
    const coreMaterial = new THREE.MeshPhongMaterial({
        color: 0x2194ce,
        emissive: 0x072534,
        wireframe: true,
        transparent: true,
        opacity: 0.9
    });
    
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(core);
    
    // 2. Inner Sphere (Data Layer)
    const innerGeometry = new THREE.IcosahedronGeometry(2.5, 1);
    const innerMaterial = new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        emissive: 0x003344,
        transparent: true,
        opacity: 0.3
    });
    
    const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
    mainGroup.add(innerSphere);
    
    // 3. Orbiting Rings
    const ringGeometry = new THREE.TorusGeometry(5, 0.1, 16, 100);
    const ringMaterial = new THREE.MeshPhongMaterial({
        color: 0xff3300,
        transparent: true,
        opacity: 0.7
    });
    
    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring1.rotation.x = Math.PI / 2;
    mainGroup.add(ring1);
    
    const ring2 = new THREE.Mesh(ringGeometry, ringMaterial.clone());
    ring2.rotation.x = Math.PI / 4;
    ring2.rotation.y = Math.PI / 4;
    mainGroup.add(ring2);
    
    // 4. Floating Cubes
    const cubes = [];
    const cubeCount = 15;
    
    for (let i = 0; i < cubeCount; i++) {
        const size = Math.random() * 0.5 + 0.3;
        const cubeGeometry = new THREE.BoxGeometry(size, size, size);
        const cubeMaterial = new THREE.MeshPhongMaterial({
            color: Math.random() * 0xffffff,
            transparent: true,
            opacity: 0.7
        });
        
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        
        // Position cubes in a spherical pattern around the core
        const radius = Math.random() * 3 + 6;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        cube.position.x = radius * Math.sin(phi) * Math.cos(theta);
        cube.position.y = radius * Math.sin(phi) * Math.sin(theta);
        cube.position.z = radius * Math.cos(phi);
        
        // Random rotation
        cube.rotation.x = Math.random() * Math.PI;
        cube.rotation.y = Math.random() * Math.PI;
        
        cubes.push({
            mesh: cube,
            orbitRadius: radius,
            orbitSpeed: Math.random() * 0.01 + 0.005,
            orbitAngle: Math.random() * Math.PI * 2,
            rotationSpeed: {
                x: Math.random() * 0.02 - 0.01,
                y: Math.random() * 0.02 - 0.01,
                z: Math.random() * 0.02 - 0.01
            }
        });
        
        mainGroup.add(cube);
    }
    
    // 5. Particle System (Stars)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);
    const particleColors = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
        // Position stars throughout the scene
        const radius = Math.random() * 50 + 10;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        posArray[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        posArray[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        posArray[i * 3 + 2] = radius * Math.cos(phi);
        
        // Random colors for particles
        particleColors[i * 3] = Math.random();
        particleColors[i * 3 + 1] = Math.random();
        particleColors[i * 3 + 2] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Animation variables
    let rotationSpeed = 0.005;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Track mouse movement across the entire document
    document.addEventListener('mousemove', function(event) {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Add touch support for mobile
    document.addEventListener('touchmove', function(event) {
        event.preventDefault();
        const touch = event.touches[0];
        mouseX = (touch.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(touch.clientY / window.innerHeight) * 2 + 1;
    }, { passive: false });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Smooth camera movement following mouse
        targetX = mouseX * 5;
        targetY = mouseY * 5;
        mainGroup.position.x += (targetX - mainGroup.position.x) * 0.05;
        mainGroup.position.y += (targetY - mainGroup.position.y) * 0.05;
        
        // Rotate the main group
        mainGroup.rotation.y += rotationSpeed;
        mainGroup.rotation.x += rotationSpeed * 0.5;
        
        // Rotate the inner sphere in the opposite direction
        innerSphere.rotation.y -= rotationSpeed * 1.5;
        innerSphere.rotation.z += rotationSpeed * 0.7;
        
        // Rotate the rings
        ring1.rotation.z += rotationSpeed * 0.7;
        ring2.rotation.z -= rotationSpeed * 0.5;
        
        // Animate the cubes
        cubes.forEach(cube => {
            // Update orbit position
            cube.orbitAngle += cube.orbitSpeed;
            
            // Calculate new position based on orbit
            cube.mesh.position.x = Math.sin(cube.orbitAngle) * cube.orbitRadius;
            cube.mesh.position.z = Math.cos(cube.orbitAngle) * cube.orbitRadius;
            
            // Rotate the cube
            cube.mesh.rotation.x += cube.rotationSpeed.x;
            cube.mesh.rotation.y += cube.rotationSpeed.y;
            cube.mesh.rotation.z += cube.rotationSpeed.z;
        });
        
        // Slowly rotate the particle system
        particlesMesh.rotation.y += rotationSpeed * 0.1;
        
        // Render the scene
        renderer.render(scene, camera);
    }
    
    // Start animation
    animate();
});