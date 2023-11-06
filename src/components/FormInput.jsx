const FormInput = ({ title, type, value, onChange }) => {
	return (
		<div className='min-w-1/2 w-full flex flex-col gap-y-1'>
			<label htmlFor={title}>{title}</label>
			<input
				type={type}
				value={value}
				placeholder={title}
				name={title}
				id={title}
				autoComplete="off"
				className='w-full px-2 py-2 rounded-sm border border-gray-300 outline-none font-light duration-200 focus:border-[var(--colorPrincipal)]'
				onChange={onChange}
			/>
		</div>
	)
}

export default FormInput
