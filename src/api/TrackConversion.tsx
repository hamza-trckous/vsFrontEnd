import { EventData } from "@/Types/TrackConversion";
import { url } from "@/utils/api";

export const trackConversion = async (eventData: EventData): Promise<void> => {
  try {
    const response = await fetch(`${url}/api/sheets/api/track-conversion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.error?.error?.message || "Failed to send conversion event";
      throw new Error(errorMessage);
    }
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Error validating access token")
    ) {
    } else {
    }
    throw error;
  }
};

export const injectFacebookPixel = (id: string) => {
  if (!window.fbq) {
    (function (
      f: Window,
      b: Document,
      e: string,
      v: string,
      n?: ((...args: unknown[]) => void) & {
        callMethod?: (...args: unknown[]) => void;
        queue?: unknown[];
        push?: (...args: unknown[]) => void;
        loaded?: boolean;
        version?: string;
      },
      t?: HTMLScriptElement,
      s?: HTMLScriptElement
    ) {
      if (window.fbq) return;
      n = f.fbq = function (...args: unknown[]) {
        if (n && n.callMethod) {
          n.callMethod(...args);
        } else {
          if (n && n.queue) {
            n.queue.push([...args]);
          }
        }
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e) as HTMLScriptElement;
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0] as HTMLScriptElement;
      if (s.parentNode) {
        s.parentNode.insertBefore(t, s);
      }
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js"
    );

    if (window.fbq) {
      (window.fbq as (...args: unknown[]) => void)("init", id);
    }
    if (window.fbq) {
      (window.fbq as (...args: unknown[]) => void)("track", "PageView");
    }
  }
};
