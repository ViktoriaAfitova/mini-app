import style from './styles.module.scss';
import { ZodiacPreview } from './ZodiacPreview';
import { ZodiacSign } from '../../api/types/types';

type Props = {
  zodiacSigns: ZodiacSign[];
  selectedZodiac: (zodiac: ZodiacSign) => void;
};

export const ZodiacList = ({ zodiacSigns, selectedZodiac }: Props) => {
  return (
    <div className={style.cardsList}>
      {zodiacSigns.map((zodiac) => (
        <div
          key={zodiac.sign}
          className={style.card}
          onClick={() => selectedZodiac(zodiac)}
        >
          <ZodiacPreview sign={zodiac.sign} period={zodiac.period} />
        </div>
      ))}
    </div>
  );
};
