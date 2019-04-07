
import React, { PureComponent } from 'react';
import { Button, Spinner, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


export default class ExamPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          exams: [],
          title:'',
          status:'',
          type:'',
          loading: false,
        }

        this.fetchUser = this.fetchUser.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async fetchUser() {
        try {
            this.setState({loading: true});
            const userCall = await fetch('https://btplus.mybluemix.net/compromissos');
            const exams = await userCall.json();
            this.setState({exams,loading: false});
        } catch(err) {
            this.setState({agenda,loading: false});
            console.log("Error fetching data-----------", err);
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }

    async handleSubmit(event) {
        const {name, category,admission} = this.state;
        try {
            const userCall = await fetch('https://btplus.mybluemix.net/compromissos', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                nome: {name},
                tipo: "USUARIO",
                dataAdmissao: {admission},
              })
            })
            const exams = await userCall.json();
            // console.log("data",exams);
        } catch(err) {
            event.preventDefault();
            console.log("Error submiting data-----------", err);
        }
    }

    render() {
        const { exams, loading } = this.state;
        console.log("exams",exams);
        if(!Array.isArray(exams)) return <span>Deu ruim =/</span>

        if(!loading) {
            return (
                <div>
                <form>
                <label className="form-lable">
                  Título:
                  <input
                    name="title"
                    type="text"
                    checked={this.state.name}
                    onChange={this.handleInputChange} />
                </label>
                <label className="form-lable">
                  Status:
                  <input
                    name="status"
                    type="text"
                    value={this.state.category}
                    onChange={this.handleInputChange} />
                </label>
                <label className="form-lable">
                  Tipo:
                  <input
                    name="type"
                    type="text"
                    value={this.state.admission}
                    onChange={this.handleInputChange} />
                </label>
                <input className="form-button" type="submit" onClick={this.handleSubmit} value="Criar" />
                </form>
                ______________________________
                <br /><br /><Button color="success" onClick={this.fetchUser}>Listar</Button><br /><br />
                { exams.length ?
                  <TableRow style={{fontWeight: 'bold'}}info1={"ID"} info2={"Título"} info3={"Status"} info4={"Tipo"}  info5={"Vencimento"}/>
                  : null
                }
                {exams.map(user=>
                    <TableRow
                        key={user._id}
                        info1={user._id}
                        info2={user.titulo}
                        info3={user.status}
                        info4={user.tipoCompromisso}
                        info5={user.dataVencimento}
                    />
                )}

                </div>
            )
        } else {
            return <Spinner color="info" />
        }
    }
}


const TableRow = ({style={}, info1, info2, info3, info4, info5}) => {
    return (
        <div style={{...style, width: '940px'}} className="table">
            <span style={{width: '300px', display: 'inline-block'}}>{info1}</span>
            <span style={{width: '200px', display: 'inline-block'}}>{info2} </span>
            <span style={{width: '90px', display: 'inline-block'}}>{info3}</span>
            <span style={{width: '150px', display: 'inline-block'}}>{info4} </span>
            <span style={{width: '150px', display: 'inline-block'}}>{info5} </span>
            <br/>
        </div>)
}
