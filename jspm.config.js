SystemJS.config({
  paths: {
    "npm:": "jspm_packages/npm/",
    "github:": "jspm_packages/github/",
    "toon-shader/": "src/"
  },
  browserConfig: {
    "baseURL": "/"
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.18"
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "toon-shader": {
      "main": "index.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        },
        "*.glsl": {
          "loader": "text"
        }
      }
    }
  },
  meta: {
    "mrdoob/three.js/controls/EditorControls": {
      "deps": [
        "mrdoob/three.js"
      ]
    },
    "mrdoob/three.js/postprocessing/ShaderPass": {
      "deps": [
        "mrdoob/three.js",
        "mrdoob/three.js/postprocessing/EffectComposer"
      ]
    },
    "mrdoob/three.js/postprocessing/RenderPass": {
      "deps": [
        "mrdoob/three.js",
        "mrdoob/three.js/postprocessing/EffectComposer"
      ]
    },
    "mrdoob/three.js/postprocessing/EffectComposer": {
      "deps": [
        "mrdoob/three.js",
        "mrdoob/three.js/shaders/CopyShader"
      ]
    },
    "mrdoob/three.js/shaders/CopyShader": {
      "deps": [
        "mrdoob/three.js"
      ]
    },
    "mrdoob/three.js/postprocessing/MaskPass": {
      "deps": [
        "mrdoob/three.js"
      ]
    },
    "mrdoob/three.js/loaders/STLLoader": {
      "deps": [
        "three.js"
      ]
    }
  },
  map: {
    "mrdoob/three.js/controls/EditorControls": "github:mrdoob/three.js@r83/examples/js/controls/EditorControls.js",
    "mrdoob/three.js/loaders/STLLoader": "github:mrdoob/three.js@r83/examples/js/loaders/STLLoader.js",
    "mrdoob/three.js/postprocessing/EffectComposer": "github:mrdoob/three.js@r83/examples/js/postprocessing/EffectComposer.js",
    "mrdoob/three.js/postprocessing/MaskPass": "github:mrdoob/three.js@r83/examples/js/postprocessing/MaskPass.js",
    "mrdoob/three.js/postprocessing/RenderPass": "github:mrdoob/three.js@r83/examples/js/postprocessing/RenderPass.js",
    "mrdoob/three.js/postprocessing/ShaderPass": "github:mrdoob/three.js@r83/examples/js/postprocessing/ShaderPass.js",
    "mrdoob/three.js/shaders/CopyShader": "github:mrdoob/three.js@r83/examples/js/shaders/CopyShader.js"
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "mrdoob/three.js": "github:mrdoob/three.js@r83",
    "text": "github:systemjs/plugin-text@0.0.9",
    "three.js": "github:mrdoob/three.js@r83"
  },
  packages: {}
});
