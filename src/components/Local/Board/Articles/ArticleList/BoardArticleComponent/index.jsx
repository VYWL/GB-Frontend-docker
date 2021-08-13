const BoardArticleComponent = props => {
    const {
        title,
        content,
        timestamp,
        isAnony = false,
        writerNm = 'user',
        vote,
        comment,
        articleID = 0,
        boardID,
        boardNm = '',
        articleType = 1, // 1 : 일반게, 2 : hot게
        more = false,
    } = props;

    const boardHref = `/board/${boardID}`;
    const articleHref = `/board/${boardID}/v/${articleID}`;
    const writer = isAnony ? '익명' : writerNm;

    switch (articleType) {
        case 1:
            return (
                <article>
                    <a className='article' href={articleHref}>
                        <h2 className='medium'>{title}</h2>
                        <p className='small'>{content}</p>
                        <time className='small'>{timestamp}</time>
                        <h3 className='small'>{writer}</h3>
                        <ul className='status'>
                            <li title='공감' className='vote'>
                                {vote}
                            </li>
                            <li title='댓글' className='comment'>
                                {comment}
                            </li>
                        </ul>
                        <hr />
                        <input type='hidden' name='201147507_comment_anonym' value='0' />
                    </a>
                    <div className='comments'></div>
                </article>
            );
        case 2:
            return (
                <article>
                    <a className='article' href={articleHref}>
                        <img src='https://cf-fpi.everytime.kr/0.png' class='picture medium' />
                        <h3 className='medium'>{writer}</h3>
                        <time className='medium'>{timestamp}</time>
                        <hr />
                        <p class='medium'>{content}</p>
                        {more && <span class='more'>... 더 보기</span>}
                        <a href={boardHref} class='boardname'>
                            {boardNm}
                        </a>
                        <ul className='status'>
                            <li title='공감' className='vote'>
                                {vote}
                            </li>
                            <li title='댓글' className='comment'>
                                {comment}
                            </li>
                        </ul>
                        <hr />
                        {/* <input type='hidden' name='201147507_comment_anonym' value='0' /> */}
                    </a>
                    <div className='comments'></div>
                </article>
            );
        default:
            return <div></div>;
    }
};

export default BoardArticleComponent;
