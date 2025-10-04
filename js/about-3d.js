/**
 * SoftCodec Premium Website
 * 3D Illustration for About Page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if the about 3D container exists
    const aboutContainer = document.getElementById('about-3d');
    if (!aboutContainer) return;

    // Set up Three.js scene
    const scene = new THREE.Scene();
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(75, aboutContainer.clientWidth / aboutContainer.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true 
    });
    renderer.setSize(aboutContainer.clientWidth, aboutContainer.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    aboutContainer.appendChild(renderer.domElement);
    
    // Handle window resize
    window.addEventListener('resize', function() {
        camera.aspect = aboutContainer.clientWidth / aboutContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(aboutContainer.clientWidth, aboutContainer.clientHeight);
    });
    
    // Create a group to hold all objects
    const group = new THREE.Group();
    scene.add(group);
    
    // Create abstract 3D shapes
    
    // Central cube
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshPhongMaterial({
        color: 0x14B8A6,
        transparent: true,
        opacity: 0.8,
        shininess: 100
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    group.add(cube);
    
    // Surrounding spheres
    const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x06B6D4,
        transparent: true,
        opacity: 0.7,
        shininess: 100
    });
    
    // Create spheres in a circular pattern
    const sphereCount = 8;
    const radius = 2;
    const spheres = [];
    
    for (let i = 0; i < sphereCount; i++) {
        const angle = (i / sphereCount) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = Math.sin(angle * 2) * 0.5;
        
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(x, y, z);
        sphere.userData = { 
            originalPosition: { x, y, z },
            angle: angle
        };
        group.add(sphere);
        spheres.push(sphere);
    }
    
    // Create connecting lines
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x3B82F6,
        transparent: true,
        opacity: 0.5
    });
    
    // Connect each sphere to the cube
    spheres.forEach(sphere => {
        const points = [];
        points.push(new THREE.Vector3(0, 0, 0)); // Cube center
        points.push(new THREE.Vector3(
            sphere.position.x, 
            sphere.position.y, 
            sphere.position.z
        ));
        
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(lineGeometry, lineMaterial);
        group.add(line);
    });
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate the entire group
        group.rotation.y += 0.005;
        group.rotation.x += 0.002;
        
        // Animate spheres
        spheres.forEach(sphere => {
            const time = Date.now() * 0.001;
            const angle = sphere.userData.angle;
            
            // Make spheres move slightly up and down
            sphere.position.y = sphere.userData.originalPosition.y + Math.sin(time + angle) * 0.2;
            sphere.position.x = sphere.userData.originalPosition.x + Math.cos(time + angle) * 0.1;
        });
        
        // Pulse the cube
        const time = Date.now() * 0.001;
        const scale = 1 + Math.sin(time) * 0.1;
        cube.scale.set(scale, scale, scale);
        
        // Render scene
        renderer.render(scene, camera);
    }
    
    // Start animation
    animate();
    
    // Add mouse interaction
    let isDragging = false;
    let previousMousePosition = {
        x: 0,
        y: 0
    };
    
    aboutContainer.addEventListener('mousedown', function(e) {
        isDragging = true;
    });
    
    aboutContainer.addEventListener('mousemove', function(e) {
        const deltaMove = {
            x: e.offsetX - previousMousePosition.x,
            y: e.offsetY - previousMousePosition.y
        };
        
        if (isDragging) {
            const rotationSpeed = 0.01;
            
            group.rotation.y += deltaMove.x * rotationSpeed;
            group.rotation.x += deltaMove.y * rotationSpeed;
        }
        
        previousMousePosition = {
            x: e.offsetX,
            y: e.offsetY
        };
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
    });
    
    // Add touch interaction for mobile
    aboutContainer.addEventListener('touchstart', function(e) {
        isDragging = true;
        previousMousePosition = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
    });
    
    aboutContainer.addEventListener('touchmove', function(e) {
        const deltaMove = {
            x: e.touches[0].clientX - previousMousePosition.x,
            y: e.touches[0].clientY - previousMousePosition.y
        };
        
        if (isDragging) {
            const rotationSpeed = 0.01;
            
            group.rotation.y += deltaMove.x * rotationSpeed;
            group.rotation.x += deltaMove.y * rotationSpeed;
        }
        
        previousMousePosition = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
    });
    
    aboutContainer.addEventListener('touchend', function() {
        isDragging = false;
    });
});