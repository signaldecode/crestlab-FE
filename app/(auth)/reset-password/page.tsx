import ResetPasswordFormContainer from '@/components/containers/auth/ResetPasswordFormContainer';
import authMsg from '@/messages/ko/auth.json';

export const metadata = {
  title: '비밀번호 재설정 | CrestLab',
  description: '휴대폰 인증 후 새 비밀번호를 설정할 수 있습니다.',
};

export default function ResetPasswordPage() {
  return <ResetPasswordFormContainer messages={authMsg.findAccount.resetPassword} />;
}
