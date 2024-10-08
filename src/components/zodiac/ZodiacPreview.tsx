import { useTranslation } from 'react-i18next';
import style from './styles.module.scss';
import { ZodiacSign } from '../../api/types/types';

type Props = Pick<ZodiacSign, 'sign' | 'description' | 'period'>;

const ICONS: { [key: string]: string } = {
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

export const ZodiacPreview = ({ sign, description = '', period }: Props) => {
  const { t } = useTranslation();

  const dateRange = t(`dataRange.${sign}`, '');

  return (
    <>
      <h3 className={style.sign}>
        {t(`zodiac.${sign}`, sign)} {ICONS[sign]}
      </h3>
      <small className={style.period}>{dateRange}</small>
      {period && (
        <small className={style.period}>{t(`period.${period}`, period)}</small>
      )}
      {description && <p className={style.description}>{description}</p>}
    </>
  );
};
