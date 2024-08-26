export const useTelegram = () => {
  const tg = (window as any)?.Telegram?.WebApp || {
    close: () => console.log('Telegram WebApp closed'),
    ready: () => console.log('Telegram WebApp ready'),
    initDataUnsafe: {
      user: {
        language_code: 'en',
      },
    },
  };

  const getLanguageCode = () => {
    const languageCode = tg.initDataUnsafe?.user?.language_code || 'en';
    return languageCode;
  };

  return {
    tg,
    onClose: tg.close,
    getLanguageCode,
  };
};
