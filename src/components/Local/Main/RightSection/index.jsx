import CardRightComponent from './CardRightComponent';
import { CardRightItemArticle, CardRightItemList } from './CardRighItemComponent';
import { useEffect, useState } from 'react';

// Dummy Data
import hotArticles from '@Dummy/hotArticles.json';
import recentArticles from '@Dummy/recentArticles.json';

const RightSection = () => {
    const [hotArticleList, setHotInit] = useState(null);
    const [recentArticleList, setRecentInit] = useState(null);

    const getArticles = (types = '') => {
        let items = [];

        switch (types.toLowerCase()) {
            case 'hot':
                // TODO :: hook - backend와 연동
                // Backend 측에서 적어도 10개 이상의 좋아요가 있으며, 가장 좋아요가 많고, 최신인 순으로 글 2개
                items = hotArticles['data'];
                break;
            case 'recent':
                // TODO :: hook - backend와 연동
                items = recentArticles['data'];
                break;
            default:
                break;
        }

        return items;
    };

    useEffect(() => {
        const hotArticleComponents = getArticles('hot').map(elem => {
            return <CardRightItemArticle {...elem} />;
        });
        setHotInit(hotArticleComponents);

        const recentArticlesComponents = getArticles('recent').map(elem => {
            return <CardRightItemList {...elem} />;
        });

        setRecentInit(recentArticlesComponents);
    }, []);

    return (
        <div class='rightside'>
            <CardRightComponent title='실시간 인기 글'>{hotArticleList}</CardRightComponent>

            <CardRightComponent title='최근 게시물' more='/board'>
                {recentArticleList}
            </CardRightComponent>

            <CardRightComponent title='BEST 게시판' more='/board/1' />
        </div>
    );
};

export default RightSection;
