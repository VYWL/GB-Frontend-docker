const CardLeftItemMenu = () => {
    const menuInfo = [
        { title: '내가 쓴 글', endpoint: 'myarticle' },
        { title: '댓글 단 글', endpoint: 'mycommentarticle' },
    ];

    const menuList = menuInfo.map(({ title, endpoint = '' }) => {
        return (
            <a href={`/${endpoint}`} class={`${endpoint}`}>
                {title}
            </a>
        );
    });

    return (
        <div class='menus'>
            {menuList}
            <hr />
        </div>
    );
};

export default CardLeftItemMenu;
