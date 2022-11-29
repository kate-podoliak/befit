import React, {useState, useEffect} from "react";
import Users from "../../services/users.js"
import Classes from "../../services/classes.js";
import Visits from "../../services/visits.js";
import {Form, Modal, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import moment from "moment";
import "moment/locale/uk";

const initialState = {
    payment: "", visited: "",
    userId: "", classId: ""
};

const Visit = () => {
    const [showAddVisit, setShowAddVisit] = useState(false);
    const [showUpdateVisit, setShowUpdateVisit] = useState(false);
    const [callback, setCallback] = useState(false);

    const [data, setData] = useState(initialState);
    const [users, setUsers] = useState([]);
    const [classes, setClasses] = useState([]);
    const [visits, setVisits] = useState([]);
    const [currentVisit, setCurrentVisit] = useState(null);

    const [payment, setPayment] = useState(false);
    const [visited, setVisited] = useState(false);
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);


    useEffect(() => {
        let cleanup = false;
        const fetchUsersAndClassesAndVisits = async () => {
            try {
                if (!cleanup) {
                    const users = await Users.getUsers();
                    const classes = await Classes.getClasses();
                    const visits = await Visits.getVisits();
                    if (users != null && classes !== null && visits !== null) {
                        setUsers(users);
                        setClasses(classes);
                        setVisits(visits);
                    }
                }
            } catch (err) {
                console.error(err.message)
            }
        };
        fetchUsersAndClassesAndVisits();
        return () => cleanup = true;
    }, [callback]);

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }

    const handleAddVisit = async () => {
        await Visits.addVisit(
            payment,
            visited,
            data.userId,
            data.classId).then((response) => {
                setMessage(response.data.message);
                setSuccessful(true);
            }, (err) => {
                setMessage(err.response.data.message);
                setSuccessful(false);
            }
        );
        setCallback(!callback);
    }

    const handleUpdateVisit = async () => {
        await Visits.updateVisit(
            currentVisit,
            payment, visited, data.userId, data.classId).then((response) => {
                setShowUpdateVisit(false);
                setMessage(response.data.message);
                setSuccessful(true);
            }, (err) => {
                setShowUpdateVisit(false);
                setMessage(err.response.data.message);
                setSuccessful(false);
            }
        );
        setCallback(!callback);
    }

    const handleDeleteVisit = async (visitId) => {
        await Visits.deleteVisit(visitId).then((response) => {
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
                <Button variant="primary" onClick={() => setShowAddVisit(true)}>
                    Додати
                </Button>

                <Modal
                    show={showAddVisit}
                    onHide={() => (setShowAddVisit(false), setData(initialState))}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Додавання запису
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Кліент:</Form.Label>
                                <Form.Select name="userId" id="userId" value={data.userId} onChange={handleChangeInput}>
                                    {users.map(user => <option key={user.id}
                                                               value={user.id}>{user.surname} {user.name}</option>)};
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Заняття:</Form.Label>
                                <Form.Select name="classId" id="classId" value={data.classId}
                                             onChange={handleChangeInput}>
                                    {classes.map(clas => <option key={clas.id}
                                                                 value={clas.id}>{clas.type.name}, {moment(clas.start_time).format('MMMM D, HH:mm')} - {moment(clas.end_time).format('HH:mm')}</option>)};
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Оплата:</Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    id="payment"
                                    name="payment"
                                    value={data.payment}
                                    onChange={() => setPayment(!payment)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Відвідування:</Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    id="visited"
                                    name="visited"
                                    value={data.visited}
                                    onChange={() => setVisited(!visited)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleAddVisit}>
                            Додати
                        </Button>
                        <Button variant="danger" onClick={() => (setShowAddVisit(false), setData(initialState))}>
                            Скасувати
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show={showUpdateVisit}
                    onHide={() => (setShowUpdateVisit(false), setData(initialState))}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Редагування - {currentVisit === null ? "ID запису не вибраний" : "ID " + currentVisit}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Кліент:</Form.Label>
                            <Form.Select name="userId" id="userId" value={data.userId} onChange={handleChangeInput}>
                                {users.map(user => <option key={user.id}
                                                           value={user.id}>{user.surname} {user.name}</option>)};
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Заняття:</Form.Label>
                            <Form.Select name="classId" id="classId" value={data.classId}
                                         onChange={handleChangeInput}>
                                {classes.map(clas => <option key={clas.id}
                                                             value={clas.id}>{clas.type.name}, {moment(clas.start_time).format('MMMM D, HH:mm')} - {moment(clas.end_time).format('HH:mm')}</option>)};
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Оплата:</Form.Label>
                            <Form.Check
                                type="checkbox"
                                id="payment"
                                name="payment"
                                value={data.payment}
                                defaultChecked={data.payment != false ? true : false}
                                onChange={() => setPayment(!payment)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Відвідування:</Form.Label>
                            <Form.Check
                                type="checkbox"
                                id="visited"
                                name="visited"
                                value={data.visited}
                                defaultChecked={data.visited !== false ? true : false}
                                onChange={() => setVisited(!visited)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleUpdateVisit}>
                            Зберегти
                        </Button>
                        <Button variant="danger" onClick={() => (setShowUpdateVisit(false), setData(initialState))}>
                            Скасувати
                        </Button>
                    </Modal.Footer>
                </Modal>

                {visits.length > 0 ? <>
                    <Table striped bordered hover>
                        <thead>
                        <tr className="text-center">
                            <th>ID</th>
                            <th>Клієнт</th>
                            <th>Заняття</th>
                            <th>Оплата</th>
                            <th>Відвідування</th>
                            <th>Дії</th>
                        </tr>
                        </thead>
                        <tbody>
                        {visits.map((visit, index) => <tr className="text-center" key={index}>
                            <td>{visit.id}</td>
                            <td>{visit.user.surname} {visit.user.name}</td>
                            <td>{visit.type.name}, {moment(visit.class.start_time).format('MMMM D, HH:mm')} - {moment(visit.class.end_time).format('HH:mm')}</td>
                            <td>{visit.payment === true ? "✅" : "❌"}</td>
                            <td>{visit.visited === true ? "✅" : "❌"}</td>
                            <td className="text-center">
                                <Button variant="primary"
                                        onClick={() => (setCurrentVisit(visit.id), setData(visit), setShowUpdateVisit(true))}>
                                    Редагувати
                                </Button>{' '}
                                <Button variant="danger" onClick={() => handleDeleteVisit(visit.id)}>
                                    Видалити
                                </Button>
                            </td>
                        </tr>)}
                        </tbody>
                    </Table>
                </> : <>
                    <h4 style={{textAlign: "center"}}>
                        Немає записів
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

export default Visit;