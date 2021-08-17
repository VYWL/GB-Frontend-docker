import { COMMENT_ENDPOINT } from '@Functions/';
import { fetchData } from '@Hooks/';
import CommentWriteForm from '../CommentWriteForm';

const CommentComponent = props => {
    const {
        commentID,
        isReply,
        writer,
        content,
        timestamp,
        vote,
        isDel,
        isLast = false,
        isWriteMode = false,
        setWriteMode,
        articleID,
        parentcid = 0,
    } = props;

    const displayVoteCount = vote === 0 ? 'none' : '';
    const commentType = isReply ? 'child' : 'parent';

    // TODO :: 공감 비공감 구현
    // TODO :: Writer를 알아내는 것 (로그인 구현 이후)
    const isWriter = false;

    const writerComment = !isDel ? (isWriter ? 'medium writer' : 'medium') : 'medium disabled';
    const writerName = !isDel ? (isWriter ? `${writer}(글쓴이)` : writer) : '(삭제)';

    const replyWriteMode = isWriteMode && isLast;

    const handleDelete = async e => {
        e.preventDefault();

        const password = prompt('비밀번호 확인');

        const url = `${COMMENT_ENDPOINT}/${commentID}`;

        const submitData = {
            password: password,
            articleid: articleID,
        };

        const response = await fetchData('delete', url, submitData);

        if (response.msg === 'success') {
            alert('댓글을 삭제했습니다.');
            window.location.reload();
        } else {
            alert('비밀번호가 틀립니다.');
        }
    };

    return (
        <>
            <article class={commentType}>
                <img src='https://cf-fpi.everytime.kr/0.png' class='picture medium' />
                <h3 class={writerComment}>{writerName}</h3>
                {!isDel && (
                    <ul class='status'>
                        {!isReply && (
                            <li class='childcomment' onClick={() => setWriteMode(p => !p)}>
                                대댓글
                            </li>
                        )}

                        {/* <li class='commentvote'>공감</li>
                        <li class='abuse'>비공감</li> */}
                        <li class='delete' onClick={handleDelete}>
                            삭제
                        </li>
                    </ul>
                )}
                <hr />
                <p class='large'>{!isDel ? content : '삭제된 댓글입니다.'}</p>
                <time class='medium'>{!isDel ? timestamp : ''}</time>
                <ul class='status commentvotestatus'>
                    <li class='vote commentvote' style={{ display: displayVoteCount }}>
                        {vote}
                    </li>
                </ul>
            </article>

            {replyWriteMode && <CommentWriteForm articleID={articleID} parentcid={parentcid} isChildReply={true} />}
        </>
    );
};

export default CommentComponent;
