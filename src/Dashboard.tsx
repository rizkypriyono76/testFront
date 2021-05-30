import axios from 'axios';
import React, { Component } from 'react';
import { Navbar, NavbarBrand, Container, Row, Col, Card, Button } from 'react-bootstrap';
import {
    IoSchoolOutline,
    IoMan,
    IoSettings,
    IoWomanOutline,
    IoSettingsOutline,
} from 'react-icons/io5';
import { CardBody, CardFooter, CardText, CardTitle } from 'reactstrap';


interface MyState{
students :[];

}


export class Dashboard extends Component<{}, MyState> {

    state : MyState = {
        students :[]
    }

    componentDidMount (){

        axios.get('http://localhost:7070/list')
        .then(res => {
            const students = res.data
                this.setState({students})
        })         
    }


    render(){


        return(

            <div>
                <Navbar  bg="dark" mb-2 variant="dark">
                    <NavbarBrand className="text white">
                        <IoSchoolOutline className = "font-size-xxl"/>
                        <span className= "font-size-l ml-3">School Management Application</span>
                    </NavbarBrand>
                </Navbar>

                <Container className="mt-3">
                    <Row>
                        <Col sm='4'>
                            <Card body>
                                <CardTitle tag="h5">
                                    <IoSchoolOutline className="font-size-xl" />  30 teacher   
                                </CardTitle>
                                <CardText>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </CardText>
                                <Button>Manage Teacher</Button>
                            </Card>
                        </Col>
                        <Col sm='4'>                            
                            <Card body>
                                <CardTitle tag="h5">
                                    <IoMan className="font-size-xl" />  86 students   
                                </CardTitle>
                                <CardText>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </CardText>
                                <Button>Manage Student</Button>
                            </Card>
                        </Col>
                        <Col sm='4'>                        
                            <Card body>
                                <CardTitle tag="h5">
                                    <IoSettingsOutline className="font-size-xl" />  13 employee   
                                </CardTitle>
                                <CardText>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </CardText>
                                <Button>Manage Employee</Button>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                <Container className="mt-4">
                    <Row>
                        <Col sm='12'>
                            <Button block color="success">
                                <span className="fint-size-l">Create New Student</span>

                            </Button>
                        </Col>
                    </Row>
                </Container>
                
                <Container className="mt-4">
                    {this.state.students.map(student => renderStudent(student))}
                </Container>

            </div>
        );

    }


}

function renderStudent(st) {
        return(
            <Row>
                <Col sm="12">
                    <Card body>
                        <CardTitle tag="h5">
                            <IoMan className="font-size-xl"/> {st.firstName + " " +st.lastName}
                        </CardTitle>
                        <CardBody>
                            <Row>
                                <Col sm="4" className="text-center">
                                    <span className="font-weight-bold">Class </span>
                                    <span> Second Year</span>
                                </Col>
                                <Col sm="4" className="text-center">
                                    <span className="font-weight-bold">Age </span>
                                    <span> {st.age}</span>
                                </Col>
                                <Col sm="4" className="text-center">
                                    <span className="font-weight-bold">Teacher </span>
                                    <span>{st.teacher}</span>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <Row>
                                <Col sm-6>
                                    <Button block className="outline" color="primary">
                                        Edit
                                    </Button>
                                </Col>
                                <Col sm-6>
                                    <Button block className="outline" color="danger" onClick={() => deleteStudent(st.id)}>
                                        delete
                                    </Button>
                                </Col>
                            </Row>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        )

    

}
function deleteStudent(id: any): void {
    axios.post(`http://localhost:7070/delete/${id}`)
}

