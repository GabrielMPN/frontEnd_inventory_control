import { Table, Button } from 'reactstrap'
import styles from './Product.module.css'
import api from '../../apis/api_projedata'
import React, { useEffect, useState } from 'react'

export default function Products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get("/products").then((response) => {
            setProducts(response.data)
            console.log(response.data)
        }).catch(() => {
            console.log("deu erro");
        })
    }, [])

    function deleteProduct(code) {
        if (window.confirm("Do you really want to delete this product?")) {
            api.delete(`/products_feedstocks/products/${code}`).then(()=> {
                api.delete(`/products/${code}`)
                setProducts(products.filter(product => product.code !== code))
            })
        }
    }

    return (
        <section>
            <div className={styles.title}>Products</div>
            <Button color="primary" outline className={styles.button} href="/products/register"> Register </Button>
            <Table hover striped className={styles.table}>
                <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Value
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((product, i) => {
                        return (
                            <tr key={i}>
                                <th scope="row">
                                    {product.code}
                                </th>
                                <td>
                                    {product.name}
                                </td>
                                <td>
                                    {product.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </td>
                                <td>
                                    <Button color="info" size="sm" href={`/products/update/${product.code}`}>Update</Button>
                                </td>
                                <td>
                                    <Button color="danger" size="sm" onClick={() => deleteProduct(product.code)}>Delete</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </section>
    )
}