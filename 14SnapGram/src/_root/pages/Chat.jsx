import Loader from '@/components/ui/shared/Loader';
import { useToast } from '@/components/ui/use-toast';
import { useGetCreator} from '@/lib/react-query/queriesAndMutations'
import { NavLink, Outlet } from 'react-router-dom';

const Chat = () => {

  const {toast} = useToast();
   
  const {
    data:creators,
    isLoading:isUserLoading,
    isError:isErrorCreators
  } = useGetCreator(10);

  if(isErrorCreators){
    toast({title:"something went wrong."});
  }

  return (
    <div className='flex w-full '>
    <div className=' leftsidebar'>
    <div className='flex flex-col gap-11 '>
      <h3 className='h3-bold md:h2-bold text-left w-full'>All Users</h3>
      {isUserLoading && !creators? (
        <Loader />
      ) : (
        <ul className='gap-3 items-center '>
          {creators?.documents.map((creator) =>(
            <li key={creator?.$id}
                className='flex-1 min-w-[200px] w-full '>
               
               <NavLink to='/chatroom'
                 className={({isActive})=>`flex flex-row gap-6 mb-5 ${isActive ? "bg-red" : "bg-black"}`}>
                 <img src={creator.imageUrl || "/assets/icons/profile-placeholder.svg"} 
                      alt="creator"
                      className=' rounded-full w-14 h-14'
                     />
                     
                
                <div className='flex-center flex-col gap-1'>
                    <p className='base-medium text-light-1 text-center line-clamp-1'>
                     {creator.name}
                    </p>
                    <p className='small-regular text-light-3 text-lef w-full line-clamp-1'>
                     @{creator.username}
                    </p>
                </div>
              </NavLink>
              
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>

  <section className='flex flex-1 h-full'>
        <Outlet /> 
  </section>

  </div>
  )
}

export default Chat