import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('board.admin');
  return { title: `${t('writeNotice')} | CrestLab` };
}

export default async function NoticeWritePage() {
  const t = await getTranslations('board.admin');
  return (
    <section>
      <h2>{t('writeNotice')}</h2>
      <p>TODO: Notice write form will be implemented here</p>
    </section>
  );
}
