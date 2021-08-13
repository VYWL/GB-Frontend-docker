const BoardTitle = props => {
    const { title, link } = props;

    return (
        <div className='wrap title'>
            <h1>
                <a href={link}>{title}</a>
            </h1>
            <hr />
        </div>
    );
};

export default BoardTitle;
