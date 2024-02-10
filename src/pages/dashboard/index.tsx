import styles from '../dashboard/styles.module.css'
import Head from 'next/head';
import { useSession, getSession } from 'next-auth/react';

import Link from 'next/link';
import { GetServerSideProps } from 'next';
import AddTarefas from '@/Components/DashboardComponents/AddTarefas';


interface HomeProps{

    user: {

        email: string
    }
}
function Dashboard({user}: HomeProps) {

    return (

        <AddTarefas user={user} />
    )


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

export default Dashboard;