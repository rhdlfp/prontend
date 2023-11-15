import React, { Component } from "react";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
        };
    }

    handleInputChange = (event) => {
        this.setState({
            searchTerm: event.target.value,
        });
    };

    render() {
        const { searchTerm } = this.state;
        const { onSearch } = this.props;

        return (
            <div>
                <input type="text" placeholder="검색어를 입력하세요..." value={searchTerm} onChange={this.handleInputChange} />
                <button onClick={() => onSearch(searchTerm)}>검색</button>
            </div>
        );
    }
}

export default SearchBar;
