import type { FC } from "react";
import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three";
import type { Mesh } from "three";

/**
 * 地球の球体メッシュ
 * 参考: https://zenn.dev/sdkfz181tiger/books/735e854bee9fc9/viewer/52dbb0
 */
const EarthSphere: FC = () => {
  const meshRef = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, "/textures/earth.jpg");

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

type EarthProps = {
  /** Canvas の幅 */
  width?: number | string;
  /** Canvas の高さ */
  height?: number | string;
};

/**
 * 地球を表示するコンポーネント
 *
 * React Three Fiber を使用して、テクスチャ付きの地球を 3D レンダリングします。
 * マウス操作で回転・ズームが可能です。
 */
export const Earth: FC<EarthProps> = ({ width = "100%", height = 500 }) => {
  return (
    <div style={{ width, height }}>
      <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 3, 5]} intensity={2} />
        <directionalLight position={[-5, -2, -3]} intensity={0.8} />
        <hemisphereLight args={["#ffffff", "#4488ff", 0.6]} />
        <EarthSphere />
        <OrbitControls enableZoom enablePan={false} />
      </Canvas>
    </div>
  );
};
