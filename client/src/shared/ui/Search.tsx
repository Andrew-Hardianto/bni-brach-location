import React, { useState } from "react";
import { Form } from "react-bootstrap";

const Search = ({ onSearch }) => {
    const [search, setSearch] = useState("");

    const onInputChange = value => {
        setSearch(value);
        onSearch(value);
    };
    return (
        <Form.Control
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            value={search}
            onChange={e => onInputChange(e.target.value)} />

    );
};

export default Search;
