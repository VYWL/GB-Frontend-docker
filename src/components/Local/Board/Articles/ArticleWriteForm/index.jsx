import { useState } from 'react';

const ArticleWriteForm = props => {
    const { isEditMode = false, articleID = 0, title = '', content = '', isAnonym = false } = props;
    const [articleInfo, setInfo] = useState({
        title: title,
        password: '',
        content: content,
        isAnonym: isAnonym,
    });
    const anonymClassNm = articleInfo.isAnonym ? 'anonym active' : 'anonym';

    const handleSubmit = e => {
        e.preventDefault();

        // 암호화 처리 해야함
        // const password = document.querySelector('input.password').value;

        // console.log({
        //     ...articleInfo,
        //     key: 'secretKey',
        //     password: '*****',
        // });
    };

    const handleChange = e => {
        setInfo(p => {
            return {
                ...p,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleDelete = () => {
        // 삭제 관련 POST
        // console.log('삭제');
    };

    return (
        <form className='write'>
            <p style={{ display: 'flex' }}>
                <input
                    name='title'
                    autocomplete='off'
                    placeholder='글 제목'
                    className='title'
                    onChange={handleChange}
                />
                <input
                    name='password'
                    type='password'
                    autocomplete='off'
                    placeholder='글 비밀번호'
                    className='password'
                    onChange={handleChange}
                />
            </p>
            <p>
                <textarea
                    name='content'
                    placeholder={_placeolder}
                    className='smallplaceholder large'
                    onChange={handleChange}
                ></textarea>
            </p>
            <div class='clearBothOnly'></div>
            <ul className='option'>
                {/* <li title='해시태그' className='hashtag'></li> */}
                {/* <li title='첨부' className='attach'></li> */}
                {isEditMode && <li title='삭제' className='delete' onClick={handleDelete}></li>}
                <li title='완료' className='submit' onClick={handleSubmit}></li>
                <li
                    title='익명'
                    className={anonymClassNm}
                    onClick={() =>
                        setInfo(p => {
                            return { ...p, isAnonym: !p.isAnonym };
                        })
                    }
                ></li>
            </ul>
            <div class='clearBothOnly'></div>
        </form>
    );
};

export default ArticleWriteForm;

const _placeolder = `밥브리타임은 누구나 기분 좋게 참여할 수 있는 커뮤니티를 만들기 위해 커뮤니티 이용규칙을 제정하여 운영하고 있습니다. 위반 시 게시물이 삭제되고 서비스 이용이 일정 기간 제한될 수 있습니다.

아래는 이 게시판에 해당하는 핵심 내용에 대한 요약 사항이며, 게시물 작성 전 커뮤니티 이용규칙 전문을 반드시 확인하시기 바랍니다.

※ 정치·사회 관련 행위 금지
- 국가기관, 정치 관련 단체, 언론, 시민단체에 대한 언급 혹은 이와 관련한 행위
- 정책·외교 또는 정치·정파에 대한 의견, 주장 및 이념, 가치관을 드러내는 행위
- 성별, 종교, 인종, 출신, 지역, 직업, 이념 등 사회적 이슈에 대한 언급 혹은 이와 관련한 행위
- 위와 같은 내용으로 유추될 수 있는 비유, 은어 사용 행위

※ 홍보 및 판매 관련 행위 금지
- 영리 여부와 관계 없이 사업체·기관·단체·개인에게 직간접적으로 영향을 줄 수 있는 게시물 작성 행위
- 위와 관련된 것으로 의심되거나 예상될 수 있는 바이럴 홍보 및 명칭·단어 언급 행위

※ 그 밖의 규칙 위반
- 타인의 권리를 침해하거나 불쾌감을 주는 행위
- 범죄, 불법 행위 등 법령을 위반하는 행위
- 욕설, 비하, 차별, 혐오, 자살, 폭력 관련 내용을 포함한 게시물 작성 행위
- 음란물, 성적 수치심을 유발하는 행위
- 스포일러, 공포, 속임, 놀라게 하는 행위 `;
