import React, {useEffect, useState} from 'react'
import ListItem from './ListItem'
import Details from './Details'

function List() {
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState([]);
  const [info, setInfo] = useState(null);
  const [activeElements, setActiveElements] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json');
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setList(data);
        setActiveElements(data.map((item) => {return { id: item.id, active: false }}));
      } catch(e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [])

  const setItemActive = (id) => {
    setInfo(list.filter((item) => item.id === id)[0]);
    setActiveElements(activeElements.map((item) => {
        if (item.id === id) {
          return { id: item.id, active: true };
        } else {
          return { id: item.id, active: false };
        }
      })
    )
  }
  //activeElements.filter((item) => item.id === o.id)[0].active
  return (
    <div className='row'>
      <div className='col-4'>
        <ul className='list-group'>
          {loading ? 'Loading...' : null}
          {list && activeElements ? list.map((o) => <ListItem key={o.id} itemActive={setItemActive} active={activeElements.filter((item) => item.id === o.id)[0].active} id={o.id}>{o.name}</ListItem>) : null}
        </ul>
      </div>
      <div className='col-4'>
        {info ? <Details info={info} /> : null}
      </div>
    </div>
  )
}

export default List
