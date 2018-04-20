var stock = { // Set this variable equal to the API response, after validating form data and doing the request
    "myShirt": [
        {
            "size_text": "Small",
            "quantity": 0,
        },
        {
            "size_text": "Medium",
            "quantity": 0,
        },
        {
            "size_text": "Large",
            "quantity": 0,
        },
    ],

    "myShirt2": [
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
            <div>
                {
                    // this part can display size and quantities to console. How do I modify this code to actually display to browser? 
                    Object.keys(stock).map(e => {
                        console.log(e + ":");
                        stock[e].map(o => console.log(o.size_text + " has " + o.quantity + " in stock"));
                    })
                }
            </div>
        );
    }
}

ReactDOM.render(
    <Products />,
    document.getElementById('products'),
    function () { console.log('ReactDOM.render has been called'); }
);