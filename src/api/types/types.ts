export interface HoroscopeResponse {
  horoscope: Record<string, string>;
  period: string;
}

export interface ZodiacSign {
  sign: string;
  description?: string;
  period: string;
}
