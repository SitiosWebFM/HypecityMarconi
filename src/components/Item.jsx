import React from 'react'
import '../stylesheets/Item.css'
import { useNavigate } from 'react-router-dom'


function Item({products}) {
  const {id, name , category , price , img , stock} = products

  const navigate = useNavigate()

  const HandleDetalle = () =>{
    navigate(`/details/${id}/${category}-${name}`)
  }

  return (
    <div className='productos' onClick={HandleDetalle}>
      <div className='img-prod'>
          { 
            stock === 0 ?(
              <>
                <span className='out-stock'>Sin stock</span>
                <img src={`${img}`} alt={`Imagen ${name}`} /> 
              </>
            )
            : <img src={`${img}`} alt={`Imagen ${name}`} />
          }
          </div>
          <div className='detalles'>
            <h1 className='name'>{name}</h1>
            <h3 className='price'>{`$${price}`}</h3> 
          </div>
    </div>
  )
}

export default Item