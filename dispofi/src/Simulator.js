import React, { Component } from 'react';
import { Input, Form } from 'semantic-ui-react';
import Swal from 'sweetalert2';

class Simulator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bankinterest: 0,
      interestOfInsurance: 0,
      monthlyPayment: 0,
      totalCredit: 0,
      requestedCredit: 0,
      echance: 0,
      salaire: 0,

    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, key) {
    // console.log(event.target.name, event.target.value);

    this.setState({ [event.target.name]: event.target.value });
    if (key === "credit") { this.setState({ requestedCredit: event.target.value }); }
    if (key === "banqInterst") { this.setState({ bankinterest: event.target.value }); }
    if (key === "interstofInsurance") { this.setState({ interestOfInsurance: event.target.value }); }
    if (key === "echeance") { this.setState({ echeance: event.target.value }); }
    if (key === "salaire") { this.setState({ salaire: event.target.value }); }
    // console.log(this.state);
  }

  lauchingSimulator = () => {
    this.monthlyPaymentCalcul()
    this.totalCreditCalcul()
  }

  monthlyPaymentCalcul() {
    const { bankinterest, interestOfInsurance, requestedCredit, echeance, salaire } = this.state;
    const monthlyBankInterest = Number(parseFloat(requestedCredit * bankinterest) / 100) / 12
    // console.log(monthlyBankInterest);
    const monthlyInterestOfInsurance = Number(parseFloat(requestedCredit * interestOfInsurance) / 100 / 12)
    // console.log(monthlyInterestOfInsurance);
    let calculMonth = (Number(requestedCredit) / Number((echeance * 12)) + parseFloat(monthlyInterestOfInsurance + monthlyBankInterest))
    if (calculMonth <= (salaire / 3)) {
      Swal.fire({
        position: 'top',
        type: 'success',
        title: 'Crédit accepté!',
        showConfirmButton: false,
      })
    }
    if (calculMonth > (salaire / 3)) {
      Swal.fire({
        position: 'top',
        type: 'error',
        title: "Vous n'avez pas les moyen de souscrire à ce credit",
        text: "Peut-être n'avez vous pas renseigné votre salaire",
      })
    }
    this.setState({ monthlyPayment: calculMonth })
  }

  totalCreditCalcul() {
    const { bankinterest, interestOfInsurance, requestedCredit, echeance } = this.state;
    const monthlyBankInterest = Number(parseFloat(requestedCredit * bankinterest) / 100) / 12
    const monthlyInterestOfInsurance = Number(parseFloat(requestedCredit * interestOfInsurance) / 100 / 12)
    let totalCalcul = Number(requestedCredit) + Number(parseFloat(monthlyInterestOfInsurance + monthlyBankInterest) * (echeance * 12))
    this.setState({ totalCredit: totalCalcul })
  }


  render() {
    const { totalCredit, monthlyPayment } = this.state;
    return (
      <div className="body">
        <div className="title">
          <img className="titleSrc" src="https://www.dispofi.fr/build/1556268880/share/img/logos/logo-dispofi-www.svg" alt="" height="35%" width="20%" />
          <div><p> L'information utile et les outils pratiques au service de vos intérêts</p></div><br /><br />
        </div>
        <div><h1>SIMULATEUR DE PRÊT</h1></div><br />
        <div className="Form">
          <Form><br />
            <Form.Field>
              <label>Nom: </label>
              <input placeholder='Nom' />
            </Form.Field><br />
            <Form.Field>
              <label>Prénom</label>
              <input placeholder='Prénom' />
            </Form.Field><br />
            <Form.Field>
              <label>Salaire Mensuel</label>
              <input name="salaire" placeholder='Salaire Mensuel' onChange={event => this.handleChange(event, 'salaire')} />
              <p className="mention">le salaire doit triplé la mensualité</p>
            </Form.Field>
          </Form>
        </div><br />
        <div className="simulator">
          <div>Montant du crédit souhaité<Input type="text" name="credit" placeholder="€" onChange={event => this.handleChange(event, 'credit')} /></div>
          <div>Echéance<select name="échéance" onChange={event => this.handleChange(event, 'echeance')} >
            <option>0 </option>
            <option>2 </option>
            <option>3 </option>
            <option>4 </option>
            <option>5 </option>
            <option>6 </option>
            <option>7 </option>
            <option>8 </option>
            <option>9 </option>
            <option>10 </option>
            <option>11 </option>
            <option>12 </option>
            <option>13 </option>
            <option>14 </option>
            <option>15 </option>
            <option>16 </option>
            <option>17 </option>
            <option>18 </option>
            <option>19 </option>
            <option>20 </option>
            <option>21 </option>
            <option>22 </option>
            <option>23 </option>
            <option>24 </option>
            <option>25 </option>
            <option>26 </option>
            <option>27 </option>
            <option>28 </option>
            <option>29 </option>
            <option>30 </option>
          </select>année(s)</div>
          <div>Taux intérêts<Input type="text" name="banqInterst" placeholder="%" onChange={event => this.handleChange(event, "banqInterst")} /></div>
          <div>taux d'assurance<Input type="text" name="interstofInsurance" placeholder="%" onChange={event => this.handleChange(event, "interstofInsurance")} /></div>
          <div><p className="result">Mensualité: {monthlyPayment}</p></div>
          <div><p className="result">Montant total du prêt: {totalCredit}</p>
            <button type="button" className="test" onClick={this.lauchingSimulator}>TEST</button>
          </div>
        </div>
      </div >
    );
  }
}

export default Simulator;