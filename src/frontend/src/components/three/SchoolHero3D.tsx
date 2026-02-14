import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';

function SchoolBuilding() {
  return (
    <group>
      {/* Main building */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[4, 2, 3]} />
        <meshStandardMaterial color="#e8dcc4" />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, 2.5, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[3, 1, 4]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>

      {/* Windows */}
      {[-1, 0, 1].map((x) => (
        <mesh key={x} position={[x * 1.2, 1.2, 1.51]}>
          <boxGeometry args={[0.6, 0.8, 0.1]} />
          <meshStandardMaterial color="#87ceeb" />
        </mesh>
      ))}

      {/* Door */}
      <mesh position={[0, 0.5, 1.51]}>
        <boxGeometry args={[0.8, 1, 0.1]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#90EE90" />
      </mesh>
    </group>
  );
}

export default function SchoolHero3D() {
  return (
    <Canvas className="h-full w-full">
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[8, 4, 8]} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <SchoolBuilding />
      </Suspense>
    </Canvas>
  );
}
