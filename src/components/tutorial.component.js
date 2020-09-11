import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTutorial = this.getTutorial.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);

    this.state = {
      currentReceta: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getReceta(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentReceta: {
          ...prevState.currentReceta,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentReceta: {
        ...prevState.currentReceta,
        description: description
      }
    }));
  }

  getTutorial(id) {
    TutorialDataService.get(id)
      .then(response => {
        this.setState({
          currentReceta: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  getReceta(id) {
    console.log(id)
    TutorialDataService.getReceta(id)
      .then(response => {
        this.setState({
          currentReceta: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentReceta.id,
      title: this.state.currentReceta.title,
      description: this.state.currentReceta.description,
      published: status
    };

    TutorialDataService.update(this.state.currentReceta.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentReceta: {
            ...prevState.currentReceta,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTutorial() {
    TutorialDataService.update(
      this.state.currentReceta.id,
      this.state.currentReceta
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The tutorial was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTutorial() {    
    TutorialDataService.delete(this.state.currentReceta.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/tutorials')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentReceta } = this.state;

    return (
      <div className="col-md-12">
        {currentReceta ? (
          <div className="col-md-12">
            <h4>Receta</h4>
           
              <div className="form-group">
               
                
                <h2>{currentReceta.nombre} </h2>
              </div>
              <div className="form-group">
                <label htmlFor="description">Preparación</label>
                <div>{currentReceta.preparacion} </div>
                  
              </div>

         
           
          </div>
        ) : (
          <div>
            <br />
            <p>receta no encontrada...</p>
          </div>
        )}
      </div>
    );
  }
}
