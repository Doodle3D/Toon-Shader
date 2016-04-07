System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  meta: {
    "mrdoob/three.js/controls/EditorControls": {
      "deps": [
        "mrdoob/three.js"
      ]
    },
    "mrdoob/three.js/postprocessing/ShaderPass": {
      "deps": [
        "mrdoob/three.js"
      ]
    },
    "mrdoob/three.js/postprocessing/RenderPass": {
      "deps": [
        "mrdoob/three.js"
      ]
    },
    "mrdoob/three.js/postprocessing/EffectComposer": {
      "deps": [
        "mrdoob/three.js",
        "mrdoob/three.js/postprocessing/ShaderPass",
        "mrdoob/three.js/postprocessing/MaskPass",
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
    }
  },

  map: {
    "babel": "npm:babel-core@5.8.38",
    "babel-runtime": "npm:babel-runtime@5.8.38",
    "core-js": "npm:core-js@1.2.6",
    "mrdoob/three.js": "github:mrdoob/three.js@master",
    "mrdoob/three.js/controls/EditorControls": "github:mrdoob/three.js@master/examples/js/controls/EditorControls.js",
    "mrdoob/three.js/postprocessing/EffectComposer": "github:mrdoob/three.js@master/examples/js/postprocessing/EffectComposer.js",
    "mrdoob/three.js/postprocessing/MaskPass": "github:mrdoob/three.js@master/examples/js/postprocessing/MaskPass.js",
    "mrdoob/three.js/postprocessing/RenderPass": "github:mrdoob/three.js@master/examples/js/postprocessing/RenderPass.js",
    "mrdoob/three.js/postprocessing/ShaderPass": "github:mrdoob/three.js@master/examples/js/postprocessing/ShaderPass.js",
    "mrdoob/three.js/shaders/CopyShader": "github:mrdoob/three.js@master/examples/js/shaders/CopyShader.js",
    "text": "github:systemjs/plugin-text@0.0.7",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.38": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:core-js@1.2.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
