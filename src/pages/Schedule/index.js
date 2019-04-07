
import React, { PureComponent } from 'react';

export default class SchedulePage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          agenda: [],
          name:'',
          category:'',
          admission:'',
        }

        this.fetchUser = this.fetchUser.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    async fetchUser() {
        const { idUser } = this.state;
        console.log("idUser",idUser);
        try {
            const agendaCall = await fetch('https://btplus.mybluemix.net/agenda/'+idUser);
            const agenda = await agendaCall.json();
            this.setState({agenda});
        } catch(err) {
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

    render() {
        const { agenda, loading } = this.state;
        console.log("agenda",agenda);

        if(!loading) {
            return (
                <div>
                <label>
                  ID usuário:
                  <input
                    name="idUser"
                    type="text"
                    onChange={this.handleInputChange} />
                </label>
                <Button name={"Listar"} onPress={this.fetchUser}/>
                { agenda.map(user=>
                    <div style={divStyle} key={user._id}>
                        <span>{user._id} </span>
                        <span>{user.titulo} </span>
                        <span>{user.status} </span>
                        <span>{user.tipoCompromisso} </span>
                        <span>{user.dataVencimento} </span>
                    </div>
                )}
                </div>
            )
        } else {
            return <span>loading</span>
        }
    }
}

const Button = ({name, onPress}) => {
    return <div onClick={onPress}>{name}</div>
}

const divStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

