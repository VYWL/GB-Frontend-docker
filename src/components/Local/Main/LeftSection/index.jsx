import UserProfileComponent from './UserProfileComponent';
import CardLeftItemMenu from './CardLeftItemMenu';

const LeftSection = () => {
    return (
        <div class='leftside'>
            <UserProfileComponent nickname='김득수' status='BoB 10기 보안제품개발' />

            <CardLeftComponent>
                <CardLeftItemMenu />
            </CardLeftComponent>

            <CardLeftComponent>
                <Banner1 />
            </CardLeftComponent>

            <CardLeftComponent>
                <Banner2 />
            </CardLeftComponent>

            <CardLeftComponent>
                <Banner3 />
            </CardLeftComponent>
        </div>
    );
};

export default LeftSection;

const CardLeftComponent = ({ children }) => {
    return <div class='card'>{children}</div>;
};

const Banner1 = () => {
    return (
        <div class='banner'>
            <a href='https://ad.everytime.kr/adClick?adToken=d2zAZV8vTEQ0p6Jp%2BmlFZ2lO7E7uJ%2FKYwFOVrvGgZv%2BTEn94JaIj0gekQKKDD7vs2LiTQejhYUo3gZQfkqdBRG%2BjOu2pgTwsYPMU8dAerMG79xcVL1QLzDGexaJmlB%2F4HSrn9lqzJ%2BlRJvEoLGNQ773XZOFxh3%2BimTHTP2L3L6MFrv3opFlqkawLdLRoCPPb%2FzmbSwEkpINM9l%2F6dhBKaaRPH4GBUIllxFVfduhHQtOdTjOYGTkOqQjUkuNQOQG5'>
                <img src='https://cf-eba.everytime.kr/20210726_KSA_NIPA_card.jpg' />
            </a>
        </div>
    );
};

const Banner2 = () => {
    return (
        <div class='banner'>
            <a href='https://ad.everytime.kr/adClick?adToken=d2zAZV8vTEQ0p6Jp%2BmlFZ2lO7E7uJ%2FKYwFOVrvGgZv%2BTEn94JaIj0gekQKKDD7vs2LiTQejhYUo3gZQfkqdBRG%2BjOu2pgTwsYPMU8dAerMG79xcVL1QLzDGexaJmlB%2F4HSrn9lqzJ%2BlRJvEoLGNQ773XZOFxh3%2BimTHTP2L3L6MFrv3opFlqkawLdLRoCPPb%2FzmbSwEkpINM9l%2F6dhBKab6Io6bKpFW%2Fchb8XEg2HhC%2FMXev5tFBBi6hQucXI8vO'>
                <img src='https://cf-eba.everytime.kr/20210726_Netflix_Olympics_AM_card.jpg' />
            </a>
        </div>
    );
};

const Banner3 = () => {
    return (
        <div class='banner'>
            <a href='https://ad.everytime.kr/adClick?adToken=d2zAZV8vTEQ0p6Jp%2BmlFZ2lO7E7uJ%2FKYwFOVrvGgZv%2BTEn94JaIj0gekQKKDD7vs2LiTQejhYUo3gZQfkqdBRG%2BjOu2pgTwsYPMU8dAerMG79xcVL1QLzDGexaJmlB%2F4HSrn9lqzJ%2BlRJvEoLGNQ773XZOFxh3%2BimTHTP2L3L6Op6ncS2svSZhicPPikF%2FT93%2B88N%2FWZGiTzWV9qYBZ%2BpuaAi3IalhA7vIs429hrrC8acy0FtR1X5%2BSWzHVQrkZz'>
                <img src='https://cf-eba.everytime.kr/20210720_applewatch_card.jpg' />
            </a>
        </div>
    );
};
