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

class Products extends React.Component {
    constructor() {
        super();
        this.state = {
            data: stock
        }
    }
    render() {
        return (
            <div id="product-container">{Object.keys(stock).map(productId => {
            return <div id="product-info">
                    <h2>{productId}</h2>
                    <div id="product-line-detail">{
                        stock[productId].map(productDetail => <div className={'left'}>{`${productDetail.size_text} has ${productDetail.quantity} in stock`}</div>)
                    }
                    </div>
            </div>
            })}
            </div>
        )
    }
} 

ReactDOM.render(
    <Products />,
    document.getElementById('products'),
    function () { console.log('ReactDOM.render has been called'); }
);