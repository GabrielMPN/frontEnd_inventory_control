import React, {useState, useEffect} from 'react'
import styles from './UpdateFeedstock.module.css'
import api from '../../apis/api_projedata'
import { useParams } from "react-router-dom";
import { Button } from 'reactstrap'

export default function UpdateFeedstock() {
    const { id } = useParams();
    const [name, setName] = useState('')
    const [stock, setStock] = useState(0)

    useEffect(()=> {
      api.get(`/feedstocks/${id}`).then((response)=> {
       setName(response.data.name)
       setStock(response.data.stock)
      })
    }, [id])

    let dataFeedstock = {
        name: name,
        stock: stock
    }

    function register(e) {
        e.preventDefault();
        api.put(`/feedstocks/${id}`, dataFeedstock).then(()=> {
            alert("Feedstock successfully updated!")
            window.location.href = '/feedstocks'
        }).catch(()=> {
            alert("Error!")
        })
    }

    return (
        <section>
        <div className={styles.title}>Update Feedstock</div>
        <form className= {styles.formFeedstock}>
            <div className= {styles.boxRegister}>
        <input type="text" placeholder='Name' value={name} onChange={(e)=> setName(e.target.value)}/><br/><br/>
        <input type="text" placeholder='Stock' value={stock} onChange= {(e)=> setStock(e.target.value)}/><br/><br/>
        <Button color="success" onClick={register}>Send</Button>
        </div>
        </form>
        </section>
    )
}