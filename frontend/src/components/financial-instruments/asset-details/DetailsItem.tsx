

const DetailsItem = ({title, content}: {title: string, content: string}) => {
    return (
        <div>
            <div style={{fontSize: 13, color: "#979797"}}>{title}</div>
            <div style={{fontSize: 14, color: "white"}}>{content}</div>
        </div>
    )
}

export default DetailsItem;