/**
 * SoftCodec Premium Website
 * 3D Globe Animation for Hero Section
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if the hero globe container exists
    const globeContainer = document.getElementById('hero-globe');
    if (!globeContainer) return;

    // Set up Three.js scene
    const scene = new THREE.Scene();
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(75, globeContainer.clientWidth / globeContainer.clientHeight, 0.1, 1000);
    camera.position.z = 200;
    
    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true 
    });
    renderer.setSize(globeContainer.clientWidth, globeContainer.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    globeContainer.appendChild(renderer.domElement);
    
    // Handle window resize
    window.addEventListener('resize', function() {
        camera.aspect = globeContainer.clientWidth / globeContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(globeContainer.clientWidth, globeContainer.clientHeight);
    });
    
    // Create globe geometry
    const globeGeometry = new THREE.SphereGeometry(80, 64, 64);
    
    // Create globe material
    const globeMaterial = new THREE.MeshPhongMaterial({
        color: 0x3B82F6,
        transparent: true,
        opacity: 0.8,
        shininess: 100
    });
    
    // Create globe mesh
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);
    
    // Create atmosphere
    const atmosphereGeometry = new THREE.SphereGeometry(82, 64, 64);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x14B8A6,
        transparent: true,
        opacity: 0.3,
        side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);
    
    // Create points on the globe
    const pointsGroup = new THREE.Group();
    scene.add(pointsGroup);
    
    // Generate random points
    for (let i = 0; i < 200; i++) {
        const phi = Math.acos(-1 + (2 * Math.random()));
        const theta = Math.random() * Math.PI * 2;
        
        const x = 80 * Math.sin(phi) * Math.cos(theta);
        const y = 80 * Math.sin(phi) * Math.sin(theta);
        const z = 80 * Math.cos(phi);
        
        const pointGeometry = new THREE.SphereGeometry(0.5, 8, 8);
        const pointMaterial = new THREE.MeshBasicMaterial({
            color: 0xFFFFFF
        });
        
        const point = new THREE.Mesh(pointGeometry, pointMaterial);
        point.position.set(x, y, z);
        pointsGroup.add(point);
    }
    
    // Create connections between points
    const connectionsGroup = new THREE.Group();
    scene.add(connectionsGroup);
    
    // Generate random connections
    for (let i = 0; i < 50; i++) {
        const startPoint = pointsGroup.children[Math.floor(Math.random() * pointsGroup.children.length)];
        const endPoint = pointsGroup.children[Math.floor(Math.random() * pointsGroup.children.length)];
        
        if (startPoint !== endPoint) {
            const start = startPoint.position;
            const end = endPoint.position;
            
            const curvePoints = [];
            curvePoints.push(new THREE.Vector3(start.x, start.y, start.z));
            
            // Create a slightly curved line
            const midPoint = new THREE.Vector3(
                (start.x + end.x) / 2,
                (start.y + end.y) / 2,
                (start.z + end.z) / 2
            );
            
            // Push the midpoint slightly outward
            const direction = new THREE.Vector3(midPoint.x, midPoint.y, midPoint.z).normalize();
            midPoint.add(direction.multiplyScalar(10));
            
            curvePoints.push(midPoint);
            curvePoints.push(new THREE.Vector3(end.x, end.y, end.z));
            
            const curve = new THREE.QuadraticBezierCurve3(
                curvePoints[0],
                curvePoints[1],
                curvePoints[2]
            );
            
            const points = curve.getPoints(50);
            const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
            
            const lineMaterial = new THREE.LineBasicMaterial({
                color: 0x06B6D4,
                transparent: true,
                opacity: 0.5
            });
            
            const line = new THREE.Line(lineGeometry, lineMaterial);
            connectionsGroup.add(line);
        }
    }
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
    directionalLight.position.set(200, 200, 200);
    scene.add(directionalLight);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate globe
        globe.rotation.y += 0.001;
        atmosphere.rotation.y += 0.001;
        pointsGroup.rotation.y += 0.001;
        connectionsGroup.rotation.y += 0.001;
        
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
    
    globeContainer.addEventListener('mousedown', function(e) {
        isDragging = true;
    });
    
    globeContainer.addEventListener('mousemove', function(e) {
        const deltaMove = {
            x: e.offsetX - previousMousePosition.x,
            y: e.offsetY - previousMousePosition.y
        };
        
        if (isDragging) {
            const rotationSpeed = 0.005;
            
            globe.rotation.y += deltaMove.x * rotationSpeed;
            globe.rotation.x += deltaMove.y * rotationSpeed;
            
            atmosphere.rotation.y += deltaMove.x * rotationSpeed;
            atmosphere.rotation.x += deltaMove.y * rotationSpeed;
            
            pointsGroup.rotation.y += deltaMove.x * rotationSpeed;
            pointsGroup.rotation.x += deltaMove.y * rotationSpeed;
            
            connectionsGroup.rotation.y += deltaMove.x * rotationSpeed;
            connectionsGroup.rotation.x += deltaMove.y * rotationSpeed;
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
    globeContainer.addEventListener('touchstart', function(e) {
        isDragging = true;
        previousMousePosition = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
    });
    
    globeContainer.addEventListener('touchmove', function(e) {
        const deltaMove = {
            x: e.touches[0].clientX - previousMousePosition.x,
            y: e.touches[0].clientY - previousMousePosition.y
        };
        
        if (isDragging) {
            const rotationSpeed = 0.005;
            
            globe.rotation.y += deltaMove.x * rotationSpeed;
            globe.rotation.x += deltaMove.y * rotationSpeed;
            
            atmosphere.rotation.y += deltaMove.x * rotationSpeed;
            atmosphere.rotation.x += deltaMove.y * rotationSpeed;
            
            pointsGroup.rotation.y += deltaMove.x * rotationSpeed;
            pointsGroup.rotation.x += deltaMove.y * rotationSpeed;
            
            connectionsGroup.rotation.y += deltaMove.x * rotationSpeed;
            connectionsGroup.rotation.x += deltaMove.y * rotationSpeed;
        }
        
        previousMousePosition = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
    });
    
    globeContainer.addEventListener('touchend', function() {
        isDragging = false;
    });
});