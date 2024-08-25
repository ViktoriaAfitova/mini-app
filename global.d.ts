interface TelegramWebApp {
  initDataUnsafe: {
    user: {
      language_code: string;
    };
  };
}

interface Window {
  Telegram: {
    WebApp: TelegramWebApp;
  };
}
