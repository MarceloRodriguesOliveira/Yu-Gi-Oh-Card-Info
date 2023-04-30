import { useEffect, useState } from "react";
import Style from './Styles/Style.module.css'
import logo from './logo.png'


function App() {

  const [name,setName] = useState('')
  const [searchName,setSearchName] = useState('')
  const [description,setDescription]=useState('')
  const [art,setCardArt]=useState('')
  const [attribute,setAttribute] = useState('')
  const [type,setType]=useState('')
  const [race,setRace]=useState('')
  const [atk,setAtk]=useState('')
  const [def,setDef]=useState('')

  const [monster,setMonster]=useState(false)

  const searchCard = async(e)=>{
    if(e.key==='Enter'){
      e.preventDefault()
      const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${searchName}`)
      if(response.status == 200){
        console.log('chamar função aqui')
        getCard(response)
      }else{
        alert('Carta não encontrada. Tente novamente!')
        return
      }
      
    }
    return

  }

  const getCard= async (response)=>{
    //cleanup
    setName('')
    setDescription('')
    setCardArt('')
    setAttribute('')
    setRace('')
    setType('')
    setMonster(false)
    setAtk('')
    setDef('')
    // const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${searchName}`)
    const cardData = await response.json()
    console.log(cardData)
    setName(cardData.data[0].name)
    setDescription(cardData.data[0].desc)
    setCardArt(cardData.data[0].card_images[0].image_url)
    setType(cardData.data[0].type)
    setRace(cardData.data[0].race)
      if(cardData.data[0].type.includes('Monster')){
        setAttribute(cardData.data[0].attribute)
        setMonster(true)
        setAtk(cardData.data[0].atk)
        setDef(cardData.data[0].def)
      }
  

    
   
  }

  useEffect(()=>{
    const randomCard = async ()=>{
      const random = await fetch('https://db.ygoprodeck.com/api/v7/randomcard.php')
      const randomCardInfo = await random.json()
      console.log(randomCardInfo)
      setName(randomCardInfo.name)
      setDescription(randomCardInfo.desc)
      setCardArt(randomCardInfo.card_images[0].image_url)
      setType(randomCardInfo.type)
      setRace(randomCardInfo.race)
      if(randomCardInfo.type.includes('Monster')){
        setAttribute(randomCardInfo.attribute)
        setMonster(true)
        setAtk(randomCardInfo.atk)
        setDef(randomCardInfo.def)
      }
    }

    randomCard()

    return ()=>{}
  },[])

  



  return (
    <div>
      <nav className={Style.header_container}>
        <a href="#"><img src={logo}/></a>
        <input type="text" placeholder="Insert card name..." onKeyDown={searchCard} onChange={(e)=>setSearchName(e.target.value)}></input>
        <a href="https://github.com/MarceloRodriguesOliveira">About me</a>
      </nav>
      <div className={Style.card_info}>
        <div className={Style.card_art}>
          <img src={art} alt="" />
        </div>
        <div className={Style.card_stats}>
          <div className={Style.card_stats_info}>
            <span>Type: {type} </span>
            <div>
              <span>Race: {race}</span>
            </div>
          </div>
          <div className={Style.card_stats_description}>
            <p>{description}</p>
            {monster &&
              <div className={Style.card_stats_complementary}>
                <p>ATK/{atk} DEF/{def}</p>
                <p>Attribute: {attribute} </p>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
