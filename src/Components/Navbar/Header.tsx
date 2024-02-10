import styles from './header.module.css'
import {useSession, signIn, signOut} from 'next-auth/react'
import Link from 'next/link';

function Header() {


    const {data: session, status} = useSession();


    return (
        <div>
            <header className={styles.header}>
                <section className={styles.content}>
                    <nav className={styles.nav}>
                        <Link href='/'>
                            <h1 className={styles.logo}>Tarefas<span>+</span></h1>
                        </Link>

                        {session ? <Link href='/dashboard' className={styles.link}> Meu Painel</Link> : (<></>)}

                        {session ? <Link href='/TarefasPublicas' className={styles.link}> Tarefas públicas</Link> : (<></>)}
                        
                    </nav>

                    {
                        status === 'loading'? (<></>) 
                        
                        : 
                        
                        session ? (<button className={styles.SingOutButton} onClick={()=>signOut()}>Olá, {session?.user?.name}!</button>) 
                        
                        : 
                        
                        (
                        <button className={styles.loginButton} onClick={()=>signIn('google')}>Login</button>
                    ) 
                    
                    }
                    
                </section>
            </header>
        </div>
    );
}

export default Header;