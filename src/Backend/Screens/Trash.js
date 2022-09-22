

import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

import Footer from '../../Frontend/Components/Footer';
import { useGlobalContext } from '../../Functions/Context';
import { db } from '../../Utils/Firebase';
import Loader from '../Components/Loader';





const Trash = () => {

    const { setloader, loader, handleDelete } = useGlobalContext()
   
    const [complains, complainsF] = useState([]);

    useEffect(() => {
        setloader(true);
        const unsub = onSnapshot(
            collection(db, "complains"),

            (snapshot) => {
                let list = [];

                snapshot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                complainsF(list);
                setloader(false)
            },

            (error) => {
                console.log(error);
            }
        );

        return () => {
            unsub();
        };
    }, []);










    return (
        <div className='dashboard'>


            {loader ? <Loader />


                :

                <>
                    <div style={{ minHeight: '70vh' }}>

                        <div className='topauthnav'>
                            <h1>Trash Message</h1>

                        </div>



                        <>


                            <div style={{ backgroundColor: 'transparent' }} className='notificationBox'>
                                {/* <h3>Recent Complains</h3> */}


                                <div className='reports'>

                                    {
                                        complains.length > 0 ?

                                            <>

                                                {complains.map((report, index) =>

                                                    <div key={index} className="report" >
                                                        <h5>{report.title}</h5>

                                                        <p>{`${report.description.substring(0, 100)}...`}</p>

                                                        <button onClick={() => {
                                                            handleDelete(report.id)
                                                        }} style={{ backgroundColor: 'red' }} className='btn'>Delete</button>


                                                    </div>


                                                )}
                                            </>

                                            :
                                            <div className='notificationBox' style={{ backgroundColor: 'rgb(246, 249, 252)', textAlign: 'center' }}>
                                                <img src='img/trash.png' alt='' />

                                                <p style={{ marginTop: -40 }}>Sorry, there's nothing here!</p>
                                            </div>
                                    }






                                </div>



                            </div>
                        </>


                    </div>
                    <Footer />
                </>}









        </div >
    )
}

export default Trash