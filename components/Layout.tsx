import styles from '@/styles/Home.module.css';
import Nav from '../components/Nav';
export default function Layout({ children }: any) {
    return (
        <div className={styles.container}>
            <main className={styles.main}>{children}</main>
            <Nav />
        </div>
    );
}
