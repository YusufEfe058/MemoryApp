import { useEffect, useState } from 'react';
import './App.css';
import MemoryCard from './components/MemoryCard';


//KARTLARIN LİSTESİ BURADA TANIMLANIR;

const cardList = [
  { "path": "/img/1.jpeg", matched: false },
  { "path": "/img/2.jpeg", matched: false },
  { "path": "/img/3.jpeg", matched: false },
  { "path": "/img/4.jpeg", matched: false },
  { "path": "/img/5.jpeg", matched: false },
  { "path": "/img/6.jpeg", matched: false }
];

//-------------------------------------

//------------------------------------------------------

function App() {
  const [cards, setCards] = useState([]);
  const [selectedOne, setSelectedOne] = useState(null);
  const [selectedTwo, setSelectedTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);

//-------------------------------------------------------

//KARTLAR RASTGELE SIRALANIR;

  const prepareCards = () => {

    const sortedCards = [...cardList, ...cardList]
      .sort(() => 0.5 - Math.random())
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(sortedCards);
    setSelectedOne(null);
    setSelectedTwo(null);
    setScore(0);
  }

//-------------------------------

//EĞER 1. KART SEÇİLMİŞSE 2. NİN SEÇİLMESİNİ SAĞLAR, İLKİ SEÇİLMEDİYSE İLKİNİ SEÇER

  const handleSelected = (card) => {
    selectedOne ? setSelectedTwo(card) : setSelectedOne(card);
  }

//----------------------------------------------------------------------------------

  useEffect(() => {
    prepareCards();
  }, []);

//EĞER 2 SEÇİM DE YAPILDIYSA 3. BİR SEÇİM YAPILMASI ENGELLENİR (SETDİSABLED);

  useEffect(() => {
    if(selectedOne && selectedTwo) {
      setDisabled(true);

//----------------------------------------------------------------------------

//KARTLAR EŞLEŞİYORSA DURUM GÜNCELLENİR (MATCH = TRUE) VE 10 PUAN EKLENİR;

      if(selectedOne.path === selectedTwo.path) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.path === selectedOne.path) {
              return { ...card, matched: true }
            } else {
              return card;
            }
          });
        });
        setScore(prevScore => prevScore + 10);
        resetState();

//KARTLAR EŞLEŞMİYOR İSE 5 PUAN DÜŞÜRÜLÜR VE 1 SANİYE SONRA YENİ SEÇİM HAKKI DOĞAR;

      } else {
        setTimeout(() => {
          setScore(prevScore => prevScore - 5);
          resetState();
        }, 1000);
      }
    }
  }, [selectedOne, selectedTwo])

//--------------------------------

//SEÇİMDEN SONRA TEKRAR SEÇİM SAĞLANIR;

  const resetState = () => {
    setSelectedOne(null);
    setSelectedTwo(null);
    setDisabled(false);
  }

//--------------------------------------


//UYGULAMANIN GÖRÜNTÜSÜ;

  return (
    <div className="container">
      <h1>HAFIZA OYUNU</h1>
      <button onClick={prepareCards}>Oyunu Başlat</button>
      <p>PUAN: {score}</p>

      <div className="card-grid">
        {
          cards.map(card => (
            <MemoryCard 
              card={card} 
              key={card.id} 
              handleSelected={handleSelected}
              disabled = {disabled}
              rotated = {card === selectedOne || card === selectedTwo || card.matched}
            />
          ))
        }
      </div>
    </div>
  );
}

//------------------------------------------------------

export default App;
