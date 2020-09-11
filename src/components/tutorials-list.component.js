import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";
import Select from 'react-select';
import { colourOptions } from '../docs/data';
//import { Note } from '../docs/styled-components';

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.borrarTodo = this.borrarTodo.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.retrieveIngredientes = this.retrieveIngredientes.bind(this);
    this.addIngredientes = this.addIngredientes.bind(this);
    this.searchReceta = this.searchReceta.bind(this);

    this.state = {
      tutorials: [],
      ingredientes: [],
      recetas: [],
      lista:[],
      setList:null,
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: "",
      isClearable: true,
      isDisabled: false,
      isLoading: false,
      isRtl: false,
      isSearchable: true,
      divIngredientes: false,
      divRecetas:false
     

    };
    
    
  }
  

  componentDidMount() {
    //this.retrieveTutorials();
    this.retrieveIngredientes();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTutorials() {
    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
        
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveIngredientes() {
    TutorialDataService.getIngredientes()
      .then(response => {
        this.setState({
          ingredientes: response.data
          
        });
        
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  addIngredientes(e) {

    if (e.value) {
      let existe = false;
      for(var i = 0; i < this.state.lista.length; i++) {
        if (this.state.lista[i].value ==  e.value) {
            existe = true;
        }
      }

      if(!existe){
        this.state.lista.push({ value: e.value, label: e.label })
      }

      this.state.divIngredientes = (this.state.lista.length>0)?true:false;

      this.setState({
        lista: this.state.lista,
        divIngredientes: this.state.divIngredientes
      });
    
    }

  }

  eliminarIngrediente(e) {
    if (e.value) {
    
     

      for(var i = 0; i < this.state.lista.length; i++) {
        if (this.state.lista[i].value ==  e.value) {
          this.state.lista.splice(i,1)
        }
      }
      

      this.state.divIngredientes = (this.state.lista.length>0)?true:false;

      this.setState({
        lista: this.state.lista,
        divIngredientes: this.state.divIngredientes
      });
    
    }
   
  }

  borrarTodo() {
    this.setState({
      lista: [],
      
    });
  }

  searchTitle() {
    TutorialDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchReceta() {
    TutorialDataService.buscarRecetas(this.state.lista)
      .then(response => {
        
        this.state.divRecetas = (response.data.length>0)?true:false;

        this.setState({
          recetas: response.data,
          divRecetas: this.state.divRecetas
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  redirectToTarget = (e) => {
    console.log(e)
    this.props.history.push('/receta/'+e.receta_id)
  }

  toggleClearable = () =>
  this.setState(state => ({ isClearable: !state.isClearable }));
toggleDisabled = () =>
  this.setState(state => ({ isDisabled: !state.isDisabled }));
toggleLoading = () =>
  this.setState(state => ({ isLoading: !state.isLoading }));
toggleRtl = () => this.setState(state => ({ isRtl: !state.isRtl }));
toggleSearchable = () =>
  this.setState(state => ({ isSearchable: !state.isSearchable }));

  render() {
    const { searchTitle, tutorials, ingredientes, currentTutorial, currentIndex, isClearable, recetas,divIngredientes, divRecetas,
    isSearchable,
    isDisabled,
    isLoading,
    isRtl,
    setList,
    lista
    

    } = this.state;

   // const [list, setList] = React.useState(initialList);
    const groupStyles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    };
    const groupBadgeStyles = {
      backgroundColor: '#EBECF0',
      borderRadius: '2em',
      color: '#172B4D',
      display: 'inline-block',
      fontSize: 12,
      fontWeight: 'normal',
      lineHeight: '1',
      minWidth: 1,
      padding: '0.16666666666667em 0.5em',
      textAlign: 'center',
    };
    

    const formatGroupLabel = data => (
      <div style={groupStyles}>
        <span>{data.label}</span>
        <span style={groupBadgeStyles}>{data.options.length}</span>
      </div>
    );

    let options = this.state.ingredientes.map(function (city) {
      return { value: city.id, label: city.nombre };
    })
    

    return (
      <div className="list row">
        
        <div className="col-md-6">
          <h4>Busca tu receta preferida</h4>
          <Select
          className="basic-single"
          classNamePrefix="Selecciona un Ingrediente"
          // defaultValue={options[0]}
          isDisabled={isDisabled}
          isLoading={isLoading}
          // isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          name="color"
          onChange={this.addIngredientes}
          options={options}
          />
          { lista.length>0 ?  <div>
        
            <br />
            <p> Lista de Ingredientes: </p>
            <ul className="list-group">
            {lista &&
            lista.map((ingrediente, index) => (
              <li
                className={
                  "list-group-item " +
                  (index === currentIndex ? "active" : "")
                }
              
                key={index}
              >
                {ingrediente.label}<button  onClick={() => this.eliminarIngrediente(ingrediente, index)}>X</button>
              </li>
            ))
            }
          </ul>
        
            </div> 
          : null }
       
          { lista.length>0 ?
          <button
            className="m-3 btn btn-sm btn-info"
            onClick={this.searchReceta}
          >
            Buscar
          </button>
          : null }
           { lista.length>0 ?
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.borrarTodo}
          >
            Borrar Todo
          </button>
         : null }
        </div>
        { recetas.length>0 ?  
            <div className="col-md-12">
              <br />
              <p> Lista de Recetas: </p>
              <ul className="list-group">
                {recetas &&
                  recetas.map((receta, index) => (
                    <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.redirectToTarget(receta, index)}
                    
                    key={index}
                  >
                    {receta.nombre} - N° coincidencias {receta.coincidencias}
                   
                
                  </li> 
                  ))
                  }
            </ul>
            </div> : null }
            
      </div>
    );
  }
}
