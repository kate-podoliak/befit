import React, { useState, useEffect } from "react";
import Types from "../../services/types.js";
import { Form, Modal, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const initialState = {
    name: "", description: ""
};

const Type = () => {  
    const [showAddType, setShowAddType] = useState(false);
    const [showUpdateType, setShowUpdateType] = useState(false);
    const [callback, setCallback] = useState(false);
    const [data, setData] = useState(initialState);
    const [types, setTypes] = useState([]);
    const [currentType, setCurrentType] = useState(null);
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);

    useEffect(() => {
        let cleanup = false;
        const fetchTypes = async () => {
            try {        
                if (!cleanup) {
                    const result = await Types.getTypes();
                    if (result !== null) {
                        setTypes(result);
                    }
                }
            } catch (err) {
                console.error(err.message)
            }
        };      
        fetchTypes();
        return () => cleanup = true;
    }, [callback]);

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }

    const handleAddType = async () => {
        await Types.addType(data.name, data.description).then((response) => {
                setMessage(response.data.message);
                setSuccessful(true);
            }, (err) => {
                setMessage(err.response.data.message);
                setSuccessful(false);
            }
        );
        setCallback(!callback);
    }

    const handleUpdateType = async () => {
        await Types.updateType(currentType, data.name, data.description).then((response) => {
                setMessage(response.data.message);
                setSuccessful(true);
            }, (err) => {
                setMessage(err.response.data.message);
                setSuccessful(false);
            }
        );
        setCallback(!callback);
    }

    const handleDeleteType = async (typeId) => {
        await Types.deleteType(typeId).then((response) => {
                setMessage(response.data.message);
                setSuccessful(true);
            }, (err) => {
                setMessage(err.response.data.message);
                setSuccessful(false);
            }
        );
        setCallback(!callback);
    }   
    
    return (
        <>
            <div>
                <Button variant="primary" onClick={() => setShowAddType(true)}>
                    Додати
                </Button>       
                
                <Modal
                    show={showAddType}
                    onHide={() => (setShowAddType(false), setData(initialState))}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Додавання виду заняття
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Вид заняття:</Form.Label>
                                <Form.Control type="text" id="name" name="name" value={data.name} onChange={handleChangeInput} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Опис:</Form.Label>
                                <Form.Control rows="4" cols="50" id="description" name="description" value={data.description} onChange={handleChangeInput}/>
                            </Form.Group>
                        </Form>  
                    </Modal.Body>                    
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleAddType}>
                            Додати
                        </Button>
                        <Button variant="danger" onClick={() => (setShowAddType(false), setData(initialState))}>
                            Скасувати
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show={showUpdateType}
                    onHide={() => (setShowUpdateType(false), setData(initialState))}
                    backdrop="static"
                    keyboard={false}
                    centered
                >            
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Редагування - {currentType === null ? "ID виду заняття не вибраний" : "ID " + currentType}
                        </Modal.Title>
                    </Modal.Header>                
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Вид заняття:</Form.Label>
                                <Form.Control type="text" id="name" name="name" value={data.name} onChange={handleChangeInput} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Опис:</Form.Label>
                                <Form.Control rows="4" cols="50" id="description" name="description" value={data.description} onChange={handleChangeInput}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>                            
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleUpdateType}>
                            Зберегти
                        </Button>
                        <Button variant="danger" onClick={() => (setShowUpdateType(false), setData(initialState))}>
                            Скасувати
                        </Button>
                    </Modal.Footer>       
                </Modal>

                {types.length > 0 ? <>
                    <Table striped bordered hover>
                        <thead>
                            <tr className="text-center">
                                <th>ID</th>
                                <th>Вид заняття</th>
                                <th>Опис</th>
                                <th>Дії</th>
                            </tr>
                        </thead>
                        <tbody>
                            {types.map((type, index) => <tr className="text-center" key={index}>
                                <td>{type.id}</td>
                                <td>{type.name}</td>
                                <td>{type.description} </td>
                                <td className="text-center">
                                    <Button variant="primary" onClick={() => (setCurrentType(type.id), setData(type), setShowUpdateType(true))}>
                                        Редагувати
                                    </Button>{' '}
                                    <Button variant="danger" onClick={() => handleDeleteType(type.id)}>
                                        Видалити
                                    </Button>
                                </td>
                            </tr>)}
                        </tbody>
                    </Table>
                </> : <>
                    <h4 style={{textAlign: "center"}}>
                        Немає видів занять
                    </h4>
                </>}
                
            </div>
            {message && (
                <div className="form-group">
                    <div
                        className={
                            successful ? "alert alert-success" : "alert alert-danger"
                        }
                        role="alert"
                    >
                        {message}
                    </div>
                </div>
            )}
        </>
    );
};

export default Type;