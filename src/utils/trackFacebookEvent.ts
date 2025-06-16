const trackFacebookEvent = ({
  eventName,
  data,
  isAdmin
}: {
  eventName: string;
  data: { [key: string]: string | number | boolean | object };
  isAdmin: boolean;
}) => {
  // Only track events if the user is not an admin
  if (isAdmin) {
    return;
  }

  if (!data || Object.keys(data).length === 0) {
    return;
  }

  if (window.fbq) {
    window.fbq("track", eventName, data);
  } else {
    console.warn("Facebook Pixel not initialized");
  }
};

export default trackFacebookEvent;
