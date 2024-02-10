import styles from "@/styles/Home.module.css";
import Imagem from 'next/image'
import HeroIMG from '../Midias/hero.png'
import Header from "@/Components/Navbar/Header";
import { FormEvent, useEffect, useState } from 'react';
import { db } from '@/Services/firebaseConections';
import { addDoc, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';


export default function Home() {

  const[Tarefas, setTarefasDB] = useState<any>([])

  const TarefasRef = collection(db, 'Tarefas')



  async function GetTasks() {

      const data = await getDocs(TarefasRef)

      setTarefasDB(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
  }


  useEffect(()=>{

    GetTasks();

  }, [])

  return (
    <>

      <div className={styles.container}>

        <main className={styles.main}>
          <div className={styles.logoContent}>
            <Imagem className={styles.hero} alt="Logo Tarefas" src={HeroIMG} priority={true} />

          </div>

          <div className={styles.secPart}>

            <h1 className={styles.title}>Sistema feito para você organizar<br /> Seus Estudos e tarefas</h1>

            <div className={styles.buttonSection}>
              <button className={styles.postsButton}> +{Tarefas.length} Tarefas registradas</button>
              <button className={styles.comentsButton}>+ 10 Tarefas públicas</button>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}
