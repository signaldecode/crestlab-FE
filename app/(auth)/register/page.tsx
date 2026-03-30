import RegisterFormContainer from '@/components/containers/auth/RegisterFormContainer';
import authMsg from '@/messages/ko/auth.json';

export const metadata = {
  title: '회원가입 | CrestLab',
  description: 'CrestLab의 투자 교육을 무료로 시작하세요.',
};

export default function RegisterPage() {
  return <RegisterFormContainer messages={authMsg.register} />;
}
