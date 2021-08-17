/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { formatBytes } from '@Functions/';

const ArticleComponent = props => {
    const { writer, timestamp, title, content, vote, comment, articleID, setEditmode, initFileList, initImageList } =
        props;

    const [attachedFileList, setFileList] = useState(initFileList);
    const [attachedImageList, setImageList] = useState(initImageList);

    const formattedTime = timestamp;

    const handleClickToEdit = () => {
        setEditmode(p => !p);
    };

    useEffect(() => {
        setFileList(initFileList);
        setImageList(initImageList);
    }, [initFileList, initImageList]);

    // TODO :: 공감 && 신고 기능 구현

    const attachedFileCount = attachedFileList.length;
    const isFiles = attachedFileCount !== 0;

    const attachImageCount = attachedImageList.length;
    const isAttach = attachImageCount !== 0;

    return (
        <a class='article'>
            <img src='https://cf-fpi.everytime.kr/0.png' class='picture large' alt='' />
            <div class='profile'>
                <h3 class='large'>{writer}</h3>
                <time class='large'>{formattedTime}</time>
            </div>
            <ul class='status'>
                <li class='update' onClick={handleClickToEdit}>
                    수정
                </li>
                {/* <li class='abuse'>신고</li> */}
            </ul>
            <hr />
            <h2 class='large'>{title}</h2>
            <p class='large'>{content}</p>
            {isAttach && <AttachedImages imageList={attachedImageList} />}
            <ul class='status left'>
                {/* <li title='공감' class='vote'>
                    {vote}
                </li> */}
                {isAttach && <li className='attach'>{attachImageCount}</li>}
                <li title='댓글' class='comment'>
                    {comment}
                </li>
                {isFiles && <li className='files'>{attachedFileCount}</li>}
            </ul>
            <hr />
            {isFiles && <AttachedFiles fileList={attachedFileList} />}
        </a>
    );
};

export default ArticleComponent;

const AttachedImages = ({ imageList }) => {
    return (
        <>
            <div class='attaches multiple'>
                {imageList.map(src => (
                    <OneAttachedImage src={src} />
                ))}
            </div>
        </>
    );
};

const OneAttachedImage = ({ src }) => {
    const [isDetailView, setDetailView] = useState(false);

    return (
        <>
            <figure class='attach' onClick={() => setDetailView(true)}>
                <img src={src.previewURL} alt='' />
            </figure>
            {isDetailView && <ImageDetail setDetailView={setDetailView} src={src} />}
        </>
    );
};

const ImageDetail = ({ setDetailView, src }) => {
    return (
        <div id='gallery'>
            <div class='backdrop' onClick={() => setDetailView(false)}></div>
            <img src={src.previewURL} className='content' alt='' />
        </div>
    );
};

const AttachedFiles = ({ fileList }) => {
    const [isMoreFileView, setMoreFileView] = useState(false);
    const preview = fileList.slice(0, 2);

    const handleClick = url => {
        window.open(url);
    };

    return (
        <div class='buttons'>
            {preview.map(elem => {
                const { size: length, fileName: rawName, fileURL: url } = elem;

                const name = rawName.length > 6 ? `${rawName.slice(0, 7)}...` : rawName;
                const fileSize = formatBytes(length, 2);

                return (
                    <span class='file' onClick={() => handleClick(url)}>
                        {`${name}`} <br /> {`(${fileSize})`}
                    </span>
                );
            })}

            <span className='morefile' onClick={() => setMoreFileView(true)}>
                더보기
            </span>
            {isMoreFileView && <MoreFiles setMoreFileView={setMoreFileView} files={fileList} />}
        </div>
    );
};

const MoreFiles = ({ setMoreFileView, files }) => {
    const fileList = files.map((elem, idx) => {
        const handleClick = url => {
            window.open(url);

            setMoreFileView(false);
        };

        const { size: length, fileName: rawName, fileURL } = elem;

        const fileName = rawName;
        const fileSize = formatBytes(length, 2);

        const key = idx + 1;
        return (
            <li onClick={() => handleClick(fileURL)}>
                <a data-reason={key}>{`${fileName} (${fileSize})`}</a>
            </li>
        );
    });

    return (
        <>
            <div class='modalwrap' onClick={() => setMoreFileView(false)} />
            <form id='moreFilesForm' class='modal'>
                <a title='닫기' class='close' onClick={() => setMoreFileView(false)}></a>
                <h3>첨부 파일</h3>
                <ul>{fileList}</ul>
            </form>
        </>
    );
};
