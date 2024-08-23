export const useTelegram = () => {
  const tg = (window as any)?.Telegram?.WebApp || {
    close: () => console.log('Telegram WebApp closed'),
    ready: () => console.log('Telegram WebApp ready'),
  };

  const onClose = () => {
    tg.close();
  };

  return {
    tg,
    onClose,
  };
};
