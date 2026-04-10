const LOCALE_MAP: Record<string, string> = {
  ko: 'ko-KR',
  en: 'en-US',
  ja: 'ja-JP',
  zh: 'zh-CN',
};

/**
 * Format fetchedAt ISO string into a localized date+time string,
 * then inject it into the i18n template's {time} placeholder.
 *
 * Examples:
 *  ko: "2026.04.10 23:33(미국시간) 기준 데이터"
 *  en: "Data as of Apr 10, 2026 23:33 (ET)"
 *  ja: "2026/04/10 23:33(米国時間) 基準データ"
 *  zh: "2026/4/10 23:33(美国时间) 基准数据"
 */
export function formatFetchedAt(
  iso: string,
  template: string,
  locale: string = 'en',
): string {
  const d = new Date(iso);
  const resolvedLocale = LOCALE_MAP[locale] ?? 'en-US';

  const date = d.toLocaleDateString(resolvedLocale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'America/New_York',
  });

  const time = d.toLocaleTimeString(resolvedLocale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/New_York',
  });

  return template.replace('{time}', `${date} ${time}`);
}
