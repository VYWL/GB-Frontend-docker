import { useState } from 'react';
import CommentComponent from './Content';
import CommentWriteForm from './CommentWriteForm';

const Comment = props => {
    const { commentList } = props;

    return (
        <div class='comments' style={{ display: 'block' }}>
            {commentList.map(elem => (
                <WrapCommentComponent elem={elem} />
            ))}
            <CommentWriteForm />{' '}
        </div>
    );
};

export default Comment;

const WrapCommentComponent = props => {
    const { parentComment: parent, childComment: childList } = props.elem;
    const [isWriteMode, setWriteMode] = useState(false);

    const childComments = childList.map((elem, idx) => {
        const isLast = idx === childList.length - 1;
        return <CommentComponent {...elem} isLast={isLast} setWriteMode={setWriteMode} isWriteMode={isWriteMode} />;
    });

    return (
        <>
            <CommentComponent
                {...parent}
                isLast={childList.length === 0}
                setWriteMode={setWriteMode}
                isWriteMode={isWriteMode}
            />
            {childComments}
        </>
    );
};
