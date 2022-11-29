import React, {useState, useEffect} from "react";
import Classes from "../services/class.js";
import moment from "moment";
import "moment/locale/uk";
import {Table} from "react-bootstrap";

const Timetable = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        let cleanup = false;
        const fetchClasses = async () => {
            try {
                if (!cleanup) {
                    const classes = await Classes.getClasses();
                    if (classes !== null) {
                        setClasses(classes);
                    }
                }
            } catch (err) {
                console.error(err.message)
            }
        };
        fetchClasses();
        return () => cleanup = true;
    }, []);

    return (
        <div className='container'>
            <div className='my-4'>
                {classes.length > 0 ? <>
                        <Table bordered hover>
                            <thead>
                            <tr className="text-center">
                                <th>Вид заняття</th>
                                <th>Тренер</th>
                                <th>Ціна</th>
                                <th>Номер залу</th>
                                <th>Час</th>
                                <th>День</th>
                            </tr>
                            </thead>
                            <tbody>
                            {classes.map((clas, index) => <tr className="text-center" key={index}>
                                <td>{clas.type.name}</td>
                                <td>{clas.trainer.surname} {clas.trainer.name}</td>
                                <td>{clas.price} грн</td>
                                <td>{clas.place}</td>
                                <td>{moment(clas.start_time).format('HH:mm')}-{moment(clas.end_time).format('HH:mm')}</td>
                                <td>{moment(clas.start_time).format('DD.MM')}</td>
                            </tr>)}
                            </tbody>
                        </Table>
                    </> :
                    <div>
                        <p className='error-title'>Розкладу немає.</p>
                        <p className='error-description'>Розклад ще не сформован. Зверніться, будь ласка, пізніше.</p>
                    </div>
                }
            </div>
        </div>
    );
};

export {Timetable};