const Producs = ({params}) => {
    console.log(params)
    return(
        <div>
            Estas viendo: {params.Category}
        </div>
    )
}
export default Producs;