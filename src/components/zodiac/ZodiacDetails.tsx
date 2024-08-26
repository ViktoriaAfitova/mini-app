import { useTranslation } from 'react-i18next';
import { useSwipeable } from 'react-swipeable';
import style from './styles.module.scss';
import { ZodiacPreview } from './ZodiacPreview';
import { ZodiacSign } from '../../api/types/types';

type Props = {
  zodiacSigns: ZodiacSign[];
  className?: string;
  onClose: () => void;
};

export const ZodiacDetails = ({ zodiacSigns, className, onClose }: Props) => {
  const { t } = useTranslation();

  const handlers = useSwipeable({
    onSwipedRight: onClose,
    trackMouse: true,
  });

  if (zodiacSigns.length === 0) {
    return <p>{t('No zodiac sign selected')}</p>;
  }

  const zodiac = zodiacSigns[0];

  return (
    <div className={className} {...handlers}>
      <button type='button' className={style.backButton} onClick={onClose}>
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
