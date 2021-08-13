const MenuListItem = props => {
    const { name: menuName, href } = props;
    const isNowTab = menuName === '게시판';
    // TODO :: 링크 별로 nowtab 활성화

    return (
        <li className={isNowTab ? 'active' : ''}>
            <a href={href}>{menuName}</a>
        </li>
    );
};

export default MenuListItem;
