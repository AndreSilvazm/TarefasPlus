import styles from './AddTarefas.module.css'
import { FiShare2 } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import { FormEvent, useEffect, useState } from 'react';
import { db } from '@/Services/firebaseConections';
import { addDoc, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';



interface PropsUser {

    user: {

        email: string
    }
}


function AddTarefas({ user }: PropsUser) {

    interface TasksTypes {

        Tarefa: string,
        Publico: boolean,
        created: any,
        user: string

    }
    const [DadosTA, setDadosTA] = useState('')
    const [publictask, setPublictask] = useState(false)
    const [TarefasDB, setTarefasDB] = useState<any>([])

    const TarefasRef = collection(db, 'Tarefas')



    async function GetTasks() {

        const data = await getDocs(TarefasRef)

        setTarefasDB(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
    }


    function PegarDadosTA(event: React.ChangeEvent<HTMLTextAreaElement>) {


        setDadosTA(event.target.value)

    }

    function HandleChangePublic(event: React.ChangeEvent<HTMLInputElement>) {

        setPublictask(event.target.checked)

    }

    async function HandleRegisterTask(event: FormEvent) {

        GetTasks();

        event.preventDefault();

        const TasksOBJ: TasksTypes = {

            Tarefa: DadosTA,
            Publico: publictask,
            created: new Date(),
            user: user.email
        }

        if (DadosTA === '') {

            return;
        }

        else {

            try {
                await addDoc(TarefasRef, TasksOBJ)
            }

            catch (e) {
                console.log(e)
            }

        }

    }

    async function DeletarTarefas(Info: string){

        if (Info != '') {

            try {
                await deleteDoc(doc(db, 'Tarefas', Info));
                setTarefasDB(prevPostList => prevPostList.filter(post => post.id !== Info));
            } catch (error) {
                console.error('Erro ao excluir a Tarefa:', error);
            }

        }

    }

    useEffect(() => {

        GetTasks();

    }, [])



    return (
        <div>

            <main className={styles.MainContainer}>
                <section className={styles.SectionContainer}>

                    <form className={styles.FormContainer} onSubmit={HandleRegisterTask}>

                        <h1>Qual a sua tarefa?</h1>
                        <textarea name="TarefasArea" id="" cols="10" rows="15" className={styles.textarea} onChange={PegarDadosTA}></textarea>

                        <div className={styles.CheckBoxContainer}>

                            <label htmlFor="" className={styles.checkboxlabel}>

                                <input type="checkbox" checked={publictask} onChange={HandleChangePublic} />

                                <span>
                                    Deixar tarefa pública
                                </span>
                            </label>


                        </div>

                        <button className={styles.RegistrarButton}> Registrar </button>



                    </form>

                </section>
            </main>



            <section className={styles.taskContainer}>
                <h1>Minhas tarefas</h1>

                {TarefasDB.map((e: any) => {

                    if (e.user === user.email) {

                        if (e.Publico === true) {

                            return (

                                <article className={styles.task}>
                                    <div className={styles.tagContainer}>
                                        <label htmlFor="" className={styles.tag}>Publico</label>
                                        <button className={styles.shareButton}>

                                            <FiShare2 size={22} color='#3183ff' />

                                        </button>
                                    </div>


                                    <div className={styles.taskContent}>
                                        <p>{e.Tarefa}</p>
                                        

                                        <button className={styles.trashButton} onClick={()=>{DeletarTarefas(e.id)}}>

                                            <FaTrash size={24} color='#ea3140' />

                                        </button>
                                    </div>
                                </article>
                            )

                        }

                        else if(e.Publico === false) {

                            return (

                                <article className={styles.task}>
                                    <div className={styles.tagContainer}>
                                    <label htmlFor="" className={styles.Privado}>Privada</label>

                                    </div>


                                    <div className={styles.taskContent}>
                                        <p>{e.Tarefa}</p>
                                        <button className={styles.trashButton} onClick={()=>{DeletarTarefas(e.id)}}>

                                            <FaTrash size={24} color='#ea3140' />

                                        </button>
                                    </div>
                                </article>
                            )


                        }

                    }
                })}

            </section>



        </div>
    );
}

export default AddTarefas;