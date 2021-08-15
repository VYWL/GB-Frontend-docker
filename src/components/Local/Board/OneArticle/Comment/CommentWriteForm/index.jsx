import { useState } from 'react';

const CommentWriteForm = props => {
    const { isChildReply } = props;
    const [commentInfo, setInfo] = useState({
        content: '',
        password: '',
        isAnony: false,
    });

    const commentMode = isChildReply ? 'writecomment child' : 'writecomment';
    const placeholder = isChildReply ? '대댓글을 입력하세요.' : '댓글을 입력하세요.';

    const anonymClassNm = commentInfo.isAnony ? 'anonym active' : 'anonym';

    // TODO :: Submit Action에 대해 다뤄야함.
    // 글 내용, id, ip, timestamp, 대댓글인지 아닌지, 공감수, 신고수 저장

    const handleClick = e => {
        e.preventDefault();

        setInfo(p => {
            return { ...p, isAnony: !p.isAnony };
        });
    };

    const handleChange = e => {
        e.preventDefault();

        setInfo(p => {
            return {
                ...p,
                [e.target.name]: e.target.value,
            };
        });
    };

    return (
        <form class={commentMode}>
            <input
                type='text'
                name='content'
                maxlength='300'
                autocomplete='off'
                placeholder={placeholder}
                class='text'
                onChange={handleChange}
            />
            <ul class='option'>
                <li title='익명' class={anonymClassNm} onClick={handleClick}></li>
                <li title='완료' class='submit'></li>
            </ul>
            {true && (
                <>
                    <div
                        style={{
                            borderTop: '1px solid #e3e3e3',
                            backgroundColor: 'white',
                        }}
                    />
                    <input
                        type='password'
                        name='password'
                        maxlength='20'
                        autocomplete='off'
                        placeholder='비밀번호를 설정하세요 (최대 20자)'
                        class='text'
                        onChange={handleChange}
                    />
                </>
            )}
            <div class='clearBothOnly'></div>
        </form>
    );
};

export default CommentWriteForm;
