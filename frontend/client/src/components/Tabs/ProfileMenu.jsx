import React, {useState, useEffect} from "react";
import moment from "moment";
import "moment/locale/uk";
import {Nav, Tab, Row, Col, Card, Button, ListGroup, ListGroupItem, Container} from "react-bootstrap";
import Select from "react-select";
import './ProfileMenu.scss';
import Auth from "../../services/auth.js";
import Class from "../../services/class.js";
import Visit from "../../services/visit.js";
import {Link, useNavigate} from "react-router-dom";

const ProfileMenu = () => {
    const currentUser = Auth.getCurrentUser();

    const [types, setTypes] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [classes, setClasses] = useState([]);
    const [visits, setVisits] = useState([]);

    const [selectedType, setSelectedType] = useState(null);
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);

    const [callback, setCallback] = useState(false);
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);

    useEffect(() => {
        let cleanup = false;
        const fetchTypesAndTrainersAndVisits = async () => {
            try {
                if (!cleanup) {
                    const types = await Class.getTypes();
                    const trainers = await Class.getTrainers();
                    const classes = await Class.getClassesByTypeAndTrainer(selectedType, selectedTrainer);
                    const visits = await Visit.getVisits(currentUser.id);
                    visits.sort((a, b) => b.id - a.id)
                    if (types !== null && trainers !== null && classes !== null && visits !== null) {
                        setTypes(types);
                        setTrainers(trainers);
                        setClasses(classes);
                        setVisits(visits);
                    }
                }
            } catch (err) {
                console.error(err.message)
            }
        };
        fetchTypesAndTrainersAndVisits();
        return () => cleanup = true;
    }, [callback]);

    const optionsType = types.map((type) => {
        return {value: type.id, label: type.name};
    });

    let navigate = useNavigate();
    const logout = () => {
        Auth.logout();
        let path = `/login`;
        navigate(path);
        currentUser(undefined);
    };

    const optionsTrainer = trainers.map((trainer) => {
        return {value: trainer.id, label: trainer.surname + " " + trainer.name};
    });

    const optionsTime = classes.map((clas) => {
        return {
            value: clas.id,
            label: moment(clas.start_time).format('DD.MM, HH:mm') + "-" + moment(clas.end_time).format('HH:mm')
        };
    });

    const sendData = async () => {
        if (selectedClass) {
            await Visit.sendVisit(currentUser.id, selectedClass).then((response) => {
                    setSuccessful(true);
                    setMessage(response.data.message);
                }, (err) => {
                    setSuccessful(false);
                    setMessage(err.response.data.message);
                }
            );
        } else {
            setMessage("Виберіть тренера та час, будь ласка.");
        }
    }

    const cancelVisit = async (visitId) => {
        console.log("CANCEL ID " + visitId);
        await Visit.deleteVisit(visitId).then((response) => {
            setSuccessful(true);
            setMessage(response.data.message);
        }, (err) => {
            setSuccessful(false);
            setMessage(err.response.data.message);
        });
    }

    return (
        currentUser ? (
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row className="my-4">
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item className="mb-2">
                                <Nav.Link eventKey="first" onClick={() => setMessage("")}>Мій профіль</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="mb-2">
                                <Nav.Link eventKey="second" onClick={() => setMessage("")}>Заняття</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="mb-2">
                                <Nav.Link eventKey="third" onClick={() => setMessage("")}>Історія</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <div className='tabs-container'>
                                    <div className='history'>
                                        <div className='history__header'>
                                            <h3 className='title-yellow'>
                                                Мій профіль
                                            </h3>
                                        </div>
                                        <div>
                                            <p>
                                                <strong>Ім'я: </strong>{currentUser.name}
                                            </p>
                                        </div>
                                        <div>
                                            <p>
                                                <strong>Пошта: </strong>{currentUser.email}
                                            </p>
                                        </div>
                                        <div style={{textAlign: 'center'}}>
                                            <input
                                                className="input-box form__submit p-2"
                                                style={{color: 'black', background:'#FFF200', fontWeight: 'bold'}}
                                                type="button"
                                                value="Змінити дані профілю"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <div className="tabs-container">
                                    <div className="form__content">
                                        <div className='form__header'>
                                            <h3 className='form__header__title title-yellow'>Запис на заняття</h3>
                                        </div>
                                        <form className='form__main'>
                                            <div className="input-boxes">
                                                <div className='input-box'>
                                                    <label id="type-label" htmlFor="type-input">
                                                        Обери вид заняття
                                                    </label>
                                                    <Select
                                                        inputId="type-input"
                                                        value={optionsType.find(obj => obj.value === selectedType)}
                                                        options={optionsType}
                                                        onChange={(e) => (setSelectedType(e.value), setCallback(!callback))}
                                                    />
                                                </div>

                                                <div className='input-box'>
                                                    <label id="trainer-label" htmlFor="trainer-input">
                                                        Обери тренера
                                                    </label>
                                                    <Select
                                                        inputId="trainer-input"
                                                        value={optionsTrainer.find(obj => obj.value === selectedTrainer)}
                                                        options={optionsTrainer}
                                                        onChange={(e) => (setSelectedTrainer(e.value), setCallback(!callback))}
                                                    />
                                                </div>

                                                <div className='input-box'>
                                                    <label id="time-label" htmlFor="time-input">
                                                        Обери дату
                                                    </label>
                                                    <Select
                                                        inputId="time-input"
                                                        value={optionsTime.find(obj => obj.value === selectedClass)}
                                                        options={optionsTime}
                                                        onChange={(e) => setSelectedClass(e.value)}
                                                        isDisabled={classes.length > 0 ? false : true}
                                                    />
                                                </div>

                                                {classes.length > 0 ? <>
                                                    {classes.map((clas, index) =>
                                                        clas.id == selectedClass ?
                                                            <div key={index} className='input-box'>
                                                                <details>
                                                                    <summary style={{color: 'white'}}>Подивитися
                                                                        інформацію про заняття
                                                                    </summary>
                                                                    <label id="time-label" htmlFor="time-input">
                                                                        <p><strong>Ціна:</strong> {clas.price} грн</p>
                                                                        <p className='m-0'><strong>Номер залу:</strong> {clas.place}</p>
                                                                    </label>
                                                                </details>
                                                            </div> : <></>)}
                                                </> : <></>}

                                                <div>
                                                    <input
                                                        className="input-box form__submit p-2"
                                                        style={{color: 'black', background:'#FFF200', fontWeight: 'bold'}}
                                                        type="button"
                                                        value="Забронювати"
                                                        onClick={sendData}
                                                    />
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
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <div className='tabs-container'>
                                    <div className='history'>
                                        <div className='history__header'>
                                            <h3 className='title-yellow'>
                                                Історія записів на заняття
                                            </h3>
                                        </div>
                                        <div className='my-4 history__main'>
                                            {visits.length > 0 ? <Container>
                                                <Row>
                                                {visits.map((visit, index) => <Col s lg="4" key={index}
                                                                                   className='history__item mb-2'>
                                                    <Card style={{ width: '18rem' }}>
                                                    <Card.Body>
                                                        <Card.Title className='m-0' style={{color: 'black'}}>{visit.type.name}</Card.Title>
                                                    </Card.Body>
                                                    <ListGroup className="list-group-flush">
                                                        <ListGroupItem>Тренер: {visit.trainer.surname + " " + visit.trainer.name}</ListGroupItem>
                                                        <ListGroupItem>Ціна: {visit.class.price} гривень</ListGroupItem>
                                                        <ListGroupItem>Зал: {visit.class.place}</ListGroupItem>
                                                    </ListGroup>
                                                    <Card.Body>
                                                    {visit.visited == true ? <ListGroupItem style={{textAlign: "center", color: 'black', border: 'none'}}>Відвідано ✅</ListGroupItem> : <div style={{textAlign: "center"}}>
                                                        <button className='button button-review' style={{width: '100%'}}
                                                                onClick={() => cancelVisit(visit.id)}>Скасувати
                                                        </button>

                                                    </div>}
                                                    </Card.Body>
                                                    <Card.Footer className="text-muted">{moment(visit.class.start_time).format('DD.MM, HH:mm')}-{moment(visit.class.end_time).format('HH:mm')}
                                                    </Card.Footer>
                                                </Card>
                                                </Col>)}
                                                </Row>
                                            </Container> : <>
                                                Нема записів. Ви можете записатися на заняття.
                                            </>}
                                        </div>
                                        <div className="form-group">
                                            <div
                                                className="alert alert-success"
                                                role="alert"
                                            >
                                                Запис на заняття успішно скасовано.
                                            </div>
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
                                    </div>

                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        ) : (
            <h2>
                Доступ до особистого кабінету заборонено або увійдіть, будь ласка.
            </h2>)
    );
};

export default ProfileMenu;