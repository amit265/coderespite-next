// CoderRespite Analytics Abstraction Layer

export interface AnalyticsEvent {
  eventName: string;
  params?: Record<string, any>;
}

export interface UserProperties {
  theme?: 'dark' | 'light';
  device?: string;
  browser?: string;
  language?: string;
  preferredTech?: string;
}

class AnalyticsManager {
  private isInitialized = false;

  public init() {
    if (typeof window === 'undefined') return;
    
    console.log('[Analytics] Initializing Analytics & Growth engine...');
    this.isInitialized = true;
  }

  public trackEvent(eventName: string, params?: Record<string, any>) {
    if (typeof window === 'undefined') return;
    
    const cleanName = eventName.toLowerCase().replace(/\s+/g, '_');
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics Event] ${cleanName}:`, params || {});
    }

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', cleanName, params);
    }
  }

  public setUserProperties(properties: UserProperties) {
    if (typeof window === 'undefined') return;

    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics User Properties] Set:', properties);
    }

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('set', 'user_properties', properties);
    }
  }
}

export const analytics = new AnalyticsManager();
