import React, {Component} from 'react'

import AuthenticationService from '../../services/AuthenticationService.js'
import InfoService from '../../services/InfoService';
class MyPageComponent extends Component {
    
    constructor(props) {
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.state = {
            welcomeMessage : '',
            loggedInUser : AuthenticationService.getLoggedInUserEmail(),
            info : ''
        }
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    componentDidMount() {
        InfoService.getStudentInfo(this.state.loggedInUser)
        .then(response => {
            console.log(response.data);
            this.setState({info : response.data});
        }).catch(error => {
            console.log(error);
        })
    }


    retrieveWelcomeMessage() {
        
        AuthenticationService.executeHelloService()
        .then( response => this.handleSuccessfulResponse(response) )
        .catch( error => this.handleError(error) )
    }

    handleSuccessfulResponse(response) {
        console.log(response)
        this.setState({welcomeMessage: response.data})
    }

    handleError(error) {
        console.log(error.response)
        let errorMessage = '';
        
        if(error.message) 
            errorMessage += error.message

        if(error.response && error.response.data) {
            errorMessage += error.response.data.message
        }

        this.setState({welcomeMessage: errorMessage})
    }

    
    render() {
        let userInfo = this.state.info;
        return (
            <>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome
                </div>
                    {
                        userInfo && <div>
                            <p>name : {userInfo.name}</p>
                            <p>email : {userInfo.email}</p>
                            
                        </div>

                    }
                    {
                        !userInfo && <div>
                            Loading....
                        </div>
                    }
                <div className="container">
                    Check if axiosInterceptors is working well!<br></br>
                    <button onClick={this.retrieveWelcomeMessage} 
                        className="btn btn-success">Get Message</button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
                
            </>
        )        
    }
}


export default MyPageComponent;