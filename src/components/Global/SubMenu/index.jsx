import boardTotalList from './boardData';
import BoardGroup from './BoardGroup';

const GlobalSubMenu = () => {
    const [list1, list2, list3, list4] = boardTotalList.map(({ key, value }) => value);
    // TODO :: 게시판 별 ID에 따른 라우팅 + isNew 처리

    return (
        <div className='wrap'>
            <BoardGroup boardList={list1} />
            <BoardGroup boardList={list2} />
            <BoardGroup boardList={list3} />
            <BoardGroup boardList={list4} />
        </div>
    );
};

export default GlobalSubMenu;
