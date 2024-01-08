import React,{useId} from 'react'

const input = React.forwardRef(function input({
    label,
    type = "text",
    className = "",
    ...props
},ref){
    return (
        <div className='w-full'>
            {label && <label 
             className='inline-block mb-1 pl-1'
             htmlFor='{id}'>
                {label}
                </label>
                }
                <input type={type}
                className={`${className} px-3 rounded-lg bg-white text-black outline-none focus:bg-green-50 duration-200 border border-gray-200 w-full`} 
                ref={ref}
                id={id}
                />
                          
        </div>
    )
    
})

export default input