import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';


//Näyttää tuotteet tuoteryhmittäin
export default function Tuoteryhma({url, category}) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (category !== null) {
            axios.get(url + 'tuote/getproducts.php/' + category?.id)
            .then((response) => {
                const json = response.data;
                setProducts(json);
            }).catch(error => {
                if (error.response === undefined) {
                    alert(error);
                } else {
                    alert(error.response.data.error);
                }
            })
        }
    }, [category])
    
    return (
        <div style={{'padding-top': '100px'}}>
            <h3>Products for {category?.name}</h3>
            {products.map(product => (
                <div key={product.id}>
                    <p>{product.name}</p>
                    <div>
                        <img src={url + 'IMG/' + product.image} alt="" />
                    </div>
                    {/* Tuotteen lisäys ostoskoriin-painike /AK */}
                    <button class="btn-secondary" type="button">Lisää <i className="bi bi-cart-fill mx-2"></i></button>  
                    
                    {/* Linkki tuote-sivulle / Yksittäisen tuotteen näyttäminen / AK
                    <Link
                        to={{
                          pathname: '/Tuote',
                          state: {
                            id: product.id,
                            name: product.name,
                          }
                        }}>
                        {product.name}
                    </Link>
                    
                    
                    */}
                </div>
            ))}
        </div>
    )
}