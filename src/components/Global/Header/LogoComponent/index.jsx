const LogoComponent = props => {
    const { imgSrc, mainTitle, subTitle } = props;

    return (
        <>
            <a href='/'>
                <img src={imgSrc} alt='' />
            </a>
            <p>
                <span className='name multiple'>{mainTitle}</span>
                <span className='subname'>{subTitle}</span>
            </p>
        </>
    );
};

export default LogoComponent;
