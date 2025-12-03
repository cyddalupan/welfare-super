import {
  findClosestIonContent,
  scrollToTop
} from "./chunk-NHI4VGHO.js";
import {
  readTask,
  writeTask
} from "./chunk-4Y2RWIQT.js";
import {
  componentOnReady
} from "./chunk-7I4W2NTL.js";
import "./chunk-GIWC7F3R.js";
import "./chunk-2RBMRLQD.js";

// node_modules/@ionic/core/components/status-tap.js
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
