import { useEffect, useState } from 'react';
import { ARTICLE_ENDPOINT } from '@Functions';
import { fetchData, uploadFiles } from '@Hooks';
import moment from 'moment';
import { UPLOAD_ENDPOINT } from '@Functions/';
import { formatBytes } from '@Functions/';

const ArticleWriteForm = props => {
    const {
        isEditMode = false,
        boardID = 0,
        articleID = 0,
        title = '',
        content = '',
        isAnonym = false,
        setEditmode = () => {},
        initImageList = [],
        initFileList = [],
    } = props;

    const [articleInfo, setInfo] = useState({
        title: title,
        password: '',
        content: content,
        isAnonym: isAnonym,
    });

    const [imageList, setImageList] = useState(initImageList);
    const [fileList, setFileList] = useState(initFileList);

    useEffect(() => {
        setImageList(initImageList);
        setFileList(initFileList);
    }, []);

    const anonymClassNm = articleInfo.isAnonym ? 'anonym active' : 'anonym';

    const formFileList = (list, new_articleid = 0) => {
        return list
            .map(elem => {
                const { fileName: filename, size: filesize, file, isDel: isdel, isNew: isnew, fID: fid } = elem;
                const aID = articleID === 0 ? new_articleid : articleID;

                if (isnew && isdel) return null;
                return { filename, filesize, file, isdel, isnew, fid, articleid: aID };
            })
            .filter(e => e);
    };

    const sendAttachedFiles = async (new_articleid = 0) => {
        const uploadImageList = formFileList(imageList, new_articleid);
        const uploadFileList = formFileList(fileList, new_articleid);
        await uploadFiles(`${UPLOAD_ENDPOINT}/image`, uploadImageList);
        await uploadFiles(`${UPLOAD_ENDPOINT}/file`, uploadFileList);
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const password = articleInfo.password;
        if (password === '') {
            alert('비밀번호를 입력해 주세요.');
            return;
        }

        if (articleInfo.content === '') {
            alert('글 내용을 입력해 주세요.');
            return;
        }

        if (articleInfo.title === '') {
            alert('글 제목을 입력해 주세요.');
            return;
        }

        // 암호화 처리 해야함

        if (isEditMode) {
            const submitData = {
                ...articleInfo,
                articleID,
            };

            const url = `${ARTICLE_ENDPOINT}/${articleID}/`;
            const isSuccess = await fetchData('put', url, submitData);

            if (isSuccess.msg === 'success') {
                await sendAttachedFiles(isSuccess['articleid']);

                alert('글이 수정되었습니다.');
                setEditmode(false);

                window.location.reload();
            } else {
                alert('비밀번호가 일치하지 않습니다.');
            }

            return;
        }

        const submitData = {
            ...articleInfo,
            writer: 'User',
            boardid: boardID,
            password: password,
            timestamp: moment(new Date()).add(9, 'h').format(),
            vote: 0,
            unlike: 0,
            commentcount: 0,
        };

        const url = `${ARTICLE_ENDPOINT}/`;
        const isSuccess = await fetchData('post', url, submitData);
        console.log(isSuccess);

        if (isSuccess['msg'] === 'success') {
            await sendAttachedFiles(isSuccess['articleid']);

            setEditmode(false);

            window.location.reload();
        } else {
            alert('비밀번호가 일치하지 않습니다.');
        }
    };

    const handleChange = e => {
        setInfo(p => {
            return {
                ...p,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleDelete = async () => {
        const url = `${ARTICLE_ENDPOINT}/${articleID}/`;

        const submitData = {
            password: articleInfo.password,
        };

        const response = await fetchData('delete', url, submitData);

        if (response.msg === 'success') {
            alert('글이 삭제되었습니다.');
            window.location.href = `/board/${boardID}`;
        } else {
            alert('비밀번호가 다릅니다.');
        }
    };

    const handleFileInput = async e => {
        e.preventDefault();

        const length = fileList.filter(e => !e.idDel).length;
        if (length >= 5) {
            alert('첨부파일은 5개를 초과할 수 없습니다.');
            return;
        }

        if (e.target.files.length === 0) return;

        const file = e.target.files[0];

        setFileList(p => {
            return [
                ...p,
                {
                    fileName: file.name,
                    fileURL: '',
                    size: file.size,
                    fID: 0,
                    isDel: false,
                    isNew: true,
                    file: file,
                },
            ];
        });
    };

    const attachFunctionParams = {
        imageList: imageList,
        setImageList: setImageList,
        fileList: fileList,
        setFileList: setFileList,
    };

    return (
        <form className='write'>
            <p style={{ display: 'flex' }}>
                <input
                    name='title'
                    autocomplete='off'
                    placeholder='글 제목'
                    className='title'
                    onChange={handleChange}
                    value={articleInfo.title}
                />
                <input
                    name='password'
                    type='password'
                    autocomplete='off'
                    placeholder='글 비밀번호'
                    className='password'
                    onChange={handleChange}
                    value={articleInfo.password}
                />
            </p>
            <p>
                <textarea
                    name='content'
                    placeholder={_placeolder}
                    className='smallplaceholder large'
                    onChange={handleChange}
                    value={articleInfo.content}
                ></textarea>
            </p>

            <AttachedThings {...attachFunctionParams} />

            <div class='clearBothOnly'></div>
            <ul className='option'>
                <input type='file' id='attachfile' onChange={handleFileInput} className='attachFile' />
                <label for='attachfile' className='attachNewFile' />

                {isEditMode && <li title='삭제' className='delete' onClick={handleDelete}></li>}
                <li title='완료' className='submit' onClick={handleSubmit}></li>
                <li
                    title='익명'
                    className={anonymClassNm}
                    onClick={() =>
                        setInfo(p => {
                            return { ...p, isAnonym: !p.isAnonym };
                        })
                    }
                ></li>
            </ul>
            <div class='clearBothOnly'></div>
        </form>
    );
};

export default ArticleWriteForm;

const _placeolder = `밥브리타임은 누구나 기분 좋게 참여할 수 있는 커뮤니티를 만들기 위해 커뮤니티 이용규칙을 제정하여 운영하고 있습니다. 위반 시 게시물이 삭제되고 서비스 이용이 일정 기간 제한될 수 있습니다.

아래는 이 게시판에 해당하는 핵심 내용에 대한 요약 사항이며, 게시물 작성 전 커뮤니티 이용규칙 전문을 반드시 확인하시기 바랍니다.

※ 정치·사회 관련 행위 금지
- 국가기관, 정치 관련 단체, 언론, 시민단체에 대한 언급 혹은 이와 관련한 행위
- 정책·외교 또는 정치·정파에 대한 의견, 주장 및 이념, 가치관을 드러내는 행위
- 성별, 종교, 인종, 출신, 지역, 직업, 이념 등 사회적 이슈에 대한 언급 혹은 이와 관련한 행위
- 위와 같은 내용으로 유추될 수 있는 비유, 은어 사용 행위

※ 홍보 및 판매 관련 행위 금지
- 영리 여부와 관계 없이 사업체·기관·단체·개인에게 직간접적으로 영향을 줄 수 있는 게시물 작성 행위
- 위와 관련된 것으로 의심되거나 예상될 수 있는 바이럴 홍보 및 명칭·단어 언급 행위

※ 그 밖의 규칙 위반
- 타인의 권리를 침해하거나 불쾌감을 주는 행위
- 범죄, 불법 행위 등 법령을 위반하는 행위
- 욕설, 비하, 차별, 혐오, 자살, 폭력 관련 내용을 포함한 게시물 작성 행위
- 음란물, 성적 수치심을 유발하는 행위
- 스포일러, 공포, 속임, 놀라게 하는 행위 `;

const AttachedThings = attachFunctionParams => {
    const { fileList } = attachFunctionParams;
    const isFileListVisible = fileList.filter(e => !e.isDel).length !== 0;

    return (
        <>
            <ImageList {...attachFunctionParams} />
            {isFileListVisible && <FileList {...attachFunctionParams} />}
        </>
    );
};

const ImageList = attachFunctionParams => {
    const { imageList, setImageList } = attachFunctionParams;
    const handleImageInput = e => {
        e.preventDefault();

        const length = imageList.filter(e => !e.isDel).length;
        if (length >= 10) {
            alert('이미지는 최대 10장까지 업로드할 수 있습니다.');
            return;
        }

        if (e.target.files.length === 0) return;

        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImageList(p => [
                ...p,
                {
                    fileName: file.name,
                    size: file.size,
                    previewURL: reader.result,
                    downloadURL: '',
                    isDel: false,
                    isNew: true,
                    fID: 0,
                    file: file,
                },
            ]);
        };

        reader.readAsDataURL(file);
    };

    const handleImageClick = idx => {
        if (window.confirm('해당 이미지를 삭제하시겠습니까?') === false) return;

        setImageList(p => {
            p[idx].isDel = true;
            const returnObj = p.map(e => e);
            return returnObj;
        });
    };
    return (
        <ol class='thumbnails' style={{ display: 'block' }}>
            {imageList
                .map((elem, idx) => {
                    const { previewURL, isDel } = elem;

                    if (isDel) return null;

                    return (
                        <li
                            class='thumbnail attached'
                            style={{
                                backgroundImage: `url("${previewURL}")`,
                            }}
                            onClick={() => handleImageClick(idx)}
                        />
                    );
                })
                .filter(e => e)}
            <input
                type='file'
                id='attachImage'
                onChange={handleImageInput}
                style={{ display: 'none' }}
                accept='image/gif, image/jpeg, image/png, image/bmp, image/jpg'
            />
            <label for='attachImage' className='attachNewImage' />
        </ol>
    );
};

const FileList = attachFunctionParams => {
    const { fileList, setFileList } = attachFunctionParams;

    const handleClick = idx => {
        if (window.confirm('해당 첨부파일을 삭제하시겠습니까?') === false) return;

        setFileList(p => {
            p[idx].isDel = true;
            const returnObj = p.map(e => e);
            return returnObj;
        });
    };
    return (
        <ol class='files'>
            {fileList
                .map((elem, idx) => {
                    const { size: length, fileName: rawName, fileURL, isDel } = elem;
                    if (isDel) return null;

                    const fileName = rawName.length > 6 ? `${rawName.slice(0, 7)}...` : rawName;
                    const fileSize = formatBytes(length, 2);
                    return (
                        <li class='file' onClick={() => handleClick(idx)}>
                            {`${fileName}`} <br /> {`(${fileSize})`}
                        </li>
                    );
                })
                .filter(e => e)}
        </ol>
    );
};
