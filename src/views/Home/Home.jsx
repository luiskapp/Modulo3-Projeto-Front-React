import {useState} from "react";
import './Home.css';
import PaletaLista from "components/PaletaLista/PaletaLista";
import AdicionaPaletaModal from 'components/AdicionaPaletaModal/AdiconaPaletaModal';
import Navbar from 'components/Navbar/Navbar'

function Home() {
  const {canShowAdicionaPaletaModal, setCanShowAdicionaPaletaModal}= useState(false);
  return (
    <div className="Home">
       <Navbar createPaleta={()=>setCanShowAdicionaPaletaModal(true)}/>
      <div className="Home__container">
        <PaletaLista />
        {
          canShowAdicionaPaletaModal && (<AdicionaPaletaModal closeModal={()=>setCanShowAdicionaPaletaModal(false)} />)
        }
      </div>
    </div>
  );
}

export default Home;