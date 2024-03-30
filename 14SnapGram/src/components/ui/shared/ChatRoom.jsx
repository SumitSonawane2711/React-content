import Loader from '@/components/ui/shared/Loader';
import { useToast } from '@/components/ui/use-toast';
import { useUserContext } from '@/context/AuthContext';
import { useCreateMessage, useDeleteMessage, useGetCreator, useGetMessages, useSubscribe } from '@/lib/react-query/queriesAndMutations';
import React, { useEffect, useState } from 'react'
import {Trash2} from 'react-feather'

const ChatRoom = () => {

    const {toast} = useToast();
    const {user} = useUserContext();
    const [messages, setMessages] = useState([])
    const [messageBody, setMessageBody] = useState('')
    
    const{mutateAsync:subScribe} = useSubscribe()
    const {
      data:creators,
      isLoading:isUserLoading,
      isError:isErrorCreators
    } = useGetCreator(10);

    useEffect(()=>{
      getMessages()

      subScribe();
      
    },
    [])

  

  const {data,isLoading,isError} = useGetMessages()
  const {mutateAsync:payload} = useCreateMessage()
  const {mutateAsync:MessageId} = useDeleteMessage()
  
  if(isError){
    toast({title:"something went wrong."});
  }

  const getMessages = async() =>{
    const response = data;
    console.log( data.documents);
    setMessages(response.documents)
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()

    const response = await payload ({body:messageBody})

    console.log("created",response);

    setMessages(prevState => [response, ...messages])
    setMessageBody('')
  }

  const deleteMessage = async (message_id) =>{
    const deletedMessage = await MessageId(message_id)
    
    if(!deletedMessage){
      toast({
        title: `delete Message failed. Please try again.`,
      });
     }

     setMessages(prevState=> messages.filter(message => message.$id !== message_id))
  }
  return (

    <main className=' container'>
      <div className='flex w-full flex-row'>
    <div className='min-w-80 w-full '>
          <div  className='flex gap-4 mt-8 ml-7 bg-red'>
              <img src={user.imageUrl || "/assets/icons/profile-placeholder.svg"} 
                  alt="creator"
                  className=' rounded-full w-14 h-14' />
              <div className='flex flex-col'>
                <p className='body-bold'>
                    {user.name}
                </p>
                <p className='small-regular text-light-3'>
                    @{user.username}
                </p>
              </div>
          </div>

          
    </div>
  </div>


      <div className='room--container'>   

        <form onSubmit={handleSubmit} id='message--form'>
          <div>
            <textarea 
               className=' bg-gray-900'
               required
               maxLength="1000"
               placeholder='Say something...'
               onChange={(e)=>{setMessageBody(e.target.value)}}
               value={messageBody}></textarea>
          </div>

          <div className='send-btn--wrapper'>
            <input className ='btn btn--secondary' type="submit" value='Send' />
          </div>
        </form>
        <div>
            {messages.map(message => (
                <div key={message.$id} className='message--wrapper'>

                    <div className='message--header'>
                       <small className = "message-timestamp">{(new Date(message.$createdAt).toLocaleString())}</small> 
                       
                       <Trash2
                         className='delete--btn'
                         onClick={()=>{deleteMessage(message.$id)}}/>
                    </div>

                    <div className='message--body'>
                        <span>{isLoading ? <Loader/>:message.body}</span>
                    </div>
                </div>
            ))}
        </div>
      </div>    
    </main>
    
  )
}

export default ChatRoom