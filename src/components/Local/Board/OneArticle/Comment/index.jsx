import CommentWriteForm from './CommentWriteForm';
import WrapCommentComponent from './WrapCommentComponent';

const Comment = props => {
    const { articleID = 0, commentList } = props;

    return (
        <div class='comments' style={{ display: 'block' }}>
            {commentList.map(elem => (
                <WrapCommentComponent articleID={articleID} elem={elem} />
            ))}
            <CommentWriteForm articleID={articleID} />{' '}
        </div>
    );
};

export default Comment;
