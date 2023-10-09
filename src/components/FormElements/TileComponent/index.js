



export default function TileComponent({ data, selected=[], onClick }){

    return data && data.length ? (
        <div className="flex flex-wrap items-center gap-1 mt-3">
            {
                data.map((dataItem)=>(

                    <label 
                        className='cursor-pointer'
                        key={dataItem.id} 
                        onClick={()=> onClick(dataItem) }
                    >
                        <span 
                        className={`rounded-lg border border-black font-bold px-6 py-2 ${ selected && selected.length && selected.map(item => item.id).indexOf(dataItem.id) !== -1 ? 'text-white bg-black' : '' }`}
                        >
                            {dataItem.label}
                        </span>
                    </label>

                ))
            }
        </div>
    ) : null;
}