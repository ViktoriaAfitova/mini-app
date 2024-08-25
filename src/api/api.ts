import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from './const/baseUrl';
import { HoroscopeResponse, ZodiacSign } from './types/types';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    return Promise.reject(error);
  },
);

const mapHoroscopeData = (data: HoroscopeResponse): ZodiacSign[] => {
  return Object.keys(data.horoscope).map((sign) => ({
    sign,
    description: data.horoscope[sign],
    period: data.period,
  }));
};

export const getHoroscope = async (
  language: string,
): Promise<ZodiacSign[] | null> => {
  try {
    const selectedLanguage = language === 'ru' ? 'original' : language;

    const response = await api.post('/get_horoscope/', {
      language: selectedLanguage,
      period: 'today',
    });

    return mapHoroscopeData(response.data);
  } catch {
    throw new Error('Failed to fetch horoscope data');
  }
};
