import Container from './Container'
import styles from './Navbar.module.css'
import logo from '../../images/logo.png'

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Container>
                <a href="/"><img src={logo} alt="Box" className={styles.logo}/></a>
                <ul className={styles.list}>
                    <li className={styles.item}><a href="/">Home</a> </li>
                    <li className={styles.item}><a href="/products">Products</a> </li>
                    <li className={styles.item}><a href="/feedstocks">Feedstocks</a> </li>
                </ul>
            </Container>
        </nav>
    )
}