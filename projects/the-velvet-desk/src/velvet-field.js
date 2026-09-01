import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uProgress;
  uniform vec2 uPointer;
  uniform vec2 uResolution;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1., 0.)), f.x), mix(hash(i + vec2(0., 1.)), hash(i + vec2(1.)), f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.;
    float amplitude = .5;
    for (int i = 0; i < 5; i++) {
      value += noise(p) * amplitude;
      p = p * 2.03 + 7.1;
      amplitude *= .5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / max(uResolution.y, 1.), 1.);
    vec2 p = (uv - .5) * aspect;
    p += uPointer * .018;

    float t = uTime * .055;
    float n = fbm(p * 2.2 + vec2(t, -t * .55));
    float folds = sin((p.x * 5.2 + n * 2.1 + uProgress * 1.6) * 5.5);
    folds += sin((p.x * 2.1 - p.y * 1.7 - t + n) * 7.2) * .42;
    folds = smoothstep(-.7, 1.25, folds);

    float portal = length(p - vec2(.21 - uProgress * .09, -.01));
    float portalGlow = smoothstep(.68, .05, portal) * (.22 + uProgress * .3);
    float rim = smoothstep(.34, .31, abs(portal - .33)) * .28;
    float vignette = smoothstep(1.08, .2, length(p * vec2(.78, 1.08)));

    vec3 ink = vec3(.022, .017, .020);
    vec3 wine = vec3(.20, .018, .055);
    vec3 velvet = vec3(.43, .035, .105);
    vec3 ivory = vec3(.91, .74, .51);
    vec3 color = mix(ink, wine, n * .78 + folds * .18);
    color = mix(color, velvet, folds * (.17 + uProgress * .08));
    color += ivory * (portalGlow * .13 + rim);
    color *= .45 + vignette * .62;
    color += (hash(gl_FragCoord.xy + uTime) - .5) * .022;
    gl_FragColor = vec4(color, 1.);
  }
`;

export function createVelvetField(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'high-performance' });
  const scene = new THREE.Scene();
  const camera = new THREE.Camera();
  const geometry = new THREE.PlaneGeometry(2, 2);
  const uniforms = {
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uPointer: { value: new THREE.Vector2() },
    uResolution: { value: new THREE.Vector2(1, 1) },
  };
  const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, depthTest: false });
  scene.add(new THREE.Mesh(geometry, material));

  const resize = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const pixelRatio = Math.min(window.devicePixelRatio, 1.7);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height, false);
    uniforms.uResolution.value.set(width * pixelRatio, height * pixelRatio);
  };

  resize();
  window.addEventListener('resize', resize);

  return {
    render({ progress, pointer, time }) {
      uniforms.uTime.value = time;
      uniforms.uProgress.value = progress;
      uniforms.uPointer.value.set(pointer.x, -pointer.y);
      renderer.render(scene, camera);
    },
    destroy() {
      window.removeEventListener('resize', resize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
