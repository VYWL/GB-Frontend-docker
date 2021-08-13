const NavAccountItem = props => {
    const { name: className, title, href } = props;

    const iconProps = {
        className,
        title,
        href,
    };

    return <a {...iconProps}>{title}</a>;
};

export default NavAccountItem;
