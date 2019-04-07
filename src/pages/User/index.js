
import React, { PureComponent } from 'react';
import { Button, Spinner, Table } from 'reactstrap';


export default class UserPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          users: [],
          name:'',
          category:'',
          admission:'',
          loading: false,
        }

        this.fetchUser = this.fetchUser.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async fetchUser() {
        try {
            this.setState({loading: true});
            const userCall = await fetch('https://btplus.mybluemix.net/usuarios');
            const users = await userCall.json();
            this.setState({users,loading: false});
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
        event.preventDefault();
        try {
            this.setState({loading: true});
            const userCall = await fetch('https://btplus.mybluemix.net/usuarios', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                nome: name,
                tipo: "USUARIO",
                dataAdmissao: admission,
              })
            })
            const users = await userCall.json();
            this.setState({loading: false});
        } catch(err) {
            console.log("Error submiting data-----------", err);
        }
    }

    render() {
        const { users, loading } = this.state;
        if(!Array.isArray(users)) return <span>Deu ruim =/</span>

        if(!loading) {
            return (
                <div>
                <form>
                <label className="form-lable">
                  Nome:
                  <input
                    name="name"
                    type="text"
                    onChange={this.handleInputChange} />
                </label>
                {/*
                <label>
                  Categoria:
                  <input
                    name="category"
                    type="text"
                    value={this.state.category}
                    onChange={this.handleInputChange} />
                </label>*/}
                <label className="form-lable">
                  Data de admissão:
                  <input
                    name="admission"
                    type="text"
                    value={this.state.admission}
                    onChange={this.handleInputChange} />
                </label>
                <input className="form-button" type="submit" onClick={this.handleSubmit} value="Criar" />
                </form>
                ______________________________
                <br /><br /><Button color="success" onClick={this.fetchUser}>Listar</Button><br /><br />
                { users.length ?
                  <TableRow style={{fontWeight: 'bold'}}info1={"ID"} info2={"Nome"} info3={"Data de Admissão"}/>
                  : null
                }
                {users.map(user=>
                    <TableRow key={user._id} info1={user._id} info2={user.nome} info3={user.dataAdmissao}/>
                )}
                </div>
            )
        } else {
            return <Spinner color="info" />
        }
    }
}

const TableRow = ({style={}, info1, info2, info3}) => {
    return (
        <div style={{...style, width: '700px'}} className="table">
            <span style={{width: '320px', display: 'inline-block'}}>{info1}</span>
            <span style={{width: '200px', display: 'inline-block'}}>{info2} </span>
            <span style={{width: '150px', display: 'inline-block'}}>{info3} </span>
            <br/>
        </div>)
}
