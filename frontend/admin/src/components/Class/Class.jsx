import React, {useState, useEffect} from "react";
import Types from "../../services/types.js"
import Classes from "../../services/classes.js";
import moment from "moment";
import "moment/locale/uk";
import {Form, Modal, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const initialState = {
    start_time: "", end_time: "", price: "", place: "", count: "",
    typeId: "", trainerId: "", adminId: ""
};

const Class = () => {
    const [showAddClass, setShowAddClass] = useState(false);
    const [showUpdateClass, setShowUpdateClass] = useState(false);
    const [callback, setCallback] = useState(false);

    const [data, setData] = useState(initialState);
    const [types, setTypes] = useState([]);
    const [classes, setClasses] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [currentClass, setCurrentClass] = useState(null);

    const [selected, setSelected] = useState(null);
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);

    const adminId = JSON.parse(localStorage.getItem("admin")).id;

    useEffect(() => {
        let cleanup = false;
        const fetchTypesAndClassesAndTrainers = async () => {
            try {
                if (!cleanup) {
                    const types = await Types.getTypes();
                    const classes = await Classes.getClasses();
                    const trainers = await Classes.getTrainers();
                    if (types != null && classes !== null && trainers !== null) {
                        setTypes(types);
                        setClasses(classes);
                        setTrainers(trainers);
                    }
                }
            } catch (err) {
                console.error(err.message)
            }
        };
        fetchTypesAndClassesAndTrainers();
        return () => cleanup = true;
    }, [callback]);

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
        setSelected(e.target.value);
    }

    const handleAddClass = async () => {
        await Classes.addClass(
            data.start_time,
            data.end_time,
            data.price,
            data.place,
            data.count,
            data.typeId,
            data.trainerId,
            adminId).then((response) => {
                setMessage(response.data.message);
                setSuccessful(true);
            }, (err) => {
                setMessage(err.response.data.message);
                setSuccessful(false);
            }
        );
        setCallback(!callback);
    }

    const handleUpdateClass = async () => {
        await Classes.updateClass(
            currentClass,
            data.start_time,
            data.end_time,
            data.price,
            data.place,
            data.count,
            data.typeId,
            data.trainerId,
            adminId).then((response) => {
                setMessage(response.data.message);
                setSuccessful(true);
            }, (err) => {
                setMessage(err.response.data.message);
                setSuccessful(false);
            }
        );
        setCallback(!callback);
    }

    const handleDeleteClass = async (classId) => {
        await Classes.deleteClass(classId).then((response) => {
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
                <Button variant="primary" onClick={() => setShowAddClass(true)}>
                    Додати
                </Button>
                <Modal
                    show={showAddClass}
                    onHide={() => (setShowAddClass(false), setData(initialState))}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Додавання заняття
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Вид заняття:</Form.Label>
                                <Form.Select name="typeId" id="typeId" value={data.typeId} onChange={handleChangeInput}>
                                    {types.map(type => <option key={type.id} value={type.id}>{type.name}</option>)};
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Тренер:</Form.Label>
                                <Form.Select name="trainerId" id="trainerId" value={data.trainerId}
                                             onChange={handleChangeInput}>
                                    {trainers.map(trainer => <option key={trainer.id}
                                                                     value={trainer.id}>{trainer.surname} {trainer.name}</option>)};
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>ID адміна - {adminId}</Form.Label>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Ціна:</Form.Label>
                                <Form.Control type="text" id="price" name="price" value={data.price}
                                              onChange={handleChangeInput}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Номер залу:</Form.Label>
                                <Form.Control type="text" id="place" name="place" value={data.place}
                                              onChange={handleChangeInput}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Кількість місць:</Form.Label>
                                <Form.Control type="text" id="count" name="count" value={data.count}
                                              onChange={handleChangeInput}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Час початку:</Form.Label>
                                <Form.Control type="datetime-local" id="start_time" name="start_time"
                                              value={data.start_time} onChange={handleChangeInput}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Час закінчення:</Form.Label>
                                <Form.Control type="datetime-local" id="end_time" name="end_time" value={data.end_time}
                                              onChange={handleChangeInput}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleAddClass}>
                            Додати
                        </Button>
                        <Button variant="danger" onClick={() => (setShowAddClass(false), setData(initialState))}>
                            Скасувати
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show={showUpdateClass}
                    onHide={() => (setShowUpdateClass(false), setData(initialState))}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Редагування - {currentClass === null ? "ID заняття не вибраний" : "ID " + currentClass}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Вид заняття:</Form.Label>
                                <Form.Select name="typeId" id="typeId" value={data.typeId} onChange={handleChangeInput}>
                                    {types.map(type => <option key={type.id} value={type.id}>{type.name}</option>)};
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Тренер:</Form.Label>
                                <Form.Select name="trainerId" id="trainerId" value={data.trainerId}
                                             onChange={handleChangeInput}>
                                    {trainers.map(trainer => <option key={trainer.id}
                                                                     value={trainer.id}>{trainer.surname} {trainer.name}</option>)};
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>ID адміна - {adminId}</Form.Label>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Ціна:</Form.Label>
                                <Form.Control type="text" id="price" name="price" value={data.price}
                                              onChange={handleChangeInput}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Номер залу:</Form.Label>
                                <Form.Control type="text" id="place" name="place" value={data.place}
                                              onChange={handleChangeInput}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Кількість місць:</Form.Label>
                                <Form.Control type="text" id="count" name="count" value={data.count}
                                              onChange={handleChangeInput}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Час початку:</Form.Label>
                                <Form.Control type="datetime-local" id="start_time" name="start_time"
                                              value={data.start_time} onChange={handleChangeInput}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Час закінчення:</Form.Label>
                                <Form.Control type="datetime-local" id="end_time" name="end_time" value={data.end_time}
                                              onChange={handleChangeInput}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleUpdateClass}>
                            Зберегти
                        </Button>
                        <Button variant="danger" onClick={() => (setShowUpdateClass(false), setData(initialState))}>
                            Скасувати
                        </Button>
                    </Modal.Footer>
                </Modal>

                {classes.length > 0 ? <>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-center">
                                <th>ID</th>
                                <th>Вид заняття</th>
                                <th>Тренер</th>
                                <th>Адмін</th>
                                <th>Ціна</th>
                                <th>Номер залу</th>
                                <th>Кількість місць</th>
                                <th>Час початку</th>
                                <th>Час закінчення</th>
                                <th>Дії</th>
                            </tr>
                            </thead>
                            <tbody>
                            {classes.map((clas, index) => <tr className="text-center" key={index}>
                                <td>{clas.id}</td>
                                <td>{clas.type.name}</td>
                                <td>{clas.trainer.surname} {clas.trainer.name}</td>
                                <td>{clas.admin.surname + " " + clas.admin.name}</td>
                                <td>{clas.price} грн</td>
                                <td>{clas.place}</td>
                                <td>{clas.count}</td>
                                <td>{moment(clas.start_time).format('MMMM D, HH:mm')}</td>
                                <td>{moment(clas.end_time).format('MMMM D, HH:mm')}</td>
                                <td className="text-center">
                                    <Button variant="primary"
                                            onClick={() => (setCurrentClass(clas.id), setData(clas), setShowUpdateClass(true))}>
                                        Редагувати
                                    </Button>{' '}
                                    <Button variant="danger" onClick={() => handleDeleteClass(clas.id)}>
                                        Видалити
                                    </Button>
                                </td>
                            </tr>)}
                            </tbody>
                        </Table>
                    </> :
                    <div>
                        <p className='error-title'>Занять немає.</p>
                    </div>
                }
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

export default Class;