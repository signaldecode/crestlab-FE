import FindIdFormContainer from '@/components/containers/auth/FindIdFormContainer';
import authMsg from '@/messages/ko/auth.json';

export const metadata = {
  title: '아이디 찾기 | CrestLab',
  description: '가입 시 등록한 휴대폰 번호로 아이디를 찾을 수 있습니다.',
};

export default function FindIdPage() {
  return <FindIdFormContainer messages={authMsg.findAccount.findId} />;
}
