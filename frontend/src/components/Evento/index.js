function Evento () {
    function MeuEvento() {
        console.log("Fui ativado!")
    }
    
    return (
      <div>
          <p>Clqiye e dispare um evento</p>
          <button onClick={MeuEvento}>Ativar</button>
      </div>
    )
}
