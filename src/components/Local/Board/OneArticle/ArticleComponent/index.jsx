const ArticleComponent = props => {
    const { writer, timestamp, title, content, vote, comment, articleID, setEditmode } = props;

    const formattedTime = timestamp;

    // TODO :: 수정버튼 누르면 writeForm
    const handleClickToEdit = () => {
        setEditmode(p => !p);
    };

    return (
        <a class='article'>
            <img src='https://cf-fpi.everytime.kr/0.png' class='picture large' />
            <div class='profile'>
                <h3 class='large'>{writer}</h3>
                <time class='large'>{formattedTime}</time>
            </div>
            <ul class='status'>
                <li class='update' onClick={handleClickToEdit}>
                    수정
                </li>
                <li class='abuse'>신고</li>
            </ul>
            <hr />
            <h2 class='large'>{title}</h2>
            <p class='large'>{content}</p>
            <ul class='status left'>
                <li title='공감' class='vote'>
                    {vote}
                </li>
                <li title='댓글' class='comment'>
                    {comment}
                </li>
            </ul>
            <hr />
            <div class='buttons'>
                <span class='posvote'>공감</span>
            </div>
        </a>
    );
};

export default ArticleComponent;
