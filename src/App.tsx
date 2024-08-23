import { useEffect } from 'react';
import { useTelegram } from './hooks/useTelegram';
import LanguageSwitcher from './features/LanguageSwitcher';
import Navigator from './navigation/Navigator';

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg]);
  
  return (
    <>
      <LanguageSwitcher />
      <Navigator />
    </>
  );
}

export default App;
