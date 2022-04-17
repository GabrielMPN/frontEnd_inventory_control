import { useParams } from "react-router-dom";
import styles from './UpdateProduct.module.css'
import React, { useEffect, useState } from 'react'
import api from '../../apis/api_projedata'
import { Button} from 'reactstrap'
export default function UpdateProduct() {
    const { id } = useParams();
    const [initialFeedstocks, setInitialFeedstocks] = useState([]);
    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [feedstocks, setFeedstocks] = useState([]);
    const [selectedFeedstocks, setSelectFeedstocks] = useState([]);
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        api.get("/feedstocks").then((res) => {
            api.get(`/products_feedstocks/${id}`).then((response) => {
                const arrayFeedstocksSelected = []
                for (var i = 0; i < response.data.length; i++) {
                    arrayFeedstocksSelected.push({ name: response.data[i].feedstock_fk.name, code: response.data[i].feedstock_fk.code, stock: response.data[i].quantity_feedstock })
                }
                setSelectFeedstocks(arrayFeedstocksSelected)

                for (var f = 0; f < res.data.length; f++) {
                    for (var y = 0; y < response.data.length; y++) {

                        if (res.data[f].code === response.data[y].feedstock_fk.code) {
                            res.data[f].checked = true
                            break;
                        } else {
                            res.data[f].checked = false
                        }
                    }
                }
               
                    setFeedstocks(res.data)
                    setInitialFeedstocks(res.data)
            })
        }).catch(() => {
            console.log("deu erro");
        })

        api.get(`/products/${id}`).then((response) => {
            setName(response.data.name)
            setValue(response.data.value)
        })
    }, [id])

    let dataProduct = {
        name: name,
        value: value
    }

    let dataFeedstocks = []

    function register(e) {
        e.preventDefault();
        api.put(`/products/${id}`, dataProduct).then(async (response) => {

            await api.delete(`/products_feedstocks/products/${id}`)

            for (let i = 0; i < selectedFeedstocks.length; i++) {
                dataFeedstocks.push({
                    quantity_feedstock: selectedFeedstocks[i].stock,
                    product_fk: {
                        code: response.data.code
                    },
                    feedstock_fk: {
                        code: selectedFeedstocks[i].code
                    }
                })
            }
            for (var i = 0; i < dataFeedstocks.length; i++) {
                api.post("/products_feedstocks", dataFeedstocks[i])
            }
            alert("Product successfully updated!")
            window.location.href = '/products'
        }).catch(() => {
            alert("Error!")
        })
    }

    function searchFeedstocks(e) {
        const filterFeedstocks = initialFeedstocks.filter((feedstock) => feedstock.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setFeedstocks(filterFeedstocks)
    }

    function feedstocksSelected(value, code) {
        var i = selectedFeedstocks.findIndex(x => parseInt(x.code) === parseInt(code));
        selectedFeedstocks[i].stock = parseInt(value)
    }
    return (
        <section>
            <div className={styles.title}>Update product</div>
            <form>
                <input type="text" className={styles.sizeInput} placeholder='Name' value={name} onChange={(e) => { setName(e.target.value) }} /><br/><br/>
                <input type="text" className={styles.sizeInput} placeholder='Value' value={value} onChange={(e) => { setValue(e.target.value) }} />
                <br />
                <div className={styles.boxes_feedstocks}>
                    <div className={styles.stock}>
                        <input type="text" placeholder="Search..." onChange={searchFeedstocks}/>
                        <div>Select the feedstocks:</div>
                        {feedstocks?.map((feedstock) => {
                            return (
                                <div key={feedstock.code}>
                                    <hr /><input type="checkbox" defaultChecked={feedstock.checked} name="feedstocks" value={feedstock.code} onChange={(e) => {
                                        if (e.target.checked === true) {
                                            feedstock.checked = true
                                            setSelectFeedstocks([...selectedFeedstocks, { name: feedstock.name, code: feedstock.code, stock: 1 }])
                                        } else {
                                            feedstock.checked = false
                                            var i = selectedFeedstocks.findIndex(x => x.name === feedstock.name);
                                            if (i !== -1) {
                                                selectedFeedstocks.splice(i, 1);
                                                setUpdate(update + 1)
                                            }
                                        }
                                    }} /> <span>{feedstock.name}</span>
                                </div>
                            )

                        })}
                    </div>
                    <div className={styles.stock}>
                        <div>Selected feedstocks:</div>
                        {selectedFeedstocks?.map((selectedFeedstock) => {
                            return (
                                <div key={selectedFeedstock.code}>
                                    <hr />
                                    <div>
                                        <div>{selectedFeedstock.name}</div>
                                        <div><input type="number" placeholder={selectedFeedstock.stock} min="1" name={selectedFeedstock.code} className={styles.number} onChange={(e) => {
                                            feedstocksSelected(e.target.value, e.target.name)
                                        }} /></div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <br/>
                <Button className={styles.buttonProduct} color="success" onClick={register}>Send</Button>
            </form>
        </section>
    )
}