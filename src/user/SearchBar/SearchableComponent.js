import React, { Component } from "react";
import SearchBar from "./SearchBar";

class SearchableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [], // 검색 대상 데이터
            filteredData: [], // 검색 결과를 저장할 상태
        };
    }

    handleSearch = (searchTerm) => {
        const { data } = this.state;
        const filteredData = data.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()));
        this.setState({ filteredData });
    };

    render() {
        const { filteredData } = this.state;

        return (
            <div>
                <SearchBar onSearch={this.handleSearch} />
                {filteredData.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </div>
        );
    }
}

export default SearchableComponent;
