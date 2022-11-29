import React, {useState, useEffect} from "react";
import Users from "../../services/users.js";
import { Modal, Form, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const initialState = {
    surname: "", name: "", email: "", password: "", roleId: ""
};

const User = () => {
    const [showAddUser, setShowAddUser] = useState(false);
    const [showUpdateUser, setShowUpdateUser] = useState(false);
    const [callback, setCallback] = useState(false);

    const [data, setData] = useState(initialState);
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    const [selected, setSelected] = useState(null);
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);

    useEffect(() => {
        let cleanup = false;
        const fetchUsers = async () => {
            try {
                if (!cleanup) {
                    const result = await Users.getUsers();
                    if (result !== null) {
                        setUsers(result);
                    }
                }
            } catch (err) {
                console.error(err.message)
            }
        };
        fetchUsers();
        return () => cleanup = true;
    }, [callback]);

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
        setSelected(e.target.value);
    }

    const handleAddUser = async () => {
        await Users.addUser(data.surname, data.name, data.email, data.password, selected === "1" ? "user" : selected === "2" ? "trainer" : "admin").then((response) => {
            setMessage(response.data.message);
            setSuccessful(true);
        }, (err) => {
            setMessage(err.response.data.message);
            setSuccessful(false);
        });
        setCallback(!callback);
    }

    const handleUpdateUser = async () => {
        await Users.updateUser(currentUser, data.surname, data.name, selected === "1" ? "user" : selected === "2" ? "trainer" : "admin").then((response) => {
            setMessage(response.data.message);
            setSuccessful(true);
        }, (err) => {
            setMessage(err.response.data.message);
            setSuccessful(false);
        });
        setCallback(!callback);
    }

    const handleDeleteUser = async (userId) => {
        await Users.deleteUser(userId).then((response) => {
            setMessage(response.data.message);
            setSuccessful(true);
        }, (err) => {
            setMessage(err.response.data.message);
            setSuccessful(false);
        });
        setCallback(!callback);
    }

    return (
        <>
            <div>
                <Button variant="primary" onClick={() => setShowAddUser(true)}>
                    Додати
                </Button>
                <Modal
                    show={showAddUser}
                    onHide={() => (setShowAddUser(false), setData(initialState))}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Додавання користувача
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Прізвище:</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    id="surname" 
                                    name="surname" 
                                    value={data.surname}
                                    onChange={handleChangeInput} 
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Ім'я:</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    value={data.name} 
                                    onChange={handleChangeInput} 
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Електронна пошта:</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    id="email" 
                                    name="email" 
                                    value={data.email}
                                    onChange={handleChangeInput} 
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Пароль:</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    value={data.password}
                                    onChange={handleChangeInput} 
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Роль:</Form.Label>
                                <Form.Select name="roleId" id="roleId" value={data.roleId} onChange={handleChangeInput}>
                                    <option value="1">Клієнт</option>
                                    <option value="2">Тренер</option>
                                    <option value="3">Адмін</option>
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </Modal.Body>                    
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleAddUser}>
                            Додати
                        </Button>
                        <Button variant="danger" onClick={() => (setShowAddUser(false), setData(initialState))}>
                            Скасувати
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show={showUpdateUser}
                    onHide={() => (setShowUpdateUser(false), setData(initialState))}
                    backdrop="static"
                    keyboard={false}
                    centered
                >            
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Редагування - {currentUser === null ? "ID користувача не вибраний" : "ID " + currentUser}
                        </Modal.Title>
                    </Modal.Header>                
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Прізвище:</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    id="surname" 
                                    name="surname"
                                    value={data.surname}
                                    onChange={handleChangeInput} 
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Ім'я:</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    value={data.name} 
                                    onChange={handleChangeInput}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Електронна пошта:</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    id="email" 
                                    name="email" 
                                    value={data.email}
                                    onChange={handleChangeInput} 
                                    disabled 
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Роль:</Form.Label>
                                <Form.Select name="roleId" id="roleId" value={data.roleId} onChange={handleChangeInput}>
                                    <option value="1">Клієнт</option>
                                    <option value="2">Тренер</option>
                                    <option value="3">Адмін</option>
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </Modal.Body>                            
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleUpdateUser}>
                            Зберегти
                        </Button>
                        <Button variant="danger" onClick={() => (setShowUpdateUser(false), setData(initialState))}>
                            Скасувати
                        </Button>
                    </Modal.Footer>       
                </Modal>

                {users.length > 0 ? <>
                    <Table striped bordered hover>
                        <thead>
                            <tr className="text-center">
                                <th>ID</th>
                                <th>Прізвище</th>
                                <th>Ім'я</th>
                                <th>Електронна пошта</th>
                                <th>Роль</th>
                                <th>Дії</th>
                            </tr>
                        </thead>
                        <tbody>
                        {users.map((user, index) => <tr className="text-center" key={index}>
                            <td>{user.id}</td>
                            <td>{user.surname}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.roleId === 1 ? "Клієнт" : user.roleId === 2 ? "Тренер" : "Адмін"}</td>
                            <td className="text-center">
                                <Button variant="primary" onClick={() => (setCurrentUser(user.id), setData(user), setShowUpdateUser(true))}>
                                    Редагувати
                                </Button>{' '}
                                <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
                                    Видалити
                                </Button>
                            </td>
                        </tr>)}
                        </tbody>
                    </Table>                   
                </> : <>
                    <h4 style={{textAlign: "center"}}>
                        Немає користувачів
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
        </>);
};

export default User;