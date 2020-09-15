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
      divRecetas:false,
      isClearable: true,
     

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
    if(e==null){
      // isClearable
    }else{
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
        this.searchReceta();
        this.setState({
          lista: this.state.lista,
          divIngredientes: this.state.divIngredientes
        });
      
      }
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
      this.searchReceta();



      this.setState({
        lista: this.state.lista,
        divIngredientes: this.state.divIngredientes,
        
      });

      
    
    }
   
  }

  borrarTodo() {
    this.setState({
      lista: [],
      recetas:[]
      
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
    if(this.state.lista.length>0){
      TutorialDataService.buscarRecetas(this.state.lista)
      .then(response => {
        
        this.state.recetas = (response.data.length>0)?response.data:[];
        

        this.setState({
          recetas: this.state.recetas
        });
      })
      .catch(e => {
        console.log(e);
      });
    }else{
      this.state.recetas = [];
    }
   
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
                style={{borderTopWidth: 'thin'}}
                key={index}
              >
                {ingrediente.label}
               
               <button className="btn btn-default close" type="button" onClick={() => this.eliminarIngrediente(ingrediente, index)}>
               <span aria-hidden="true">&times;</span>
            </button> 
              </li>
             
            ))
            }
          </ul>
        
            </div> 
          : null }
       
        
           { lista.length>0 ?
          <button
            className="m-1 btn btn-sm btn-danger"
            onClick={this.borrarTodo}
          >
            Borrar Todo
          </button>
         : null }
        </div>
        { recetas.length>0 ?  
            <div className="col-md-12 div-recetas">
              <br />
              <h3> Lista de Recetas: </h3>
              <ul className="list-group">
                {recetas &&
                  recetas.map((receta, index) => (
                    <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.redirectToTarget(receta, index)}
                    style={{borderTopWidth: 'thin'}}
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
