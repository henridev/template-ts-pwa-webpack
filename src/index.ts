import "./styles/styles.css";
import { PWAConfApp } from "./modules/app";

async function registerSW() {
  if ("serviceWorker" in navigator) {
    try {
      console.log("registration start");
      await navigator.serviceWorker.register("./sw.js");
      console.log("Service Worker registered! 😎");
    } catch (error) {
      window.alert(`error during sw registration -> ${error}`);
    }
  } else {
    window.alert("sw registration is not supported");
  }
}

(function main() {
  window.addEventListener("load", (e: Event) => {
    console.log("window loaded");
    new PWAConfApp();
    console.log("app loaded");
    registerSW();
  });
})();
