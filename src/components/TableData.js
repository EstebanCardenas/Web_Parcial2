import Table from 'react-bootstrap/Table'
import {FormattedMessage} from 'react-intl'
import 'bootstrap/dist/css/bootstrap.min.css'
import Badge from 'react-bootstrap/Badge'

function TableData(props) {
    function renderHeader(text) {
        return <FormattedMessage id={text}/>
    }

    return (
        <Table hover responsive>
            <thead style={{backgroundColor: "#353A3F", color: "#FEFEFE"}}>
                <tr>
                    <th>#</th>
                    <th>{renderHeader("image")}</th>
                    <th>{renderHeader("name")}</th>
                    <th>{renderHeader("description")}</th>
                    <th>{renderHeader("height")}</th>
                    <th>{renderHeader("weight")}</th>
                    <th>{renderHeader("type")}</th>
                </tr>
            </thead>
            <tbody>
                {props["data"].map((el, i) => {
                    return (
                        <tr key={i}>
                            <td>{el["id"]}</td>
                            <td>
                                <img src={el["ThumbnailImage"]} alt={el["name"]}/>
                            </td>
                            <td>{el["name"]}</td>
                            <td>{el["description"]}</td>
                            <td>{el["height"]}</td>
                            <td>{el["weight"]}</td>
                            <td>
                                {el["type"].map((e, i) => {
                                    return (
                                        <h5 key={i}>
                                            <Badge variant="secondary">{e}</Badge>
                                        </h5>
                                    )
                                })}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default TableData