import { useEffect, useState } from 'react';
import { CardRightItemArticle, CardRightItemList } from '../RightSection/CardRighItemComponent';
import CardRightComponent from '../RightSection/CardRightComponent';

// Dummy
// 유형이 다 다르기 때문에, 별도로 불러온 모습
import b1_articleList from '@Dummy/articles_b1.json';
import b2_articleList from '@Dummy/articles_b2.json';
import b3_articleList from '@Dummy/articles_b3.json';
import b4_articleList from '@Dummy/articles_b4.json';

const MainSection = () => {
    const [articleList, setList] = useState({
        _1: [],
        _2: [],
        _3: [],
        _4: [],
    });

    const getMainArticles = boardID => {
        let item = [];

        switch (boardID) {
            case 1: // 자유게시판
                item = b1_articleList['data'].map(elem => <CardRightItemArticle {...elem} isMainCard />);
                break;
            case 2: // 비밀게시판
                item = b2_articleList['data'].map(elem => <CardRightItemArticle {...elem} isMainCard />);
                break;
            case 3: // 자료게시판
                item = b3_articleList['data'].map(elem => <CardRightItemList {...elem} />);
                break;
            case 4: // 트랙 별 게시판
                item = b4_articleList['data'].map(elem => <CardRightItemArticle {...elem} isMainCard />);
                break;
            default:
                break;
        }

        return item;
    };

    useEffect(() => {
        // 여기는 게시판 개수가 고정되어있기 때문에, 만약 게시판을 추가하거나 삭제하면 수정해야함.
        setList({
            _1: getMainArticles(1),
            _2: getMainArticles(2),
            _3: getMainArticles(3),
            _4: getMainArticles(4),
        });
    }, []);

    return (
        <div class='main'>
            <CardRightComponent title='자유게시판'>{articleList._1}</CardRightComponent>

            <CardRightComponent title='비밀게시판'>{articleList._2}</CardRightComponent>

            <CardRightComponent title='자료게시판'>{articleList._3}</CardRightComponent>

            <CardRightComponent title='트랙별게시판'>{articleList._4}</CardRightComponent>
        </div>
    );
};

export default MainSection;
