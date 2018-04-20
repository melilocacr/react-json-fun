class Products extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [
                {
                    "myShirt": [
                        {
                            "size": "Small",
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
                }]
        }
    }
    render() {
        return (
            <div>
                {
                    // DISPLAY DESIRED OUTPUT HERE

                    /**
                      myShirt
                        Small has 0 in stock
                        Medium has 0 in stock
                        Large has 0 in stock
                      myShirt2
                        Small has 0 in stock
                        Medium has 0 in stock
                        Large has 0 in stock
                      myShirt3
                        Small has 0 in stock
                        Medium has 0 in stock
                        Large has 0 in stock
                    */
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