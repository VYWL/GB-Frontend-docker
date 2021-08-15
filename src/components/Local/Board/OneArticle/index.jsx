/* eslint-disable jsx-a11y/anchor-is-valid */
import Comment from './Comment';
import ArticleComponent from './ArticleComponent';
import ArticleWriteForm from '../Articles/ArticleWriteForm';

import useSWR, { SWRConfig } from 'swr';
import { useState } from 'react';
import { useHistory } from 'react-router';

import { getFormattedTime, ARTICLE_ENDPOINT, COMMENT_ENDPOINT } from '@Functions';

const OneArticle = ({ match }) => {
    const { bID, articleID } = match.params;
    const [isArticleEditMode, setArticleEditmode] = useState(false);

    const history = useHistory();

    const goListHref = `/board/${bID}`;

    // TODO : Hook으로 변경
    // const getJSON = ;
    const { error: article_ERR, data: articleData } = useSWR(`${ARTICLE_ENDPOINT}/${articleID}`);
    const { error: comment_ERR, data: commentData } = useSWR(`${COMMENT_ENDPOINT}/${articleID}`);

    const handleArticleData = () => {
        const data = articleData;
        if (!data) return {};

        if (data.detail === 'Not found.') {
            alert('접근할 수 없는 게시글입니다.');
            history.goBack();
        }

        if (data.isdel) {
            alert('삭제된 게시글입니다.');
            history.goBack();
        }

        const commentCount = commentData ? commentData.length : 0;

        const returnData = {
            articleid: articleID,
            title: data.title,
            content: data.content,
            timestamp: getFormattedTime(data.timestamp),
            vote: data.vote,
            unlike: data.unlike,
            comment: commentCount,
            writer: data.isanony ? '익명' : data.writer,
            boardid: data.boardid,
        };

        console.log(commentData);

        return returnData;
    };

    const handleCommentData = () => {
        if (!commentData) return [];

        if (commentData.detail === 'Not found.') return [];

        const tempList = commentData.map((elem, idx) => {
            return {
                commentID: elem.commentid,
                writer: elem.isanony ? '익명' : elem.writer,
                content: elem.content,
                timestamp: getFormattedTime(elem.timestamp),
                isReply: elem.isreply,
                isLast: false,
                vote: elem.vote,
            };
        });

        const returnList = arrangeComments(tempList);

        return returnList;
    };

    const handleClick = e => {
        e.preventDefault();
        setArticleEditmode(false);
    };

    return (
        <SWRConfig value={{ fetcher: url => fetch(url).then(_ => _.json()) }}>
            <div className='wrap articles'>
                {isArticleEditMode ? (
                    <ArticleWriteForm isEditMode />
                ) : (
                    <article>
                        <ArticleComponent {...handleArticleData()} setEditmode={setArticleEditmode} />
                        <Comment commentList={handleCommentData()} />
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
        </SWRConfig>
    );
};

export default OneArticle;

const arrangeComments = tempList => {
    const returnList = [];

    let childFlag = false;
    let grp = {
        parentComment: '',
        childComment: [],
    };
    for (let i = 0; i < tempList.length; ++i) {
        const nowItem = tempList[i];

        if (nowItem.isReply) {
            childFlag = true;
            grp.childComment.push(nowItem);
            continue;
        }

        if (childFlag) {
            returnList.push({
                parentComment: grp.parentComment,
                childComment: grp.childComment.map(elem => elem),
            });

            grp.parentComment = '';
            grp.childComment = [];
            childFlag = false;
        }

        grp.parentComment = tempList[i];

        if (i === tempList.length - 1) {
            returnList.push({
                parentComment: grp.parentComment,
                childComment: grp.childComment.map(elem => elem),
            });
        }
    }

    return returnList;
};
