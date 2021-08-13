const OptionComponent = props => {
    const { title, dataType, defaultOption, optionList } = props;

    const options = optionList.map(elem => {
        const { name, value } = elem;

        return <option value={value}>{name}</option>;
    });

    return (
        <div class='input'>
            <div class='label'>
                <label>{title}</label>
            </div>
            <select name={dataType}>
                <option disabled='' selected='' value='none'>
                    {defaultOption}
                </option>
                {options}
            </select>
        </div>
    );
};

export default OptionComponent;
