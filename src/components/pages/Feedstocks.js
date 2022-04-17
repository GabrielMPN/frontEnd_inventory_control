import { Table, Button } from 'reactstrap'
import styles from './Feedstock.module.css'
import api from '../../apis/api_projedata'
import React, { useEffect, useState } from 'react'

export default function Feedstock() {

    const [feedstocks, setFeedstocks] = useState([]);
    useEffect(() => {
        api.get("/feedstocks").then((response) => {
            setFeedstocks(response.data)
            console.log(response.data)
        }).catch(() => {
            console.log("deu erro");
        })
    }, [])

    function deleteFeedstocks(code) {
        if (window.confirm("do you really want to delete this feedstock?")) {
            api.delete(`/products_feedstocks/feedstocks/${code}`).then(()=> {
        api.delete(`/feedstocks/${code}`)
        setFeedstocks(feedstocks.filter(feedstock => feedstock.code !== code))
            })
        }
    }

    return (
        <section>
            <div className={styles.title}>Feedstocks</div>
            <Button color="primary" outline className={styles.button} href="/feedstocks/register"> Register </Button>
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
                            Stock
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {feedstocks?.map((feedstock, i) => {
                        return (
                            <tr key={i}>
                                <th scope="row">
                                    {feedstock.code}
                                </th>
                                <td>
                                    {feedstock.name}
                                </td>
                                <td>
                                    {feedstock.stock}
                                </td>
                                <td>
                                <Button color="info" size="sm" href={`/feedstocks/update/${feedstock.code}`}>Update</Button>
                                </td>
                                <td>
                                <Button color="danger" size="sm" onClick={() => deleteFeedstocks(feedstock.code)}>Delete</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </section>
    )
}