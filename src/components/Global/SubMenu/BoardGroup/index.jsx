const BoardGroup = ({ boardList = [] }) => {
    const boardItems = boardList.map(elem => {
        const { href: link, boardID, title, isNew } = elem;

        return (
            <ul>
                <li>
                    <a href={link} data-id={boardID} className={isNew ? 'new' : ''}>
                        {title}
                    </a>
                </li>
            </ul>
        );
    });

    return (
        <>
            <div className='divider' />
            <div className='group'>{boardItems}</div>
        </>
    );
};

export default BoardGroup;
