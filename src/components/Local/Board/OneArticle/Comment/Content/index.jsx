import { COMMENT_ENDPOINT } from '@Functions/';
import { fetchData } from '@Hooks/';
import { useState } from 'react';
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

    // 글 작성자인지를 체크하는 변수
    const isWriter = false;

    const writerComment = !isDel ? (isWriter ? 'medium writer' : 'medium') : 'medium disabled';
    const writerName = !isDel ? (isWriter ? `${writer}(글쓴이)` : writer) : '(삭제)';

    // 대댓글 작성모드인 경우 아래 false를 true로
    const replyWriteMode = isWriteMode && isLast;

    // 로그인이 없다면, 글쓴이인지 확인하는 과정은? 👉 몰라요

    // 공감 업데이트는? 신고수는? 👉 할거에요

    // 댓글 업데이트시, child는 parent ID를 알아야해

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

                        <li class='commentvote'>공감</li>
                        <li class='abuse'>비공감</li>
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
