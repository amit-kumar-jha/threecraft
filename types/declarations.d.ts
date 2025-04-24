declare module "three/examples/jsm/controls/OrbitControls" {
  import { Camera, EventDispatcher, Vector3 } from "three";

  export class OrbitControls extends EventDispatcher {
    constructor(object: Camera, domElement?: HTMLElement);

    // Add your preferred controls API methods here
    update(): void;
    saveState(): void;
    reset(): void;
    dispose(): void;

    // Other properties from OrbitControls API
    enabled: boolean;
    target: Vector3;
    minDistance: number;
    maxDistance: number;
    maxPolarAngle: number;
    minPolarAngle: number;
    maxAzimuthAngle: number;
    minAzimuthAngle: number;
    enableDamping: boolean;
    dampingFactor: number;
    enableZoom: boolean;
    zoomSpeed: number;
    enableRotate: boolean;
    rotateSpeed: number;
    screenSpacePanning: boolean;
    panSpeed: number;
    keyPanSpeed: number;
    mouseButtons: { LEFT: number; MIDDLE: number; RIGHT: number };
    keys: { LEFT: number; UP: number; RIGHT: number; BOTTOM: number };
  }
}
