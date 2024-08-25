import { useTranslation } from 'react-i18next';
import style from './styles.module.scss';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div>
      <button
        className={style.button}
        type='button'
        onClick={() => changeLanguage('en')}
      >
        en
      </button>
      <span>/</span>
      <button
        className={style.button}
        type='button'
        onClick={() => changeLanguage('ru')}
      >
        ру
      </button>
    </div>
  );
};

export default LanguageSwitcher;
