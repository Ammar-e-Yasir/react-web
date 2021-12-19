import React, { useContext, useEffect, useState } from "react";
import { db, collection,getDocs,doc,deleteDoc,getDoc,addDoc,query,where,onSnapshot } from '../configs/firebase'
import { GlobalContext } from "../context/context";


export default function Home() {
    const { state, dispatch } = useContext(GlobalContext);
    const [application, setApplication] = useState([]);
    const [obj, setObj] = useState({});



    useEffect(async () => {

        try {
            const querySnapshot = await getDocs(collection(db, "request"));
            let applicationClone = application.slice(0);
            querySnapshot.forEach((doc) => {
                applicationClone.push(doc.data())
            //   console.log(doc.id, " => ", doc.data());
            });

            setApplication(applicationClone)
        }
        catch (e) {
            console.log(e)
        }

    

    }, [])

   
    const accepted = async (element) => {
        console.log(element.id)
        try {
            let a = doc(db, "request", element.id);
            let b = await getDoc(a);
            let x = b.data();
            console.log(x)
            let obj = b.data();
            obj.status='accepted'


            let acceptedApp = collection(db, 'acceptedapplication');
            await addDoc(acceptedApp, obj)


            let docDel = doc(db, "request", element.id);
            await deleteDoc(docDel);

            alert('application accepted !')
        }


        catch (e) {
            console.log(e)
        }

    }



    return (
        <div>
            <div className='container' style={{ backgroundColor: '#dcdedd' }}>
                <h1 className='text-center  pt-3'> Pending Application</h1>
                {application.map(({ name, incom,member,cnic, fName, dob,uid }, index) => {
                    return (

                        <div className='col-12 border ' id={uid}  key={index}>
                            <div className="card m-4  shadow">
                                <div className="card-body m-4" >
                                    <h2 className="card-title text-success">Name :{name}</h2>
                                    <h2 className="card-title text-success">Father Name :{fName}</h2>
                                    <h2 className="card-title text-success">Incom :{incom}</h2>
                                    <h2 className="card-title text-success">Family Members :{member}</h2>
                                    <h2 className="card-title text-success">CNIC :{cnic}</h2>
                                    <h2 className="card-title text-success">Date Of Birth :{dob}</h2>
                                    
                                    <button className='btn btn-success mt-4' onClick={(e)=>{accepted(e.target.parentNode.parentNode.parentNode)}}>Accept</button>

                                </div>
                            </div>
                        </div>

                    )

                })
                }
            </div>
        </div>
    )
}