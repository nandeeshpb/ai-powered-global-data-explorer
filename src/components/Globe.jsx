import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { cities, flights, latLngToVector3 } from '../utils/data';

const GLOBE_RADIUS = 1.6;

// Earth sphere with procedural shader-like material
function Earth({ rotationSpeed = 0.0008 }) {
  const meshRef = useRef();
  const cloudsRef = useRef();

  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += rotationSpeed;
    if (cloudsRef.current) cloudsRef.current.rotation.y += rotationSpeed * 1.3;
  });

  // Procedural earth texture using canvas
  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048; canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    
    // Ocean
    const grad = ctx.createLinearGradient(0, 0, 0, 1024);
    grad.addColorStop(0, '#0a1929');
    grad.addColorStop(0.5, '#0d2847');
    grad.addColorStop(1, '#0a1929');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 2048, 1024);

    // Continents (simplified blobs)
    ctx.fillStyle = '#1a3a5c';
    const continents = [
      // [x, y, w, h]
      [200, 250, 400, 280],   // N America
      [500, 550, 280, 350],   // S America
      [950, 280, 350, 250],   // Europe/Africa N
      [1000, 500, 300, 380],  // Africa
      [1350, 300, 450, 300],  // Asia
      [1600, 700, 200, 150],  // Australia
    ];
    continents.forEach(([x, y, w, h]) => {
      ctx.beginPath();
      ctx.ellipse(x, y, w/2, h/2, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    // Add texture noise
    for (let i = 0; i < 8000; i++) {
      const x = Math.random() * 2048;
      const y = Math.random() * 1024;
      ctx.fillStyle = `rgba(${Math.random() > 0.5 ? '40, 80, 120' : '20, 40, 70'}, ${Math.random() * 0.5})`;
      ctx.fillRect(x, y, 2, 2);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  return (
    <group>
      {/* Atmosphere glow */}
      <mesh scale={1.15}>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <shaderMaterial
          transparent
          side={THREE.BackSide}
          uniforms={{
            glowColor: { value: new THREE.Color('#00d4ff') }
          }}
          vertexShader={`
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec3 vNormal;
            uniform vec3 glowColor;
            void main() {
              float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
              gl_FragColor = vec4(glowColor, 1.0) * intensity;
            }
          `}
        />
      </mesh>

      {/* Inner atmosphere */}
      <mesh scale={1.04}>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Earth */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          emissive="#001a33"
          emissiveIntensity={0.3}
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>

      {/* Grid wireframe overlay */}
      <mesh ref={cloudsRef} scale={1.005}>
        <sphereGeometry args={[GLOBE_RADIUS, 32, 32]} />
        <meshBasicMaterial
          color="#00d4ff"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      <CityMarkers parentRef={meshRef} />
      <FlightArcs parentRef={meshRef} />
    </group>
  );
}

// Glowing city points
function CityMarkers({ parentRef }) {
  const groupRef = useRef();
  useFrame(() => {
    if (groupRef.current && parentRef.current) {
      groupRef.current.rotation.y = parentRef.current.rotation.y;
    }
  });

  return (
    <group ref={groupRef}>
      {cities.map((city, i) => {
        const pos = latLngToVector3(city.lat, city.lng, GLOBE_RADIUS * 1.01);
        return <CityPoint key={i} position={pos} index={i} />;
      })}
    </group>
  );
}

function CityPoint({ position, index }) {
  const ringRef = useRef();
  useFrame(({ clock }) => {
    if (ringRef.current) {
      const t = clock.getElapsedTime() + index * 0.3;
      const scale = 1 + Math.sin(t * 2) * 0.3;
      ringRef.current.scale.set(scale, scale, scale);
      ringRef.current.material.opacity = 0.6 + Math.sin(t * 2) * 0.3;
    }
  });

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.012, 12, 12]} />
        <meshBasicMaterial color="#00fff5" />
      </mesh>
      <mesh ref={ringRef}>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

// Animated flight arcs
function FlightArcs({ parentRef }) {
  const groupRef = useRef();
  useFrame(() => {
    if (groupRef.current && parentRef.current) {
      groupRef.current.rotation.y = parentRef.current.rotation.y;
    }
  });

  const arcs = useMemo(() => {
    return flights.map((flight) => {
      const fromCity = cities.find(c => c.name === flight.from);
      const toCity = cities.find(c => c.name === flight.to);
      if (!fromCity || !toCity) return null;

      const start = new THREE.Vector3(...latLngToVector3(fromCity.lat, fromCity.lng, GLOBE_RADIUS));
      const end = new THREE.Vector3(...latLngToVector3(toCity.lat, toCity.lng, GLOBE_RADIUS));
      const mid = start.clone().add(end).multiplyScalar(0.5);
      const arcHeight = start.distanceTo(end) * 0.5 + GLOBE_RADIUS * 0.3;
      mid.normalize().multiplyScalar(GLOBE_RADIUS + arcHeight);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(60);
      return { curve, points };
    }).filter(Boolean);
  }, []);

  return (
    <group ref={groupRef}>
      {arcs.map((arc, i) => (
        <Arc key={i} arc={arc} delay={i * 0.3} />
      ))}
    </group>
  );
}

function Arc({ arc, delay }) {
  const lineRef = useRef();
  const planeRef = useRef();

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(arc.points);
    return geo;
  }, [arc.points]);

  useFrame(({ clock }) => {
    const t = ((clock.getElapsedTime() + delay) % 4) / 4;
    if (planeRef.current) {
      const point = arc.curve.getPoint(t);
      planeRef.current.position.copy(point);
      const scale = Math.sin(t * Math.PI);
      planeRef.current.scale.setScalar(0.5 + scale * 0.8);
    }
  });

  return (
    <group>
      <line ref={lineRef} geometry={geometry}>
        <lineBasicMaterial
          color="#9d4edd"
          transparent
          opacity={0.4}
          linewidth={1}
        />
      </line>
      <mesh ref={planeRef}>
        <sphereGeometry args={[0.018, 8, 8]} />
        <meshBasicMaterial color="#ff006e" />
      </mesh>
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 3, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-5, -3, -5]} intensity={0.6} color="#9d4edd" />
      <pointLight position={[5, -3, 5]} intensity={0.4} color="#00d4ff" />
    </>
  );
}

export default function Globe({ rotationSpeed = 0.0008, enableZoom = true }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <SceneLights />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Earth rotationSpeed={rotationSpeed} />
        <OrbitControls
          enableZoom={enableZoom}
          enablePan={false}
          minDistance={2.5}
          maxDistance={8}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
          zoomSpeed={0.6}
          autoRotate={false}
        />
      </Suspense>
    </Canvas>
  );
}