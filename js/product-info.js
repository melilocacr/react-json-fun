var stock = { // Set this variable equal to the API response, after validating form data and doing the request
    "myShirt": [
        {
            "size_text": "Small",
            "quantity": 1,
        },
        {
            "size_text": "Medium",
            "quantity": 3,
        },
        {
            "size_text": "Large",
            "quantity": 5,
        },
    ],

    "myShirt2": [
        {
            "size_text": "Small",
            "quantity": 3,
        },
        {
            "size_text": "Medium",
            "quantity": 2,
        },
        {
            "size_text": "Large",
            "quantity": 0,
        },
    ],
    "myShirt3": [
        {
            "size_text": "Small",
            "quantity": 3,
        },
        {
            "size_text": "Medium",
            "quantity": 0,
        },
        {
            "size_text": "Large",
            "quantity": 0,
        },
    ]
};

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
    }

    handleChange(event) {
        this.setState({ productId: event.target.value });
    }

    handleSubmit(event) {
        this.fetchProductData();
        event.preventDefault();
    }

    fetchProductData() {
        var sizeRequestUrl = 'https://www.dollskill.com/codetest/api.php?ids=' + this.state.productId + '&op=get_size_attributes';

        fetch(sizeRequestUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({ fetchedProducts: result });
                    console.log(this.state.fetchedProducts); // THIS LOGS FINE!!
                }
            )
    }

    render() {
        return (
            <div class="row">
                <div class="col-md-3 sidepanel">
                    <div class="form-container">
                        <h3>Product Info Request</h3>
                        <hr />
                        <form onSubmit={this.handleSubmit}>
                            <div class="form-group">
                                <label htmlFor="product-id">Product Id(s):</label>
                                <input type="text" class="form-control"
                                    placeholder="Enter product Id(s) separated by commas (i.e 143249,142593,141975,150605)"
                                    value={this.state.productId}
                                    onChange={this.handleChange} />
                            </div>
                            <button type="submit" class="btn btn-default">SUBMIT</button>
                        </form>
                    </div>
                </div>
                <div class="col-md-9">
                    <ProductList products={this.state.fetchedProducts} />
                </div>
            </div>
        );
    }
}

class ProductList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.products
        }
    }

    render() {
        console.log(this.state.data); //NOTHING LOGS HERE!!!
        return (
            <div id="product-container">{Object.keys(this.state.data).map(productId => {
                return <div id="product-info">
                    <h2>{productId}</h2>
                    <div id="product-line-detail">{
                        this.state.data[productId].map(productDetail => <div className={'left'}>{`${productDetail.size_text} has ${productDetail.quantity} in stock`}</div>)
                    }
                    </div>
                </div>
            })}
            </div>
        )
    }
}

ReactDOM.render(
    <RequestForm />,
    document.getElementById('form'),
);