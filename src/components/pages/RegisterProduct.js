import React, { useEffect, useState } from 'react'
import styles from './RegisterProducts.module.css'
import api from '../../apis/api_projedata'
import { Button } from 'reactstrap'
export default function RegisterProducts() {
    const [initialFeedstocks, setInitialFeedstocks] = useState([])
    const [feedstocks, setFeedstocks] = useState([]);
    const [selectedFeedstocks, setSelectFeedstocks] = useState([]);
    const [update, setUpdate] = useState(0)
    const [name, setName] = useState()
    const [value, setValue] = useState()

    useEffect(() => {
        api.get("/feedstocks").then((response) => {
            for (var i = 0; i < response.data.length; i++) {
                response.data[i].checked = false;
            }
            setFeedstocks(response.data)
            setInitialFeedstocks(response.data)
            console.log(response.data)
        }).catch(() => {
            console.log("deu erro");
        })
    }, [])

    let dataProduct = {
        name: name,
        value: value
    }

    let dataFeedstocks = []

    function register(e) {
        e.preventDefault();
        api.post("/products", dataProduct).then((response) => {
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

            alert("Registered successfully!")
            window.location.href = '/products'
        }).catch((err) => {
            alert("Error!")
        })
    }

    function feedstocksSelected(value, code) {
        var i = selectedFeedstocks.findIndex(x => parseInt(x.code) === parseInt(code));
        selectedFeedstocks[i].stock = parseInt(value)
    }

    function searchFeedstocks(e) {
        const filterFeedstocks = initialFeedstocks.filter((feedstock) => feedstock.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setFeedstocks(filterFeedstocks)
    }

    return (
        <section>
            <div className={styles.title}>Register product</div>
            <form>
                <input className={styles.sizeInput} type="text" placeholder='Name' onChange={(e) => { setName(e.target.value) }} /><br/><br/>
                <input className={styles.sizeInput} type="text" placeholder='R$' onChange={(e) => { setValue(e.target.value) }} />
                <br />
                <div className={styles.boxes_feedstocks}>
                        <div className={styles.stock}>
                            <input type="text" style={{ width: '100%' }} placeholder="Search..." onChange={searchFeedstocks} />
                            <div>Select the feedstocks:</div>
                            {feedstocks?.map((feedstock, i) => {
                                return (
                                    <div key={feedstock.code}>
                                        <hr /><input type="checkbox" defaultChecked={feedstock.checked} name="feedstocks" value={feedstock.code} onChange={(e) => {
                                            if (e.target.checked === true) {
                                                feedstock.checked = true;
                                                setSelectFeedstocks([...selectedFeedstocks, { name: feedstock.name, code: feedstock.code, stock: 1 }])
                                            } else {
                                                feedstock.checked = false;
                                                var i = selectedFeedstocks.findIndex(x => x.name === feedstock.name);
                                                selectedFeedstocks.splice(i, 1);
                                                setUpdate(update + 1)
                                            }
                                        }} /> <span>{feedstock.name}</span>
                                    </div>

                                )
                            })}
                        </div>
                        <div className={styles.stock}>
                            <div>Selected feedstocks:</div>
                            {selectedFeedstocks.map((selectedFeedstock) => {
                                return (
                                    <div key={selectedFeedstock.code}>
                                        <hr />
                                        <div>
                                            <div>{selectedFeedstock.name}</div>
                                            <div><input type="number" placeholder={selectedFeedstock.stock} min="1" name={selectedFeedstock.code} className={styles.number} onChange={(e) => {
                                                feedstocksSelected(e.target.value, e.target.name)
                                                console.log(selectedFeedstock)
                                            }} /></div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                </div>
                <br />
                <Button className={styles.buttonProduct} color="success" onClick={register}>Send</Button>
            </form>
        </section>
    )
}