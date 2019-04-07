
import React, { PureComponent } from 'react';
import { Button, Spinner } from 'reactstrap';


export default class SchedulePage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          agenda: [],
          loading: false,
          idUser: '',
        }

        this.fetchUser = this.fetchUser.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    async fetchUser() {
        const { idUser } = this.state;
        console.log("idUser",idUser);
        if(idUser){
            try {
                this.setState({loading: true});
                const agendaCall = await fetch('https://btplus.mybluemix.net/agenda/'+idUser);
                const agenda = await agendaCall.json();
                this.setState({agenda,loading: false});
            } catch(err) {
                this.setState({agenda,loading: false});
                console.log("Error fetching data-----------", err);
            }
        }
        else{
            alert("Id não pode ser vazio!");

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

    render() {
        const { agenda, loading } = this.state;
        console.log("agenda",agenda);
        if(!Array.isArray(agenda)) return <span>Deu ruim =/</span>

        if(!loading) {
            return (
                <div>
                <label className="form-lable">
                  ID usuário:
                  <input
                    name="idUser"
                    type="text"
                    onChange={this.handleInputChange} />
                </label>
                <br /><Button color="success" onClick={this.fetchUser}>Listar</Button><br /><br />
                { agenda.length ?
                  <TableRow style={{fontWeight: 'bold'}}info1={"ID User"} info2={"Id Evento"} info3={"Tipo"} info4={"Status"}  info5={"Horário"}/>
                  : null
                }
                { agenda.map(user=>
                    <TableRow
                        key={user.idUsario}
                        info1={user.idUsario}
                        info2={user.idCompromisso}
                        info3={user.tipo}
                        info4={user.status}
                        info5={user.horario}
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
