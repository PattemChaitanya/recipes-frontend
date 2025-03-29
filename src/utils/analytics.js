import { apiService } from '../services/api';

export const trackEvent = async (eventData) => {
  try {
    await apiService.postAnalytics({
      eventName: eventData?.eventName,
      type: eventData?.type,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

export const trackDeviceInfo = async (deviceInfo) => {
  try {
    await apiService.postAnalytics({
      deviceInfo,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error tracking device info:', error);
  }
}; 