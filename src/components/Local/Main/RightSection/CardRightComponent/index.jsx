const CardRightComponent = props => {
    const { title, more, children } = props;

    return (
        <div class='card'>
            <div class='board'>
                <h3>
                    <a href={more}>
                        {title} {more && <span>더 보기</span>}
                    </a>
                </h3>
                {children}
            </div>
        </div>
    );
};

export default CardRightComponent;
