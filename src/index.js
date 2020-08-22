import "./styles/styles.css";
import { PWAConfApp } from "./js/app";

async function registerSW() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("./sw.js");
    } catch (error) {
      window.alert("error during sw registration -> ", error);
    }
  } else {
    window.alert("sw registration is not supported");
  }
}
(function main() {
  window.addEventListener("load", (e) => {
    console.log("window loaded");
    new PWAConfApp();
    console.log("app loaded");
    registerSW();
  });
})();
