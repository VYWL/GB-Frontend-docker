/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import ArticleComponent from './ArticleComponent';
import CommentComponent from './CommentComponent';
import CommentWriteForm from './CommentWriteForm';
import ArticleWriteForm from '../Articles/ArticleWriteForm';

const OneArticle = ({ match }) => {
    const { bID, articleID } = match.params;
    const [isArticleEditMode, setArticleEditmode] = useState(false);
    const [isWriteMode, setWriteMode] = useState(false);

    const goListHref = `/board/${bID}`;

    useEffect(() => {
        // bID, article ID로 요청을 보내야한다.
    }, []);

    const handleClick = e => {
        e.preventDefault();
        setArticleEditmode(false);
    };

    return (
        <div className='wrap articles'>
            {isArticleEditMode ? (
                <ArticleWriteForm isEditMode />
            ) : (
                <article>
                    <ArticleComponent
                        writer='익명'
                        timestamp='14분 전'
                        title='건강한 음식 많이 먹고 운동해서'
                        content='300살까지 살아야지~'
                        vote={0}
                        comment={2}
                        setEditmode={setArticleEditmode}
                    />
                    <div class='comments' style={{ display: 'block' }}>
                        <CommentComponent
                            writer='익명'
                            content='갈라파고스 거북이야?'
                            timestamp='11분 전'
                            vote={0}
                            setWriteMode={setWriteMode}
                        />
                        <CommentComponent
                            writer='익명'
                            content='ㅋㅋㅋㅋㅋㅋ'
                            timestamp='10분 전'
                            vote={2}
                            isReply
                            isWriteMode={isWriteMode}
                            isLast
                        />

                        <CommentWriteForm />
                    </div>
                </article>
            )}
            <div class='pagination'>
                {isArticleEditMode ? (
                    <a class='cancel' onClick={handleClick}>
                        글 수정 취소
                    </a>
                ) : (
                    <a id='goListButton' class='list' href={goListHref}>
                        글 목록
                    </a>
                )}
            </div>
        </div>
    );
};

export default OneArticle;
