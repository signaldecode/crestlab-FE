import { getMessages, getTranslations } from 'next-intl/server';
import BoardWriteContainer from '@/components/containers/board/BoardWriteContainer';

export async function generateMetadata() {
  const t = await getTranslations('board.community.writeForm');
  return { title: `${t('title')} | CrestLab` };
}

export default async function BoardWritePage() {
  const t = await getTranslations('board.community.writeForm');
  const allMessages = await getMessages();
  const common = allMessages.common as Record<string, unknown>;

  const messages = {
    title: t('title'),
    subtitle: t('subtitle'),
    postTitle: t('postTitle'),
    postTitlePlaceholder: t('postTitlePlaceholder'),
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
    <BoardWriteContainer
      messages={messages}
      editorMessages={common.editor as never}
    />
  );
}
