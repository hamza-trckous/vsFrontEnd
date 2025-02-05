export interface UserData {
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

export interface EventData {
  event_name: string;
  event_time: number;
  user_data: UserData;
  custom_data: CustomData;
}
