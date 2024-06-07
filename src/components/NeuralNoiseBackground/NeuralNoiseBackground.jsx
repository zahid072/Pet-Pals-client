import React, { useEffect, useRef } from "react";
import glsl from "glslify";
import "./neuralNoiseBackground.css";

const NeuralNoiseBackground = ({opacity}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (!gl) {
      alert("WebGL is not supported by your browser.");
      return;
    }

    const vertexShaderSrc = glsl`
      precision mediump float;

      varying vec2 vUv;
      attribute vec2 a_position;

      void main() {
          vUv = .5 * (a_position + 1.);
          gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSrc = glsl`
      precision mediump float;

      varying vec2 vUv;
      uniform float u_time;
      uniform float u_ratio;
      uniform vec2 u_pointer_position;
      uniform float u_scroll_progress;

      vec2 rotate(vec2 uv, float th) {
          return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
      }

      float neuro_shape(vec2 uv, float t, float p) {
          vec2 sine_acc = vec2(0.);
          vec2 res = vec2(0.);
          float scale = 8.;

          for (int j = 0; j < 15; j++) {
              uv = rotate(uv, 1.);
              sine_acc = rotate(sine_acc, 1.);
              vec2 layer = uv * scale + float(j) + sine_acc - t;
              sine_acc += sin(layer);
              res += (.5 + .5 * cos(layer)) / scale;
              scale *= (1.2 - .07 * p);
          }
          return res.x + res.y;
      }

      void main() {
          vec2 uv = .5 * vUv;
          uv.x *= u_ratio;

          vec2 pointer = vUv - u_pointer_position;
          pointer.x *= u_ratio;
          float p = clamp(length(pointer), 0., 1.);
          p = .5 * pow(1. - p, 2.);

          float t = .001 * u_time;
          vec3 color = vec3(0.);

          float noise = neuro_shape(uv, t, p);

          noise = 1.2 * pow(noise, 3.);
          noise += pow(noise, 10.);
          noise = max(.0, noise - .5);
          noise *= (1. - length(vUv - .5));

          color = normalize(vec3(.2, .5 + .4 * cos(3. * u_scroll_progress), .5 + .5 * sin(3. * u_scroll_progress)));

          color = color * noise;

          gl_FragColor = vec4(color, noise);
      }
    `;

    const createShader = (gl, sourceCode, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, sourceCode);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(
          "An error occurred compiling the shaders: " +
            gl.getShaderInfoLog(shader)
        );
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    };

    const vertexShader = createShader(gl, vertexShaderSrc, gl.VERTEX_SHADER);
    const fragmentShader = createShader(
      gl,
      fragmentShaderSrc,
      gl.FRAGMENT_SHADER
    );

    const createShaderProgram = (gl, vertexShader, fragmentShader) => {
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(
          "Unable to initialize the shader program: " +
            gl.getProgramInfoLog(program)
        );
        return null;
      }

      return program;
    };

    const shaderProgram = createShaderProgram(gl, vertexShader, fragmentShader);

    const uniforms = (() => {
      let uniforms = {};
      const uniformCount = gl.getProgramParameter(
        shaderProgram,
        gl.ACTIVE_UNIFORMS
      );
      for (let i = 0; i < uniformCount; i++) {
        const uniformName = gl.getActiveUniform(shaderProgram, i).name;
        uniforms[uniformName] = gl.getUniformLocation(
          shaderProgram,
          uniformName
        );
      }
      return uniforms;
    })();

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    gl.useProgram(shaderProgram);

    const positionLocation = gl.getAttribLocation(shaderProgram, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const render = () => {
      const currentTime = performance.now();
      gl.uniform1f(uniforms.u_time, currentTime);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(render);
    };

    render();

    const resizeCanvas = () => {
      const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uniforms.u_ratio, canvas.width / canvas.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const updateMousePosition = (eX, eY) => {
      const pointer = {
        x: eX,
        y: eY,
      };
      gl.uniform2f(
        uniforms.u_pointer_position,
        pointer.x / window.innerWidth,
        1 - pointer.y / window.innerHeight
      );
    };

    window.addEventListener("pointermove", (e) =>
      updateMousePosition(e.clientX, e.clientY)
    );
    window.addEventListener("touchmove", (e) =>
      updateMousePosition(
        e.targetTouches[0].clientX,
        e.targetTouches[0].clientY
      )
    );
    window.addEventListener("click", (e) =>
      updateMousePosition(e.clientX, e.clientY)
    );
  }, []);
  return <canvas className={`opacity-[${opacity}]`} ref={canvasRef} id="neuro">
  </canvas>;
};

export default NeuralNoiseBackground;
