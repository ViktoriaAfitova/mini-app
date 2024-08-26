import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import style from './styles.module.scss';
import { ZodiacList } from './ZodiacList';
import { ZodiacDetails } from './ZodiacDetails';
import { ZodiacSign } from '../../api/types/types';
import { getHoroscope } from '../../api/api';
import { useTelegram } from '../../hooks/useTelegram';

export const HoroscopeSection = () => {
  const { t, i18n } = useTranslation();
  const { getLanguageCode } = useTelegram();
  const [selectedZodiac, setSelectedZodiac] = useState<ZodiacSign | null>(null);
  const [zodiacSigns, setZodiacSigns] = useState<ZodiacSign[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const prevLanguage = useRef(i18n.language);

  const fetchZodiacSigns = async (language: string) => {
    try {
      const data = await getHoroscope(language);
      if (data) {
        setZodiacSigns(data);
      } else {
        setError('Failed to load zodiac signs');
      }
    } catch {
      setError('Failed to load zodiac signs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialLanguageCode = getLanguageCode();
    const appLanguage = initialLanguageCode === 'ru' ? 'original' : 'en';

    i18n.changeLanguage(appLanguage).then(() => {
      fetchZodiacSigns(appLanguage);
      prevLanguage.current = appLanguage;
    });
  }, []);

  useEffect(() => {
    if (prevLanguage.current !== i18n.language) {
      fetchZodiacSigns(i18n.language);
      prevLanguage.current = i18n.language;
    }
  }, [i18n.language]);

  useEffect(() => {
    if (selectedZodiac && zodiacSigns) {
      const updatedZodiac = zodiacSigns.find(
        (zodiac) => zodiac.sign === selectedZodiac.sign,
      );
      setSelectedZodiac(updatedZodiac || null);
    }
  }, [zodiacSigns, selectedZodiac]);

  const handleSelectZodiac = (zodiac: ZodiacSign) => {
    setSelectedZodiac(zodiac);
  };

  const handleCloseDetails = () => {
    setSelectedZodiac(null);
  };

  if (loading) {
    return <p>{t('Loading...')}</p>;
  }

  if (error) {
    return <p className='error'>{t(`${error}`)}</p>;
  }

  if (!zodiacSigns) {
    return <p>{t('No zodiac signs available')}</p>;
  }

  return (
    <div className={style.section}>
      {selectedZodiac ? (
        <ZodiacDetails
          className={style.cardDetails}
          zodiacSigns={[selectedZodiac]}
          onClose={handleCloseDetails}
        />
      ) : (
        <ZodiacList
          zodiacSigns={zodiacSigns}
          selectedZodiac={handleSelectZodiac}
        />
      )}
    </div>
  );
};
