
import React, { PureComponent } from 'react';

export default class ExamPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          exams: [],
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
            const userCall = await fetch('https://btplus.mybluemix.net/agenda');
            const exams = await userCall.json();
            this.setState({exams});
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

        if(!loading) {
            return (
                <div>
                <Button name={"Listar"} onPress={this.fetchUser}/>
                {exams.map(user=>
                    <div style={divStyle} key={user._id}>
                        <span>{user._id} </span>
                        <span>{user.titulo} </span>
                        <span>{user.status} </span>
                        <span>{user.tipoCompromisso} </span>
                        <span>{user.dataVencimento} </span>
                    </div>
                )}
                ______________________________
                <form>
                <label>
                  Título:
                  <input
                    name="name"
                    type="text"
                    checked={this.state.name}
                    onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                  Status:
                  <input
                    name="category"
                    type="text"
                    value={this.state.category}
                    onChange={this.handleInputChange} />
                </label>
                <label>
                  Tipo:
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
