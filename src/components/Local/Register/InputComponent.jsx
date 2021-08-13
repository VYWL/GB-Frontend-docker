const InputComponent = props => {
    const { title, isBlind = false, dataType, placeholder } = props;
    const type = isBlind ? 'password' : 'text';

    return (
        <div class='input'>
            <div class='label'>
                <label>{title}</label>
            </div>
            <input type={type} name={dataType} maxlength='20' placeholder={placeholder} autocomplete='off' required />
        </div>
    );
};

export default InputComponent;
