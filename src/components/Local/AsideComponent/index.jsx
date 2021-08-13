import { useState } from 'react';

const AsideComponent = () => {
    const [searchFormClassName, setFormVisible] = useState('search');

    return (
        <aside className='none'>
            {/* <form className={searchFormClassName}>
                <input
                    type='search'
                    name='keyword'
                    class='text'
                    placeholder='전체 게시판의 글을 검색하세요!'
                    onBlur={() => setFormVisible('search')}
                />
            </form> */}
            <div className='title'>
                <a className='hamburger' href='/main'></a>
                <h1>보안제품개발 트랙 밥브리타임</h1>
                <ol class='buttons'>
                    <li onClick={() => setFormVisible('search visible')}>
                        <a id='searchArticle'>글 검색</a>
                    </li>
                </ol>
            </div>
        </aside>
    );
};

export default AsideComponent;
