import { Table } from 'reactstrap'
import styles from './Home.module.css'
import { useEffect, useState } from 'react'
import api from '../../apis/api_projedata'

export default function Home() {
    const [productsCanMake, setProductsCanMake] = useState([])

    useEffect(() => {
        api.get("/products").then(async (response) => {

            var arrayProductsCanMake = []

            for (var p = 0; p < response.data.length; p++) {
                let canMake = true
                let arrayMinValueQuantity = [];
                await api.get(`/products_feedstocks/${response.data[p].code}`).then((res) => {
                    for (var pf = 0; pf < res.data.length; pf++) {

                        if (res.data[pf].quantity_feedstock > res.data[pf].feedstock_fk.stock) {
                            canMake = false
                        }
                        let quantityCanMake = parseInt(res.data[pf].feedstock_fk.stock / res.data[pf].quantity_feedstock)
                        arrayMinValueQuantity.push(quantityCanMake)
                    }

                    response.data[p].quantityCanMake = parseInt(Math.min(...arrayMinValueQuantity))
                    response.data[p].totalValue = response.data[p].quantityCanMake * response.data[p].value;
                    console.log(response.data[p])
                    if (canMake && response.data[p].quantityCanMake === response.data[p].quantityCanMake) {
                    arrayProductsCanMake.push(response.data[p])
                    }
                })
            }

            arrayProductsCanMake = arrayProductsCanMake.sort((a, b) => {
                if (a.totalValue < b.totalValue) {
                    return -1;
                } else {
                    return true;
                }
            })
            arrayProductsCanMake.reverse();
            setProductsCanMake(arrayProductsCanMake)
        })
    }, [])

    return (
        <section>
            <div className={styles.title}>Products you can manufacture</div>
            <Table hover striped className={styles.table}
            >
                <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>
                            Product
                        </th>
                        <th>
                            Quantity
                        </th>
                        <th>
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {productsCanMake?.map((product,i) => {
                        return (
                            <tr key={i}>
                                <th scope="row">
                                    {product.code}
                                </th>
                                <td>
                                    {product.name}
                                </td>
                                <td>
                                    {product.quantityCanMake}
                                </td>
                                <td>
                                    {product.totalValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </Table>
        </section>
    )
}