import { useState } from 'react';
import CommentComponent from '../Content';

const WrapCommentComponent = props => {
    const { articleID = 0 } = props;
    const { parentComment: parent, childComment: childList } = props.elem;
    const [isWriteMode, setWriteMode] = useState(false);

    const childComments = childList.map((elem, idx) => {
        const isLast = idx === childList.length - 1;
        return (
            <CommentComponent
                {...elem}
                parentcid={parent.commentID}
                articleID={articleID}
                isLast={isLast}
                setWriteMode={setWriteMode}
                isWriteMode={isWriteMode}
            />
        );
    });

    return (
        <>
            <CommentComponent
                {...parent}
                parentcid={parent.commentID}
                articleID={articleID}
                isLast={childList.length === 0}
                setWriteMode={setWriteMode}
                isWriteMode={isWriteMode}
            />
            {childComments}
        </>
    );
};

export default WrapCommentComponent;
