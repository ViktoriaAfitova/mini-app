import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import style from './styles.module.scss';
import { ZodiacList } from './ZodiacList';
import { ZodiacDetails } from './ZodiacDetails';
import { ZodiacSign } from '../../api/types/types';
import { getHoroscope } from '../../api/api';

export const HoroscopeSection = () => {
  const { t, i18n } = useTranslation();
  const [selectedZodiac, setSelectedZodiac] = useState<ZodiacSign | null>(null);
  const [zodiacSigns, setZodiacSigns] = useState<ZodiacSign[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchZodiacSigns = async (language: string) => {
    try {
      const data = await getHoroscope(language === 'ru' ? 'original' : 'en');
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
    fetchZodiacSigns(i18n.language);

    if (selectedZodiac && zodiacSigns) {
      const updatedZodiac = zodiacSigns.find(
        (zodiac) => zodiac.sign === selectedZodiac.sign,
      );
      setSelectedZodiac(updatedZodiac || null);
    }
  }, [i18n.language, zodiacSigns]);

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
    return <p className='error'>`{t(`${error}`)}</p>;
  }

  if (!zodiacSigns) {
    return <p>{t('No zodiac signs available')}</p>;
  }

  return (
    <div className={style.container}>
      {selectedZodiac ? (
        <ZodiacDetails
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
