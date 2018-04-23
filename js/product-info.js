var stock = {
    "141975": [
        {
            "amlabel_image": "",
            "amlabel_width": "",
            "amlabel_height": "",
            "simple_id": "141989",
            "color_id": "3564",
            "color_text": "BLUE",
            "size_id": "1857",
            "size_text": "ONE SIZE",
            "quantity": 3,
            "display_brand": "3 AM Imports"
        }
    ],
    "142593": {
        "1": {
            "amlabel_image": "",
            "amlabel_width": "",
            "amlabel_height": "",
            "simple_id": "142605",
            "color_id": "3564",
            "color_text": "BLUE",
            "size_id": "1857",
            "size_text": "ONE SIZE",
            "quantity": 0,
            "display_brand": "Leg Avenue"
        }
    },
    "143249": {
        "3": {
            "amlabel_image": "",
            "amlabel_width": "",
            "amlabel_height": "",
            "simple_id": "143257",
            "color_id": "3563",
            "color_text": "BLUE",
            "size_id": "2898",
            "size_text": "Small",
            "quantity": 3,
            "display_brand": "Leg Avenue"
        },
        "4": {
            "amlabel_image": "",
            "amlabel_width": "",
            "amlabel_height": "",
            "simple_id": "143258",
            "color_id": "3563",
            "color_text": "BLUE",
            "size_id": "2901",
            "size_text": "Medium",
            "quantity": 8,
            "display_brand": "Leg Avenue"
        },
        "5": {
            "amlabel_image": "",
            "amlabel_width": "",
            "amlabel_height": "",
            "simple_id": "143259",
            "color_id": "3563",
            "color_text": "BLUE",
            "size_id": "2904",
            "size_text": "Large",
            "quantity": 1,
            "display_brand": "Leg Avenue"
        }
    },
    "150605": {
        "2": {
            "amlabel_image": "",
            "amlabel_width": "",
            "amlabel_height": "",
            "simple_id": "150619",
            "color_id": "3563",
            "color_text": "BLUE",
            "size_id": "1857",
            "size_text": "ONE SIZE",
            "quantity": 6,
            "display_brand": "In Your Dreams"
        }
    }
}

class RequestForm extends React.Component {
    constructor() {
        super();

        this.state = {
            productId: '',
            fetchedProducts: {}
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fetchProductData = this.fetchProductData.bind(this);
        this.validateFormInput = this.validateFormInput.bind(this);
    }

    handleChange(event) {
        this.setState({ productId: event.target.value });
    }

    validateFormInput(productIdInput) {
        let desiredInput = /^([0-9]+,)*[0-9]+$/;
    
        if(productIdInput.match(desiredInput)) {
            return 1;
        }
        else {
            return 0;
        }
    }

    handleSubmit(event) {
        if( this.validateFormInput(this.state.productId )) {
            this.fetchProductData();
            event.preventDefault();
        }
        else {
            alert('Format for product(s) not valid');
        }
        
    }

    

    fetchProductData() {
        var sizeRequestUrl = 'https://www.dollskill.com/codetest/api.php?ids=' + this.state.productId + '&op=get_size_attributes';

        fetch(sizeRequestUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({ fetchedProducts: result });
                    console.log(this.state.fetchedProducts);
                }
            )
    }

    render() {
        return (
            <div className={"row"}>
                <div className={"col-md-3 sidepanel"}>
                    <div className={"form-container"}>
                        <h3>Product Info Request</h3>
                        <hr />
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="product-id">Product Id(s):</label>
                                <input type="text" className={"form-control"}
                                    placeholder="Enter product Id(s) separated by commas (i.e 143249,142593,141975,150605)"
                                    value={this.state.productId}
                                    onChange={this.handleChange} /> 
                            </div>
                            <button type="submit" className={"btn btn-default btn-pink"}>SUBMIT</button>
                        </form>
                    </div>
                </div>
                <div className={"col-md-9"}>
                    <ProductList products={this.state.fetchedProducts} />
                </div>
            </div>
        );
    }
}

class ProductList extends React.Component {
    constructor(props) {
        super(props);
    }

    //stock = this.props.products;

    render() {
        return (
            Object.keys(stock).map(productId => {
                return (
                    <Product key={productId} productId={productId} prodStock={stock[productId]} />
                )
            })
        )
    }
}

class Product extends React.Component {
    constructor(props) {
        super(props);
    }

    renderRow(row) {
        return (
            <tr key={row.size_id}>
                <td>{row.quantity}</td>
                <td>{row.size_text}</td>
            </tr>
        );
    }

    renderSortableRow(row) {
        var row = {
            "quantity": row.quantity,
            "size_text": row.size_text,
            "simple_id": row.simple_id
        }

        return row;
    }

    renderProductDetails(product) {
        const inStockProdStr = [];
        const outStockProdStr = [];

        if (product.length) { // product is an array
            product.forEach(p => {
                if (p.quantity == 0) {
                    outStockProdStr.push(this.renderRow(p))
                }
                else {
                    inStockProdStr.push(this.renderSortableRow(p))
                }
            });
        }
        else { // product is an object
            if (typeof product == 'object') {
                Object.keys(product).forEach(id => {
                    if (product[id].quantity == '0') {
                        outStockProdStr.push(this.renderRow(product[id]))
                    }
                    else {
                        inStockProdStr.push(this.renderSortableRow(product[id]))
                    }
                }
                );
            }
        }

        return (
            <div className={'product-tables'}>
                <InStockTable stockArr={inStockProdStr} />
                <div className={'out-stock'}>
                    <h5>Out Of stock</h5>
                    <table className={'table'}>
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Qty</th>
                                <th scope="col">Size</th>
                            </tr>
                        </thead>
                        <tbody>
                            {outStockProdStr.map(p => p)}
                        </tbody>
                    </table>
                </div>
            </div >
        );
    }

    render() {
        return (
            <div id="product-container">
                <div id="product-info">
                    <h3>Product ID. {this.props.productId}</h3>
                    <div id="product-line-detail">
                        {
                            this.renderProductDetails(this.props.prodStock)
                        }
                    </div>
                </div>
            </div>
        );
    }
}

class InStockTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            sortOrder: '',
        }

        this.compareBy.bind(this);
        this.sortBy.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.stockArr !== prevState.data) {
            return { data: nextProps.stockArr };
        }
        return null;
    }

    compareBy(key) {
        if (this.state.sortOrder == '' || this.state.sortOrder == 'asc') {
            this.setState({sortOrder: 'des'});
            return function (a, b) {
                if (a[key] < b[key]) return -1;
                if (a[key] > b[key]) return 1;
                return 0;
            }
        }
        else {
            this.setState({sortOrder: 'asc'});
            return function (a, b) {
                if (a[key] < b[key]) return 1;
                if (a[key] > b[key]) return -1;
                return 0;
            }
        }
    }

    sortBy(key) {
        let arrayCopy = [...this.state.data];
        arrayCopy.sort(this.compareBy(key));
        this.setState({ data: arrayCopy });
    }

    render() {

        console.log(this.state.data);

        return (
            <div className={'in-stock'}>
                <h5>In stock</h5>
                <table className={'table'}>
                    <thead className="thead-dark">
                        <tr>
                            <th onClick={() => this.sortBy('quantity')} scope="col">Qty ^</th>
                            <th scope="col">Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map((s) => (
                                <tr key={s.simple_id}>
                                    <td>{s.quantity}</td>
                                    <td>{s.size_text}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

ReactDOM.render(
    <RequestForm />,
    document.getElementById('form')
);
