interface UserData {
  em: string;
  client_ip_address: string;
  client_user_agent: string;
  fbc: string;
  ph: string;
  fbp: string;
  external_id: string;
  fb_login_id: string;
  fn: string;
  st: string;
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
  }
}

interface CustomData {
  currency: string;
  value: number;
}

interface EventData {
  event_name: string;
  event_time: number;
  user_data: UserData;
  custom_data: CustomData;
}

export const trackConversion = async (eventData: EventData): Promise<void> => {
  console.log("Sending conversion event:");

  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/track-conversion`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response from server:", errorData);
      const errorMessage =
        errorData.error?.error?.message || "Failed to send conversion event";
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log("Conversion event sent successfully:", data);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Error validating access token")
    ) {
      console.error("Access token has expired. Please refresh the token.");
    } else {
      console.error("Error sending conversion event:", error);
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
