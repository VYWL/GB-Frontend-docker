import { Route } from 'react-router-dom';

import GlobalHeader from '@Components/Global/Header';
import GlobalSubMenu from '@Components/Global/SubMenu';
import GlobalFooter from '@Components/Global/Footer';
import RightSection from '@Components/Local/Main/RightSection';
import MainBodySection from '@Components/Local/Main';
import BoardBodySection from '@Components/Local/Board';
import AsideComponent from '@Components/Local/AsideComponent';

import '@Styles/common/partial.css';
import '@Styles/container/community.css';

const MainPage = ({ location }) => {
    const isBoard = location.pathname === '/board';

    const containerClassName = isBoard ? 'article' : 'community';

    return (
        <>
            <nav>
                <GlobalHeader />
            </nav>

            <div id='submenu'>
                <GlobalSubMenu />
            </div>

            <div id='container' className={containerClassName}>
                <RightSection />
                <AsideComponent />
                <Route path='/board' component={BoardBodySection} />
                <Route path='/main' component={MainBodySection} />
                <hr />
            </div>

            <GlobalFooter />
        </>
    );
};

export default MainPage;
