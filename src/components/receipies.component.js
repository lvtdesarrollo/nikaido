import React, { Component } from "react";
import RecetaDataService from "../services/recetas.service";
import ReceipiesDataService from "../services/receipies.service";
import { Link } from "react-router-dom";
import Select from 'react-select';
import { colourOptions } from '../docs/data';
//import { Note } from '../docs/styled-components';

export default class Receipies extends Component {
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
    var today = new Date(),
    date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

    this.state = {
      date: date,
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
      currentReceta: [],
      recetaIngredientes: [],
     

    };
    
    
  }
  

  componentDidMount() {
  
    this.retrieveIngredientes();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTutorials() {
    RecetaDataService.getAll()
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
    RecetaDataService.getIngredientes()
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
      recetas:[],
      recetaIngredientes:[],
      currentReceta:[]
      
    });
  }

  getReceta(id) {
   
    this.getIngredientesReceta(id.receta_id);
    RecetaDataService.getReceta(id.receta_id)
      .then(response => {
        this.setState({
          currentReceta: response.data
        });
       
        this.currentReceta = response.data;
        console.log(this.currentReceta);
        console.log(response.data);

      
        
      })
      .catch(e => {
        console.log(e);
      });
      
  }

  getIngredientesReceta(id){
    RecetaDataService.getIngredientesReceta(id)
    .then(response => {
      this.setState({
        recetaIngredientes: response.data
      });
     
      this.recetaIngredientes = response.data;
     
      console.log(response.data);
      
    })
    .catch(e => {
      console.log(e);
    });
  }

  searchTitle() {
    RecetaDataService.findByTitle(this.state.searchTitle)
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
      RecetaDataService.buscarRecetas(this.state.lista)
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
    const { searchTitle, tutorials, ingredientes, currentTutorial, currentIndex, isClearable, currentReceta ,recetas,divIngredientes, divRecetas,date,recetaIngredientes,
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
      <div>
            <div className="breadcumb-area bg-img bg-overlay" style={{ backgroundImage: "url('estilos/img/bg-img/breadcumb3.jpg')"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="breadcumb-text text-center">
                                <h2>Recipes</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        

            <div className="receipe-post-area section-padding-80">
                <div className="receipe-post-search mb-80">
                    <div className="container">
                     
                        <div className="row">
                          <div className="col-12 col-lg-6">
                              <h4>Select your ingredients</h4>
                              <Select
                              styles={{
                                // Fixes the overlapping problem of the component
                                menuPortal: base => ({ ...base, zIndex: 9999 }),
                                menu: provided => ({ ...provided, zIndex: "9999 !important" })
                              }}
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
                          </div>
                    
                          <div className="col-12 col-lg-6">
                              { lista.length>0 ?  
                              
                              <div>
                                <h4>List of Ingredients: </h4>
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
                                    className="form-control m-1 btn btn-sm btn-danger"
                                    onClick={this.borrarTodo}
                                >
                                     Clear All
                                </button>
                                : null }
                          </div>
                          
                        </div>

                        {recetas.length > 0 ?
               
                        <div className="row">
                            <div className="col-12 col-lg-12">
                                { recetas.length>0 ?  
                                <div className="div-recetas">
                                    <br />
                                    <h3> Recipe List: </h3>
                                    <ul className="list-group">
                                        {recetas &&
                                        recetas.map((receta, index) => (
                                            <li
                                            className={
                                            "list-group-item " +
                                            (index === currentIndex ? "active" : "")
                                            }
                                            onClick={() => this.getReceta(receta, index)}
                                            style={{borderTopWidth: 'thin'}}
                                            key={index}
                                        >
                                            {receta.nombre} - N° coincidences {receta.coincidencias}
                                        
                                        
                                        </li> 
                                        ))
                                        }
                                    </ul>
                                </div> 
                                : null }                    
                            </div>
                        </div>
               
                : null }
                         
                     
                    </div>
                </div>
          
            </div>
            {Object.keys(currentReceta).length >0 ? (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="receipe-slider owl-carousel">
                                <img  src={'estilos/img/bg-img/' + currentReceta.image} alt="" />
                       
                            </div>
                        </div>
                    </div>
                </div>
                <div className="receipe-content-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-8">
                                <div className="receipe-headline my-5">
                                  
            <span>Date: {date}</span>
                                    <h2>{currentReceta.nombre}</h2>
                                    <div className="receipe-duration">
                                        <h6>Prep: 15 mins</h6>
                                        <h6>Time: 30 mins</h6>
                                        <h6>Portions: 8</h6>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-4">
                                <div className="receipe-ratings text-right my-5">
                                    <div className="ratings">
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star-o" aria-hidden="true"></i>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 col-lg-9">
                                
                                <div className="single-preparation-step d-flex">
                            
                                    <p>{currentReceta.preparacion}</p>
                                </div>
                                
                               
                            </div>

                        
                            <div className="col-12 col-lg-3">
                                <div className="ingredients">
                                    <h4>Ingredients</h4>
                                    <ol>
                                 

                                    {recetaIngredientes &&
            recetaIngredientes.map((ingrediente, index) => (
              <li>- <span className="recetaIngredientes">{ingrediente.nombre}</span></li>
             
            ))
            }
                                    </ol>
                                    


                                   

                            
                                   
                                </div>
                            </div>
                        </div>

                 

                        
                    </div>
                </div>
            </div>
           
            ) :(<div></div>)}
        </div>
   
    );
  }
}
