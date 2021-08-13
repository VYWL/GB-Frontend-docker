const ArticleWritePlaceHolder = ({ setWriteMode }) => {
    return (
        <div onClick={() => setWriteMode(true)}>
            <a id='writeArticleButton'>새 글을 작성해주세요!</a>{' '}
        </div>
    );
};

export default ArticleWritePlaceHolder;
