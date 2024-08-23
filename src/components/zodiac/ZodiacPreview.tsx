import { useTranslation } from 'react-i18next';
import style from './styles.module.scss';
import { ZodiacSign } from '../../api/types/types';

type Props = Pick<ZodiacSign, 'sign' | 'description' | 'period'>;

const icons: { [key: string]: string } = {
  aries: '🐏',
  taurus: '🐂',
  gemini: '👯‍♂️',
  cancer: '🦀',
  leo: '🦁',
  virgo: '♍',
  libra: '♎',
  scorpio: '🦂',
  sagittarius: '🎯',
  capricorn: '🐐',
  aquarius: '🏺',
  pisces: '🐟',
};

export const ZodiacPreview = ({ 
  sign,
  description = '',
  period 
}: Props) => {
  const { t } = useTranslation();

  return (
    <div className={style.card}>
      <h3 className={style.name}>{t(`zodiac.${sign}`, sign)} {icons[sign]}</h3>
      <small className={style.period}>{t(`period.${period}`, period)}</small>
      {description && <p className={style.description}>{description}</p>}
    </div>
  );
};
