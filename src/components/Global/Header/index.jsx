import LogoComponent from './LogoComponent';
import NavAccountItem from './NavAccountItem';
import MenuListItem from './MenuListItem';

const GlobalHeader = () => {
    const logoImgSrc = 'https://media.discordapp.net/attachments/802076592825827332/869027652672049162/tempBoBAI.png';

    return (
        <div className='wrap'>
            <div id='logo'>
                <LogoComponent imgSrc={logoImgSrc} mainTitle='밥브리타임' subTitle='보안제품개발 트랙' />
            </div>
            <div id='account'>
                {/* <NavAccountItem title='쪽지함' name='icon message' href='/m' /> */}
                <NavAccountItem title='내 정보' name='icon my' href='/' />
            </div>
            <ul id='menu'>
                <MenuListItem name='게시판' href='/board/1' />
                <MenuListItem name='자료실' href='/' />
                <MenuListItem name='BoB페이지' href='/' />
                <MenuListItem name='BoB Wiki' href='/' />
            </ul>
        </div>
    );
};

export default GlobalHeader;
