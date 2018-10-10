import React, {Component} from 'react';
import Aux from '../Aux';
import Modal from '../../components/UI/Modal/Modal';
const withErrorHandler = (WrapperComponent, axios) => {

    return class extends Component{
        state ={
            error:null
        }
        componentWillMount(){
            this.requestInt = axios.interceptors.request.use(
                req => {
                    this.setState({error:null});
                    return req;
                }
            );
            this.responseInt = axios.interceptors.response.use(req => req,
                error => {
                    this.setState({error:error});
                }
            );
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.requestInt);
            axios.interceptors.response.eject(this.response);

        }
        discardModal = () => {
            this.setState({error:null});
        }
        render(){
            return (
                <Aux>
                    <Modal show={this.state.error} undo={this.discardModal}> {this.state.error ? this.state.error.message : null}</Modal>
                    <WrapperComponent {...this.props}/>
                </Aux>
            )
        }

    };
}
export default withErrorHandler;
