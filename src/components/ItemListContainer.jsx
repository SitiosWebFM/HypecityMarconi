import React, { useContext, useEffect, useState } from 'react';
import '../stylesheets/ItemListContainer.css';
import Presentacion from '../img/presentacion-prod.jpeg';
import Item from './Item.jsx';

import {db} from '../firebase/config.js'
import { collection, query, getDocs } from "firebase/firestore";
import { Search } from '../context/SearchContext';

function ItemListContainer() {

  const [items , setItems] = useState([])
  const {itemFound} = useContext(Search)

  useEffect(()=>{
    const productsFirebase = [];

    (async()=>{
      const promesa = new Promise((res , rej) =>{
        res(productsFirebase);
      })
  
      try {
        const q = query(collection(db, "products"))
        /* 2do Realizar el llamado a firebase */
        const querySnapshot = await getDocs(q);
        /* 3ro Obtener el Snapshot con los datos crudos */
        querySnapshot.forEach((doc) => {
          productsFirebase.push({id: doc.id, ...doc.data()})
        });
        
        const res = await promesa;
        itemFound ? setItems(itemFound) : setItems(res)
      } 
      catch (err) {
        console.log(err);
      }
  
    })()

  },[itemFound])



  return (
    <div className='section-productos'>
        <div className='container-img-prod'>
            <img src={Presentacion} alt='Imagen Presentacion Productos' />
        </div>
      <div className={items.length ? 'container-productos' : 'container-productos-loading'}>
        {
          items.length ?
            items.map(item => {
              return <Item key={item.id} products={item}/>
            })
          :
          <>
          <div className='container-loader'>
            <div className='spinner-border' role='status'>
            </div>
            <span className='visually-visible'>Loading...</span>
          </div>
          </>
        }
      </div>
    </div>
  );
}

export default ItemListContainer