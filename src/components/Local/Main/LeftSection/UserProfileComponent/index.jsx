const UserProfileComponent = props => {
    const { profileImgSrc = 'https://cf-fpi.everytime.kr/0.png', nickname, status } = props;

    return (
        <div class='card pconly'>
            <form class='logged'>
                <img src={profileImgSrc} class='picture' />

                <p class='nickname'>{nickname}</p>
                <p class='school'>{status}</p>
                <ul class='buttons'>
                    <li>
                        <a href='/my'>내 정보</a>
                    </li>
                    <li>
                        <a href='/user/logout'>로그아웃</a>
                    </li>
                </ul>
                <hr />
            </form>
        </div>
    );
};

export default UserProfileComponent;
