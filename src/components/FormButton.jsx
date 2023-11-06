const FormButton = ({texto, onClick}) => {
  return (
    <button className='mt-5 bg-[var(--colorPrincipal)] text-white font-medium outline-none border border-transparent uppercase py-2 px-4 rounded-sm duration-200 hover:opacity-75 focus:opacity-75' onClick={onClick}>{texto}</button>
  )
}

export default FormButton