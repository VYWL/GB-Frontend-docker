/* eslint-disable jsx-a11y/anchor-is-valid */
import Comment from './Comment';
import ArticleComponent from './ArticleComponent';
import ArticleWriteForm from '../Articles/ArticleWriteForm';

import useSWR from 'swr';
import { useState } from 'react';
import { useHistory } from 'react-router';

import { arrangeComments, getFormattedTime, ARTICLE_ENDPOINT, COMMENT_ENDPOINT } from '@Functions';
import { UPLOAD_ENDPOINT, MEDIA_ENDPOINT } from '@Functions/';

const OneArticle = ({ match }) => {
    const { bID, articleID } = match.params;
    const [isArticleEditMode, setArticleEditmode] = useState(false);

    const history = useHistory();

    const goListHref = `/board/${bID}`;

    const { error: article_ERR, data: articleData } = useSWR(`${ARTICLE_ENDPOINT}/${articleID}/`);
    const { error: comment_ERR, data: commentData } = useSWR(`${COMMENT_ENDPOINT}/${articleID}/`);
    const { error: load_img_ERR, data: imageData } = useSWR(`${UPLOAD_ENDPOINT}/image/${articleID}`);
    const { error: load_file_ERR, data: fileData } = useSWR(`${UPLOAD_ENDPOINT}/file/${articleID}`);

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
            fileCount: data.filecount,
            imageCount: data.imagecount,
            thumbnail: data.thumbnail,
        };

        return returnData;
    };

    const handleImageData = () => {
        const data = imageData;
        if (!data) return [];
        const returnList = data.map(elem => {
            const { fid, uuid: code, filename, filesize, timestamp } = elem;
            return {
                fileName: filename,
                size: filesize,
                previewURL: `${UPLOAD_ENDPOINT}/image/${code}`,
                downloadURL: `${UPLOAD_ENDPOINT}/image/${code}`,
                isDel: false,
                isNew: false,
                fID: fid,
                file: null,
            };
        });

        return returnList;
    };

    const handleFileData = () => {
        const data = fileData;

        if (!data) return [];

        const returnList = data.map(elem => {
            const { fid, uuid: code, filename, filesize, timestamp } = elem;
            return {
                fileName: filename,
                size: filesize,
                fileURL: `${UPLOAD_ENDPOINT}/file/${code}`,
                isDel: false,
                isNew: false,
                fID: fid,
                file: null,
            };
        });

        return returnList;
    };

    const editFormInitialData = () => {
        const data = articleData;
        if (!data) return {};

        const returnData = {
            title: data.title,
            content: data.content,
            isAnonym: data.isanony,
        };

        return returnData;
    };

    const handleCommentData = () => {
        if (!commentData) return [];

        if (commentData.detail === 'Not found.') return [];

        const tempList = commentData.map(elem => {
            return {
                commentID: elem.commentid,
                writer: elem.isanony ? '익명' : elem.writer,
                content: elem.content,
                timestamp: getFormattedTime(elem.timestamp),
                isReply: elem.isreply,
                isDel: elem.isdel,
                isLast: false,
                vote: elem.vote,
                articleid: elem.articleid,
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
        <div className='wrap articles'>
            {isArticleEditMode ? (
                <ArticleWriteForm
                    isEditMode
                    {...editFormInitialData()}
                    initImageList={handleImageData()}
                    initFileList={handleFileData()}
                    boardID={bID}
                    articleID={articleID}
                    setEditmode={setArticleEditmode}
                />
            ) : (
                <article>
                    <ArticleComponent
                        {...handleArticleData()}
                        initImageList={handleImageData()}
                        initFileList={handleFileData()}
                        setEditmode={setArticleEditmode}
                    />
                    <Comment articleID={articleID} commentList={handleCommentData()} />
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
