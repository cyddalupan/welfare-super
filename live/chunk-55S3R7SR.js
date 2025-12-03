import {
  win
} from "./chunk-OLOXINNV.js";

// node_modules/@ionic/core/dist/esm/capacitor-CFERIeaU.js
var getCapacitor = () => {
  if (win !== void 0) {
    return win.Capacitor;
  }
  return void 0;
};

export {
  getCapacitor
};
