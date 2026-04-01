import { getMessages, getTranslations } from 'next-intl/server';
import NoticeWriteContainer from '@/components/containers/board/NoticeWriteContainer';

export async function generateMetadata() {
  const t = await getTranslations('board.admin.noticeWriteForm');
  return { title: `${t('title')} | CrestLab` };
}

export default async function NoticeWritePage() {
  const t = await getTranslations('board.admin.noticeWriteForm');
  const allMessages = await getMessages();
  const common = allMessages.common as Record<string, unknown>;

  const messages = {
    title: t('title'),
    subtitle: t('subtitle'),
    noticeTitle: t('noticeTitle'),
    noticeTitlePlaceholder: t('noticeTitlePlaceholder'),
    content: t('content'),
    contentPlaceholder: t('contentPlaceholder'),
    submit: t('submit'),
    submitAriaLabel: t('submitAriaLabel'),
    backToList: t('backToList'),
    errors: {
      titleRequired: t('errors.titleRequired'),
      contentRequired: t('errors.contentRequired'),
    },
  };

  return (
    <NoticeWriteContainer
      messages={messages}
      editorMessages={common.editor as never}
    />
  );
}
