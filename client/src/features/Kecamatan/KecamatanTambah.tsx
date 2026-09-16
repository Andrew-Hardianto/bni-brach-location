import { useCreateKecamatanMutation } from '@/entities/kecamatan/api/kecamatanApi';
import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Loader from '@/shared/ui/Loader';
import Message from '@/shared/ui/Message';
import { useGetKotasQuery } from '@/entities/kota/api/kotaApi';

const initialState = { Kecamatan_Code: '', Kecamatan_Name: '', Kabkota_Code: '', Status: '' }

const KecamatanTambah = ({ history }) => {

    const [data, setData] = useState(initialState)

    const [createKecamatanApi, { isLoading: loading, error, isSuccess: success }] = useCreateKecamatanMutation();

    const { data: kotaData } = useGetKotasQuery({ limit: 100 });
    const kota = kotaData?.kota || [];

    useEffect(() => {
        if (success) {
            history.push('/location/kecamatan')
        }
    }, [history, success])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        await createKecamatanApi(data);
    }
    console.log(data)
    return (
        <div className="home">
            <Card style={{ width: '25rem' }} className="mt-3" >
                <Card.Body>
                    <Card.Title>Tambah Kecamatan</Card.Title>
                    {loading && <Loader />}
                    {error && <Message variant="danger" >{error}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="Kecamatan_Code">
                            <Form.Label>Kode Kecamatan</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Kode Kecamatan..."
                                name="Kecamatan_Code"
                                // value={data.kode || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="Kecamatan_Name">
                            <Form.Label>Nama Kecamatan</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Kecamatan..."
                                name="Kecamatan_Name"
                                // value={nama || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="Kabkota_Code">
                            <Form.Label>Kota</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="Kabkota_Code"
                                // value={kotaId || ''}
                                onChange={handleChange}
                            >
                                <option value="">- Pilih Kota -</option>
                                {kota?.filter((kt) => kt.Kabkota_Code?.toString().includes(data?.Kecamatan_Code.toString().substring(0, 4)))
                                    .map((data) => (
                                        <option key={data?.ID_Kabkota} value={data?.Kabkota_Code || ''} >{data.Kabkota_Name}</option>
                                    ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="Status">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="Status"
                                onChange={handleChange}
                            >
                                <option value="">- Pilih Status -</option>
                                <option value="Y" >Aktif</option>
                                <option value="N" >Tidak Aktif</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Link to={'/location/kecamatan'} className="btn btn-warning ml-3" >
                            <i className="fas fa-arrow-left"></i> Kembali
                        </Link>
                    </Form>
                </Card.Body>
            </Card>
        </div >
    )
}

export default KecamatanTambah
