import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { account } from '../appwrite/conf';

function Verify() {
    const navigate = useNavigate()
    const [params] = useSearchParams();
    const secret = params.get('secret')
    const id = params.get('userId')

    async function updateverify(){
        try {
            const verify=await account.updateVerification(id,secret);
        alert("user is verified")
        navigate ('/Login')
        } catch (error) {
            console.log(error);
        }
    }

    updateverify()
  return (
    <div className=' bg-slate-500 '>
        <button
        onClick={updateverify()}
         type="button"
         className="rounded-full bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm
                    hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                    focus-visible:outline-black">
          Verify
</button>
    </div>
  )
}

export default Verify;
