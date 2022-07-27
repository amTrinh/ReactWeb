import React, { useState, useEffect } from 'react';
import './style/Shop.css'
import ItemList from './ItemList';
import { Tab, Row, Col, ListGroup } from 'react-bootstrap'
import axios from 'axios';

function Shop() {

    const [list, setList] = useState([])

    const [searchValue, setSearchValue] = useState('')

    const [allItems, setAllItems] = useState([])

    useEffect(() => {
        const getItems = async () => {
            try {
                const response = await (await axios.get("http://localhost:5000/GetAllItems")).data;
                console.log(response.Items)
                setList(response.Items)
                setAllItems(response.Items)
            } catch (error) {
                if (error.response.data) return error.response.data
                else return { success: false, message: error.message }
            }
        }
        getItems()
    }, [])

    const getItemsByType = async (type) => {
        try {
            if (type === 'All') {
                setList(allItems)
            } else {
                const response = await (await axios.get(`http://localhost:5000/GetItemsByType/${type}`)).data;
                console.log(response.Items)
                setList(response.Items)
            }

        } catch (error) {
            if (error.response.data) return error.response.data
            else return { success: false, message: error.message }
        }
    }


    const onChangeSearchValue = (e) => {
        const searchList = allItems.filter(item => {
            return item.itemName.toLowerCase().includes(e.target.value.toLowerCase())
                || item.itemType.toLowerCase().includes(e.target.value.toLowerCase())
                || item.description.toLowerCase().includes(e.target.value.toLowerCase())
        })

        if (e.target.value !== '') {
            setList(searchList)

        }
        setSearchValue(e.target.value)
    }

    const TypeList = [
        {
            'itemType': 'All'
        },
        {
            'itemType': 'Shoe'
        },
        {
            'itemType': 'T-shirt'
        },
        {
            'itemType': 'Hoodie'
        },
        {
            "itemType": "Jacket"
        },
        {
            "itemType": "Sock"
        }
    ]
    const DisplayTypeList = TypeList.map((type) =>
        <ListGroup.Item action href={`#${type.itemType}`} onClick={() => getItemsByType(type.itemType)}>
            {type.itemType}
        </ListGroup.Item>
    );
    return (
        <>
            <div className='ShopMain container'>
                <Tab.Container id="list-group-tabs-example" defaultActiveKey="#All">
                    <Row>
                        <Col className='category ' sm={2}>
                            <ListGroup className='sticky'>
                                <input type='text' className='fillter' placeholder='Fillter' value={searchValue} onChange={onChangeSearchValue}></input>
                                {DisplayTypeList}
                            </ListGroup>
                        </Col>
                        <Col sm={10}>
                            <Tab.Content>
                                <Tab.Pane eventKey="#All">
                                    <ItemList items={list} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="#Shoe">
                                    <ItemList items={list} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="#T-shirt">
                                    <ItemList items={list} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="#Hoodie">
                                    <ItemList items={list} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="#Jacket">
                                    <ItemList items={list} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="#Sock">
                                    <ItemList items={list} />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>

        </>
    )
}


export default Shop;