import {useState} from "react";
import { ActionMode } from "constants/index";
import DeletaPaletaModal from "components/DeletaPaletaModal/DeletaPaletaModal";
import './Home.css';
import PaletaLista from "components/PaletaLista/PaletaLista";
import AdicionaEditaPaletaModal from 'components/AdicionaEditaPaletaModal/AdiconaEditaPaletaModal';
import Navbar from 'components/Navbar/Navbar'

function Home() {
  const [canShowAdicionaPaletaModal, setCanShowAdicionaPaletaModal]= useState(false);
  const [paletaParaAdicionar, setPaletaParaAdicionar] = useState();
  const [paletaEditada, setPaletaEditada] = useState();
  const [paletaRemovida, setPaletaRemovida] = useState();
  const [modoAtual, setModoAtual] = useState(ActionMode.NORMAL);
  const handleActions = (action) => {
    const novaAcao = modoAtual === action ? ActionMode.NORMAL : action;
    setModoAtual(novaAcao);
  }
  const [paletaParaEditar, setPaletaParaEditar] = useState();
  const [paletaParaDeletar, setPaletaParaDeletar] = useState();
  const handleDeletePaleta = (paletaToDelete) => {
    setPaletaParaDeletar(paletaToDelete);
  }
  
  const handleUpdatePaleta = (paletaToUpdate) => {
    setPaletaParaEditar(paletaToUpdate);
    setCanShowAdicionaPaletaModal(true);
  }

  const handleCloseModal = () => {
    setCanShowAdicionaPaletaModal(false);
    setPaletaParaAdicionar();
    setPaletaParaDeletar();
    setPaletaParaEditar();
    setModoAtual(ActionMode.NORMAL);
  }
  return (
    <div className="Home">
      <Navbar 
        mode={modoAtual}
        createPaleta={()=>setCanShowAdicionaPaletaModal(true)}
        deletePaleta={() => handleActions(ActionMode.DELETAR)}
        updatePaleta={() =>  handleActions(ActionMode.ATUALIZAR)}/>
      <div className="Home__container">
        <PaletaLista 
        mode={modoAtual}
        paletaCriada={paletaParaAdicionar}
        paletaEditada={paletaEditada}
        deletePaleta={handleDeletePaleta}
        updatePaleta={handleUpdatePaleta}
        paletaRemovida={paletaRemovida} />
        {
          canShowAdicionaPaletaModal && (
          <AdicionaEditaPaletaModal 
          mode={modoAtual}
          paletaToUpdate={paletaParaEditar}
          onUpdatePaleta={(paleta) => setPaletaEditada(paleta)}
          closeModal={handleCloseModal} 
          onCreatePaleta={(paleta) => setPaletaParaAdicionar(paleta)} />)
        }
        {
          paletaParaDeletar &&
          <DeletaPaletaModal
          paletaParaDeletar={paletaParaDeletar}
          closeModal={handleCloseModal}
          onDeletePaleta={(paleta) => setPaletaRemovida(paleta)}/>
        }
      </div>
    </div>
  );
}

export default Home;