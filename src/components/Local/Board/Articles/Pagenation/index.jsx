const Pagenation = props => {
    const { bid, pageNum } = props;

    const nextPageHref = `/board/${bid}/p/${Number(pageNum) + 1}`;
    // 이거 20개 단위 offset

    return (
        <div className='pagination'>
            <form id='searchArticleForm' className='search'>
                <select name='search_type'>
                    <option value='4'>전체</option>
                    <option value='3'>해시태그</option>
                    <option value='2'>글 제목</option>
                    <option value='1'>글 내용</option>
                </select>
                <input name='keyword' placeholder='검색어를 입력하세요.' className='text' />
            </form>
            <a href={nextPageHref} className='next'>
                다음
            </a>
        </div>
    );
};

export default Pagenation;
