import React from 'react'
import { db } from '../firebase'
import LinkForm from './LinkForm'

function Links() {
    const addLink= async (linkObject)=>{
        await db.collection('links').doc().set(linkObject)
        console.log('new task added')
    }


    

    
    return (
        <div>
            <LinkForm
            addLink={addLink}
            />
            <h1>links</h1>
        </div>
    )
}

export default Links
