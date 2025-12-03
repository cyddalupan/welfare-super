import {
  findClosestIonContent,
  scrollToTop
} from "./chunk-KVUZ5BUU.js";
import {
  componentOnReady
} from "./chunk-7FFH6ZJ7.js";
import {
  readTask,
  writeTask
} from "./chunk-SZBHOXEU.js";
import "./chunk-2RBMRLQD.js";

// node_modules/@ionic/core/dist/esm/status-tap-5DQ7Fc4V.js
var startStatusTap = () => {
  const win = window;
  win.addEventListener("statusTap", () => {
    readTask(() => {
      const width = win.innerWidth;
      const height = win.innerHeight;
      const el = document.elementFromPoint(width / 2, height / 2);
      if (!el) {
        return;
      }
      const contentEl = findClosestIonContent(el);
      if (contentEl) {
        new Promise((resolve) => componentOnReady(contentEl, resolve)).then(() => {
          writeTask(async () => {
            contentEl.style.setProperty("--overflow", "hidden");
            await scrollToTop(contentEl, 300);
            contentEl.style.removeProperty("--overflow");
          });
        });
      }
    });
  });
};
export {
  startStatusTap
};
