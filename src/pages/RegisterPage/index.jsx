import '@Styles/register.css';

import RegisterFormInfo from '@Components/Local/Register/RegisterFormInfo';
import OptionComponent from '@Components/Local/Register/OptionComponent';
import InputComponent from '@Components/Local/Register/InputComponent';

const RegisterPage = () => {
    const trackList = [
        { name: '디지털포렌식', value: 'Digital forensic' },
        { name: '보안제품개발', value: 'Security product development' },
        { name: '보안 컨설팅', value: 'Security consulting' },
        { name: '취약점 분석', value: 'Vulnerability analysis' },
    ];

    const handleSubmit = e => {
        e.preventDefault();

        const isPasswordValid = e.target.password.value === e.target.chk.value;
        const isTrackValid = e.target.track.value !== 'none';

        if (!isTrackValid) {
            alert('트랙을 골라주세요.');
            return;
        }

        if (!isPasswordValid) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        console.log({
            track: e.target.track.value,
            id: e.target.id.value,
            pw: e.target.password.value,
        });
        // TODO :: Hook 이랑 연결 + 인증 관련 처리
    };

    return (
        <form id='container' onSubmit={handleSubmit}>
            <RegisterFormInfo />

            <OptionComponent title='트랙' dataType='track' defaultOption='트랙 선택' optionList={trackList} />

            <InputComponent title='아이디' dataType='id' placeholder='아이디를 입력하세요.' />

            <InputComponent title='비밀번호' dataType='password' placeholder='비밀번호를 입력하세요.' isBlind />

            <InputComponent title='비밀번호 확인' dataType='chk' placeholder='비밀번호를 다시 입력하세요.' isBlind />

            <input type='submit' value='제출' style={{ cursor: 'pointer' }} />
        </form>
    );
};

export default RegisterPage;
