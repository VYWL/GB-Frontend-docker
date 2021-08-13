import '@Styles/main/common.css';
import '@Styles/main/login.css';

import LoginFooterComponent from '@Components/Local/Login/LoginFooterComponent';
import OtherButtonComponent from '@Components/Local/Login/OtherButtonComponent';
import LoginFormComponent from '@Components/Local/Login/LoginFormComponent';

const LoginPage = () => {
    const handleSubmission = e => {
        e.preventDefault();

        console.log({
            id: e.target.userid.value,
            password: e.target.password.value,
        });
        // TODO :: Hook 연결 + FORM 제출 + 인증
    };

    return (
        <>
            <div id='container' class='login'>
                <h1 class='logo'>
                    <a href='/main'>밥브리타임</a>
                </h1>
                <form onSubmit={handleSubmission}>
                    <LoginFormComponent />

                    <OtherButtonComponent />
                </form>
            </div>

            <LoginFooterComponent />
        </>
    );
};

export default LoginPage;
