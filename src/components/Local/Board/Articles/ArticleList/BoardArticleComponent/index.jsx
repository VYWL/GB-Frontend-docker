import { BACK_URL } from '@Functions/';

const BoardArticleComponent = props => {
    const {
        title,
        content,
        timestamp,
        writer,
        vote,
        comment,
        articleid = 0,
        boardid,
        boardNm = '자유게시판',
        articleType = 1, // 1 : 일반게, 2 : hot게
        more = false,
        fileCount = 0,
        imageCount = 0,
        thumbnail = '',
    } = props;

    const boardHref = `/board/${boardid}`;
    const articleHref = `/board/${boardid}/v/${articleid}`;

    // TODO :: 공감 기능 구현

    const isFiles = fileCount !== 0;
    const isAttach = imageCount !== 0;

    // TODO :: image 맨 첫번째것을 썸네일로 가져오는 코드.
    const url = `${BACK_URL}${thumbnail}`;
    const bgImageAttr = `url("${url}")`;

    switch (articleType) {
        case 1:
            return (
                <article>
                    <a className='article' href={articleHref}>
                        <div className='attachthumbnail' style={{ backgroundImage: bgImageAttr }} />
                        <h2 className='medium'>{title}</h2>
                        <p className='small'>{content}</p>
                        <time className='small'>{timestamp}</time>
                        <h3 className='small'>{writer}</h3>
                        <ul className='status'>
                            {isAttach && <li className='attach'>{imageCount}</li>}
                            {/* <li title='공감' className='vote'>
                                {vote}
                            </li> */}
                            <li title='댓글' className='comment'>
                                {comment}
                            </li>
                            {isFiles && (
                                <li title='첨부파일' className='files'>
                                    {fileCount}
                                </li>
                            )}
                        </ul>
                        <hr />
                        {/* <input type='hidden' name='201147507_comment_anonym' value='0' /> */}
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
