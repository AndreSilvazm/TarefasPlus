import React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import styles from '@/pages/TarefasPublicas/styles.module.css'
import styles2 from '@/Components/DashboardComponents/AddTarefas.module.css'

import { FormEvent, useEffect, useState } from 'react';
import { db } from '@/Services/firebaseConections';
import { addDoc, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';


function index() {

    const [TarefasDB, setTarefasDB] = useState<any>([])

    const TarefasRef = collection(db, 'Tarefas')


    async function GetTasks() {

        const data = await getDocs(TarefasRef)

        setTarefasDB(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    useEffect(() => {
        GetTasks()
    }, [])




    return (
        <div className={styles.Container}>

                <h1>Tarefas públicas</h1>
            <section className={styles.MainContainer}>


                {TarefasDB.map((e) => {

                    if (e.Publico) {

                        return (
                            <article className={styles2.task}>
                                <div className={styles2.tagContainer}>
                                    <label htmlFor="" className={styles2.tag}>{e.user}</label>
                                </div>


                                <div className={styles2.taskContent}>
                                    <p>{e.Tarefa}</p>

                                </div>
                            </article>
                        )
                    }
                })}
            </section>

        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {


    const session = await getSession({ req });

    if (!session?.user) {

        return {

            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    return {

        props: {
            user: {
                email: session?.user?.email,
            }
        },
    }
}

export default index;