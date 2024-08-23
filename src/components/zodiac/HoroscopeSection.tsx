import { useEffect, useState } from 'react';
import style from './styles.module.scss';
import { ZodiacList } from './ZodiacList';
import { ZodiacDetails } from './ZodiacDetails';
import { ZodiacSign } from '../../api/types/types';
import { getHoroscope } from '../../api/api';

export const HoroscopeSection = () => {
  const [selectedZodiac, setSelectedZodiac] = useState<ZodiacSign | null>(null);
  const [zodiacSigns, setZodiacSigns] = useState<ZodiacSign[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchZodiacSigns = async () => {
    try {
      const data = await getHoroscope();
      if (data) {
        setZodiacSigns(data);
      } else {
        setError('Failed to load zodiac signs.');
      }
    } catch (error) {
      setError('Failed to load zodiac signs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchZodiacSigns();
  }, []);

  const handleSelectZodiac = (zodiac: ZodiacSign) => {
    setSelectedZodiac(zodiac);
  };

  const handleCloseDetails = () => {
    setSelectedZodiac(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!zodiacSigns) {
    return <p>No zodiac signs available.</p>;
  }

  return (
    <div className={style.container}>
      {selectedZodiac ? (
        <ZodiacDetails
          zodiacSigns={[selectedZodiac]}
          onClose={handleCloseDetails}
        />
      ) : (
        <ZodiacList zodiacSigns={zodiacSigns} selectedZodiac={handleSelectZodiac} />
      )}
    </div>
  );
};
