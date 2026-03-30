import LoginFormContainer from '@/components/containers/auth/LoginFormContainer';
import authMsg from '@/messages/ko/auth.json';

export const metadata = {
  title: '로그인 | CrestLab',
  description: 'CrestLab 계정으로 로그인하세요.',
};

export default function LoginPage() {
  return <LoginFormContainer messages={authMsg.login} />;
}
