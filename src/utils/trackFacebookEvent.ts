const trackFacebookEvent = ({
  eventName,
  data,
  isAdmin,
}: {
  eventName: string;
  data: { [key: string]: string | number | boolean | object };
  isAdmin: boolean;
}) => {
  // Only track events if the user is not an admin
  if (isAdmin) {
    console.log("Admin user, not tracking event:", eventName);
    return;
  }

  if (!data || Object.keys(data).length === 0) {
    console.log("No event data to send for", eventName);
    return;
  }

  if (window.fbq) {
    window.fbq("track", eventName, data);
    console.log("Facebook Pixel event tracked:", eventName, data);
  } else {
    console.warn("Facebook Pixel not initialized");
  }
};

export default trackFacebookEvent;
