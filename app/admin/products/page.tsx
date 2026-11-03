
const Productpage = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12 mt-4">
                    <div className="card">
                        <div
                            className="table-responsive"
                        >
                            <table
                                className="table  table-hover"
                            >
                                <thead>
                                    <tr>
                                        <th scope="col">Column 1</th>
                                        <th scope="col">Column 2</th>
                                        <th scope="col">Column 3</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="">
                                        <td scope="row">R1C1</td>
                                        <td>R1C2</td>
                                        <td>R1C3</td>
                                    </tr>
                                    <tr className="">
                                        <td scope="row">Item</td>
                                        <td>Item</td>
                                        <td>Item</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>


    )
}

export default Productpage