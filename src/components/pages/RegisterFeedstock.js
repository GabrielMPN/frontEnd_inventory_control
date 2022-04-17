import React from 'react'
import styles from './RegisterFeedstock.module.css'
import api from '../../apis/api_projedata'
import { Button } from 'reactstrap'

export default function RegisterFeedstock() {

    let dataFeedstock = {
        name: '',
        stock: 0
    }

    function register(e) {
        e.preventDefault();
        api.post("/feedstocks", dataFeedstock).then(()=> {
            alert("Feedstock successfully registered")
            window.location.href = '/feedstocks'
        }).catch(()=> {
            alert("Item já cadastrado!")
        })
    }

    return (
        <section>
        <div className={styles.title}>Register Feedstock</div>
        <form className={styles.formFeedstock}>
        <div className={styles.boxRegister}>
        <input type="text" placeholder='Name' onChange={(e)=> {dataFeedstock.name = e.target.value}}/><br/><br/>
        <input type="text" placeholder='Stock' onChange= {(e)=> {dataFeedstock.stock = e.target.value}}/><br/><br/>
        <Button color="success" onClick={register}>Send</Button>
        </div>
        </form>
        </section>
    )
}