const themeButtons = document.querySelectorAll('.theme ul li');
const body = document.querySelector('body');
const main = document.querySelector('main');
const monospaceFont = document.getElementById('monospace-font');

// Manejo de Monospaced
monospaceFont.addEventListener('click', () => {
  body.classList.toggle('monospace-font'); // Alterna la clase 'monospace-font'
  console.log("Monospaced font toggled!");
});

// Inicia en dark mode por defecto
body.classList.add('dark-mode');
main.classList.add('dark-mode');

// Manejo de temas
themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const mode = button.id; // Obtener el id del botón clicado

    if (mode === 'monospace-font') {
      // No cambiar el tema cuando se hace clic en Monospaced
      return;
    }

    // Quitar cualquier tema existente
    body.classList.remove('dark-mode', 'light-mode');
    main.classList.remove('dark-mode', 'light-mode');

    // Activar el nuevo tema
    body.classList.add(mode);
    main.classList.add(mode);
  });
});


const lists = document.querySelectorAll('.project-list, .FAQ-list');

// Variable para almacenar el padding inicial
let currentPadding = 200; // Padding inicial

// Función para ajustar el padding-top según el scroll de cada lista
function adjustPaddingOnScroll(event) {
  const list = event.target; // Detecta qué lista hizo scroll
  const scrollPosition = list.scrollTop;

  // Calcula el nuevo padding asegurando que no sea menor a 0
  const newPadding = Math.max(0, currentPadding - scrollPosition);

  // Aplica el nuevo padding-top a la lista específica
  list.style.paddingTop = `${newPadding}px`;

  console.log(`Nuevo padding para ${list.className}:`, newPadding);
}

// Agrega el evento de scroll a cada lista
lists.forEach(list => {
  list.addEventListener('scroll', adjustPaddingOnScroll);
});




/* CANVAS */
const canvas = document.getElementById("glCanvas");
const gl = canvas.getContext("webgl");

if (!gl) {
    alert("WebGL not supported");
}

function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const vertexShaderSource = `
    attribute vec2 position;
    varying vec2 vUv;
    void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
    }
`;

const fragmentShaderSource = `
    precision mediump float;
    varying vec2 vUv;
    uniform float uTime;
    uniform vec2 uResolution;

    void main() {
        vec2 uv = (vUv - 0.5) * 2.0; // Centrar coordenadas (-1 a 1)

        // Mover el círculo hacia la izquierda y abajo
        uv.x += 0.6;  // Desplazar a la izquierda (ajusta este valor)
        uv.y -= -0.7;  // Desplazar hacia abajo (ajusta este valor)

        float r = length(uv); // Distancia al centro
        float angle = atan(uv.y, uv.x) + uTime * 0.3; // Rotación más lenta
        float vinyl = smoothstep(0.3, 0.01, r); // Más desenfoque
        float grooves = sin(angle * 4.0) * 0.05; // Surcos del vinilo

        vec3 color = mix(vec3(0.0), vec3(1.0), vinyl - grooves);
        gl_FragColor = vec4(color, 0.1); // Opacidad baja para suavizar
    }
`;

function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
}

gl.useProgram(program);

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
const positions = [
    -1, -1,
    1, -1,
    -1,  1,
    -1,  1,
    1, -1,
    1,  1
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

const positionLocation = gl.getAttribLocation(program, "position");
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

const timeLocation = gl.getUniformLocation(program, "uTime");
const resolutionLocation = gl.getUniformLocation(program, "uResolution");

function render(time) {
    gl.uniform1f(timeLocation, time * 0.001);
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(render);
}

requestAnimationFrame(render);