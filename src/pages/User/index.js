
import React, { PureComponent } from 'react';

export default class UserPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          users: [],
          name:'',
          category:'',
          admission:'',
        }

        this.fetchUser = this.fetchUser.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async fetchUser() {
        try {
            const userCall = await fetch('https://btplus.mybluemix.net/usuarios');
            const users = await userCall.json();
            this.setState({users});
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

    async handleSubmit(event) {
        const {name, category,admission} = this.state;
        event.preventDefault();
        try {
            const userCall = await fetch('https://btplus.mybluemix.net/usuarios', {
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
            const users = await userCall.json();
            // console.log("data",users);
        } catch(err) {
            event.preventDefault();
            console.log("Error submiting data-----------", err);
        }
    }

    render() {
        const { users, loading } = this.state;
        console.log("users",users);

        if(!loading) {
            return (
                <div>
                <Button name={"Listar"} onPress={this.fetchUser}/>
                {users.map(user=>
                    <div style={divStyle} key={user._id}>
                        <span>{user._id} </span>
                        <span>{user.nome} </span>
                        <span>{user.idade} </span>
                        <span>{user.dataAdmissao} </span>
                        <span>{user.tipo} </span>
                    </div>
                )}
                ______________________________
                <form>
                <label>
                  Nome:
                  <input
                    name="name"
                    type="text"
                    onChange={this.handleInputChange} />
                </label>
                <br />
                {/*
                <label>
                  Categoria:
                  <input
                    name="category"
                    type="text"
                    value={this.state.category}
                    onChange={this.handleInputChange} />
                </label>*/}
                <label>
                  Data de admissão:
                  <input
                    name="admission"
                    type="text"
                    value={this.state.admission}
                    onChange={this.handleInputChange} />
                </label>
                <input type="submit" onClick={this.handleSubmit} value="Criar" />
                </form>
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
