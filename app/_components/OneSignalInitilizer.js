"use client";
import { useEffect } from "react";

export default function OneSignalInitializer() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 🚫 Skip initializing on localhost
    if (window.location.hostname === "localhost") {
      console.log("OneSignal disabled on localhost during development.");
      return;
    }

    const onesignalScript = document.createElement("script");
    onesignalScript.src =
      "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
    onesignalScript.defer = true;
    document.head.appendChild(onesignalScript);

    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async function (OneSignal) {
      await OneSignal.init({
        appId: "be21b5ea-0bb7-4f3e-96f0-836f54491009",
        safari_web_id:
          "web.onesignal.auto.69735df3-8f8c-40d7-a01f-205a16828de8",
        notifyButton: {
          enable: true,
          position: "bottom-right",
          offset: {
            bottom: "80px",
            right: "10px",
          },
        },
      });
    });
  }, []);

  return null;
}
