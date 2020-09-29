import React, { Component } from "react";
import RecetaDataService from "../services/recetas.service";

export default class Receta extends Component {
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
    RecetaDataService.get(id)
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
    RecetaDataService.getReceta(id)
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

    RecetaDataService.update(this.state.currentReceta.id, data)
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
    RecetaDataService.update(
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
    RecetaDataService.delete(this.state.currentReceta.id)
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
          
              <div className="recImg"> 
                <div id="top">  
                  <h2>{currentReceta.nombre} </h2>
                </div>
              </div>
              <div className="divLeftRdetails">
                <div className="form-group">
                  <label htmlFor="description">Preparación</label>
                  <div>{currentReceta.preparacion} </div>

                  <div className="recTime cfx">
                    <div className="recTimeTitle">
                      <p className="timeTitle">Cooking Time</p>
                    </div>
                    <div className="AllTime">
                      <div className="prepTime">
                        <p className="pt">Preparation Time : 5</p>
                      </div>
                      
                    </div>
                  </div> 
                </div>

                <div className="recIng cfx">
                  <div className="recIngTitle cfx">
                      <div className="recIngLeft">
                        <p className="ingTitle">Ingredients</p>
                      </div>
                   
                  </div>
                
                  <ul className="recIngNos">
                      <li className="ingNos">
                        <p>
                            <a className="prod_href" href="http://bigbasket.go2cloud.org/aff_c?offer_id=88&amp;aff_id=3085&amp;url=https%3A%2F%2Fwww.bigbasket.com%2Fpd%2F10000282%2Ffresho-pumpkin-disco-bhopla-disco-lal-1-kg%2F%3Ftransaction_id%3D{transaction_id}%26partner%3Dhasoffer%26utm_source%3Daffiliates%26utm_medium%3Dcps%26utm_campaign%3D{affiliate_name}" target="_blank">pumpkin 
                            </a> 200 gms
                        </p>
                      </li>
                      <li className="ingNos">
                        <p>Onion,medium size 1 nos</p>
                      </li>
                      <li className="ingNos">
                        <p>Tomato,medium size 1 nos</p>
                      </li>
                      <li className="ingNos">
                        <p>Garlic Pods 5 nos</p>
                      </li>
                      <li className="ingNos">
                        <p>Pink Salt 1 tsp</p>
                      </li>
                      <li className="ingNos">
                        <p>Powdered Black Pepper 2 pinch</p>
                      </li>
                      <li className="ingNos">
                        <p>Cream,to decorate (optional) 1 tsp</p>
                      </li>
                  </ul>
                </div>
                <div className="recDesc cfx">
                <div className="recDescTitle">
                    <p className="descTitle">Directions</p>
                </div>
                <ul className="recDescNos">
                    <li className="descNos cfx">
                      <div className="descNum">01</div>
                      <div className="descStep">
                          <p>Peel and cut pumpkin tomato onion and garlic</p>
                      </div>
                    </li>
                    <li className="descNos cfx">
                      <div className="descNum">02</div>
                      <div className="descStep">
                          <p>Place all in pressure cooker and cook till two whistles</p>
                      </div>
                    </li>
                    <li className="descNos cfx">
                      <div className="descNum">03</div>
                      <div className="descStep">
                          <p>After releasing pressure place all material in a plate</p>
                      </div>
                    </li>
                    <li className="descNos cfx">
                      <div className="descNum">04</div>
                      <div className="descStep">
                          <p>Cool down properly and blend it in puree</p>
                      </div>
                    </li>
                    <li className="descNos cfx">
                      <div className="descNum">05</div>
                      <div className="descStep">
                          <p>Cook this puree in a pan for two minutes and mix powdered black pepper</p>
                      </div>
                    </li>
                    <li className="descNos cfx">
                      <div className="descNum">06</div>
                      <div className="descStep">
                          <p>Garnish with cream (if you want to garnish) and serve hot</p>
                      </div>
                    </li>
                </ul>
</div>
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
