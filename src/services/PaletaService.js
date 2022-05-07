import {Api} from 'helpers/Api';

const parseResponse = (response) => response.json();

const tranformPaleta = (paleta) =>{
    const {sabor, recheio} = paleta.sabor.split("com");

    return {
        ...paleta,
        id:paleta._id,
        titulo: paleta.sabor,
        sabor,
        ...(recheio && {recheio}),
        possuiRecheio:Boolean(recheio),
    };
};

const parseTranformLista = (response) => parseResponse(response).then((paleta) => paleta.map(tranformPaleta));

const parseTransformItem = (response) => parseResponse(response).then(tranformPaleta);

export const PaletaService= {
    getLista:() =>
        fetch(Api.paletaLista(),{method:"GET"}).then(parseTranformLista),
    getById: (id) => 
        fetch(Api.paletaById(id), { method: "GET" }).then(parseTransformItem),
    create:() =>
        fetch(Api.createPaleta(),{method:"POST"}).then(parseResponse),
    updateById:(id) =>
        fetch(Api.updatePaletaById(id),{method:"PUt"}).then(parseResponse),
    deleteById:(id) =>
        fetch(Api.deletePaletaById(id),{method:"DELETE"}).then(parseResponse),
}