varying vec2 vUv;
varying float vElevation;
uniform float uColorChange;

void main() {
    vec4 color1 = vec4(0.51, 0.51, 0.95, 1.0);
    vec4 color2 = vec4(0.63, 0.79, 0.99, 1.0);

    vec4 color3 = vec4(0.98, 0.86, 0.6, 1.0);
    vec4 color4 = vec4(1.0, 0.92, 0.74, 1.0);

    float v = smoothstep(-.14, .14, vElevation);

    vec4 colorBlue = mix(color1,color2,v);
    vec4 colorYellow = mix(color3,color4,v);

    vec4 final = mix(colorBlue,colorYellow, uColorChange);
    gl_FragColor = final; // Simple red color
}