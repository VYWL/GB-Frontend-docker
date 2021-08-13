import { useState } from 'react';
import ArticleWriteForm from './ArticleWriteForm';
import ArticleWritePlaceHolder from './ArticleWritePlaceHolder';
import ArticleList from './ArticleList';
import Pagenation from './Pagenation';

const Articles = ({ match }) => {
    const [writeMode, setWriteMode] = useState(false);

    const { bID, page = 1 } = match.params;

    return (
        <div className='wrap articles'>
            {writeMode ? <ArticleWriteForm /> : <ArticleWritePlaceHolder setWriteMode={setWriteMode} />}

            <ArticleList bid={bID} pageNum={page} />
            <div className='clearBothOnly'></div>

            <Pagenation bid={bID} pageNum={page} />
        </div>
    );
};

export default Articles;
