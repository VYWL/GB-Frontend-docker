import Articles from './Articles';
import BoardTitle from './BoardTitle';
import OneArticle from './OneArticle';
import { Route } from 'react-router-dom';

// Styles
import '@Styles/container/article.css';

const BoardBodySection = ({ match }) => {
    const boardTitle = '자유게시판';

    return (
        <>
            <BoardTitle title={boardTitle} link='/board/free' />
            <Route exact path='/board/:bID/p/:page' component={Articles} />
            <Route exact path='/board/:bID/' component={Articles} />
            <Route exact path='/board/:bID/v/:articleID' component={OneArticle} />
        </>
    );
};

export default BoardBodySection;
