import { useState } from 'react';

const OtherButtonComponent = () => {
    const [isForgot, setForgotFlag] = useState(false);
    const clickForgotBtn = () => setForgotFlag(true);

    return (
        <>
            <label class='autologin'>
                <input type='checkbox' name='autologin' value='1' />
                누르면 복이와요
            </label>
            <p class='find'>
                <div style={{ cursor: 'pointer' }} onClick={clickForgotBtn}>
                    아이디/비밀번호 찾기
                </div>
            </p>

            {isForgot && (
                <p class='forgot'>
                    <div>
                        저런! 😩 까먹었다니... <br /> <strong>KAKAO ID : dksu40</strong>에게 연락주세요
                    </div>
                </p>
            )}

            <p class='register'>
                <span>밥브리타임에 처음이신가요?</span>
                <a href='/register'>회원가입</a>
            </p>
        </>
    );
};

export default OtherButtonComponent;
