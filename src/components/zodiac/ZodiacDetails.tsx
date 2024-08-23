import { useTranslation } from 'react-i18next';
import style from './styles.module.scss';
import { ZodiacPreview } from './ZodiacPreview';
import { ZodiacSign } from '../../api/types/types';
import { useSwipeable } from 'react-swipeable';

type Props = {
  zodiacSigns: ZodiacSign[];
  onClose: () => void;
};

export const ZodiacDetails = ({ zodiacSigns, onClose }: Props) => {
  const { t } = useTranslation();

  if (zodiacSigns.length === 0) {
    return <p>{t('No zodiac sign selected')}</p>;
  }

  const zodiac = zodiacSigns[0];

  const handlers = useSwipeable({
    onSwipedRight: onClose,
    trackMouse: true,
  });

  return (
    <div className={style.details} {...handlers}>
      <button className={style.backButton} onClick={onClose}>
        {t('Back')}
      </button>
      <ZodiacPreview
        sign={zodiac.sign}
        period={zodiac.period}
        description={zodiac.description}
      />
    </div>
  );
};
