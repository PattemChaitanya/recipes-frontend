import packageJson from "../../package.json";

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  const crd = pos.coords;

  return { long: crd.longitude, lat: crd.latitude, accuracy: crd.accuracy };
}

function errors(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

export const getDeviceInfo = async () => {
  let geoLocation;
  try {
    geoLocation = await new Promise((resolve, reject) => {
      window.navigator.geolocation.getCurrentPosition(
        (pos) => resolve(success(pos)),
        (err) => {
          errors(err);
          reject(err);
        },
        options
      );
    });
  } catch (err) {
    geoLocation = { long: null, lat: null, accuracy: null };
  }

  const deviceInfo = {
    app_version: packageJson.version,
    os_version: navigator.userAgent,
    device_model: navigator.platform,
    language: navigator.language,
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
    geoLocation,
    deviceType: window.screen.width > window.screen.height ? "web" : "mobile",
  };

  return deviceInfo;
};
