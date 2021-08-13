const LoginFormComponent = () => {
    return (
        <>
            <p class='input'>
                <input type='text' name='userid' maxlength='20' class='text' placeholder='아이디' />
            </p>
            <p class='input'>
                <input type='password' name='password' maxlength='20' class='text' placeholder='비밀번호' />
            </p>
            <input type='hidden' name='redirect' value='/' />
            <p class='submit'>
                <input type='submit' value='로그인' class='text' />
            </p>
        </>
    );
};

export default LoginFormComponent;
