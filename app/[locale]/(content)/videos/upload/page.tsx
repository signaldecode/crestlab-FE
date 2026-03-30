import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('board.admin');
  return { title: `${t('uploadVideo')} | CrestLab` };
}

export default async function VideoUploadPage() {
  const t = await getTranslations('board.admin');
  return (
    <section>
      <h2>{t('uploadVideo')}</h2>
      <p>TODO: Video upload form will be implemented here</p>
    </section>
  );
}
