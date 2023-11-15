import React, { Component } from "react";
import BakeryService from "../Bakery/BakeryService";

class CreateBoardComponent extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      no: this.props.match.params.no,
      type: 1,
      title: "", // 가게명
      contents: "",
      attachedFiles: [],
    };

    this.changeTypeHandler = this.changeTypeHandler.bind(this);
    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.changeContentsHandler = this.changeContentsHandler.bind(this);
    this.changeattachedFilesHandler =
      this.changeattachedFilesHandler.bind(this);
    this.createBakery = this.createBakery.bind(this);
  }

  changeTypeHandler = (event) => {
    this.setState({ type: event.target.value });
  };

  changeTitleHandler = (event) => {
    this.setState({ title: event.target.value });
  };

  changeContentsHandler = (event) => {
    this.setState({ contents: event.target.value });
  };

  changeattachedFilesHandler = (event) => {
    const newFiles = event.target.files;
    let attachedFilesPreview = [];
    let attachedFiles = [];

    for (let i = 0; i < newFiles.length; i++) {
      attachedFilesPreview.push(URL.createObjectURL(newFiles[i]));
      attachedFiles.push(newFiles[i]);
    }

    this.setState({ attachedFilesPreview, attachedFiles });
  };

  createBakery = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("type", this.state.type);
    formData.append("title", this.state.title);
    formData.append("contents", this.state.contents.replace(/\n/g, "<br>"));
    formData.append("id", this.props.location.state.id);
    formData.append("name", this.props.location.state.name);

    // Remove existing files
    formData.append("removeExistingFiles", true);

    // Append the new attached files
    if (this.state.attachedFiles && this.state.attachedFiles.length) {
      for (let i = 0; i < this.state.attachedFiles.length; i++) {
        formData.append("file", this.state.attachedFiles[i]);
      }
    }

    if (this.state.no === "_create") {
      console.log(formData);
      BakeryService.createBakery(formData)
        .then((res) => {
          this.props.history.push("/comunity");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log(formData);
      BoardService.updateBoard(this.state.no, formData)
        .then((res) => {
          this.props.history.push("/comunity");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  cancel = () => {
    this.props.history.push("/comunity");
  };

  getTitle() {
    if (this.state.no === "_create") {
      return <h3 className="text-center">새 글을 작성해주세요</h3>;
    } else {
      return <h3 className="text-center">{this.state.no}글을 수정 합니다.</h3>;
    }
  }

  componentDidMount() {
    if (this.state.no === "_create") {
      return;
    } else {
      BoardService.getOneBoard(this.state.no).then((res) => {
        let comunity = res.data;
        console.log("comunity => " + JSON.stringify(comunity));

        this.setState({
          type: comunity.type,
          title: comunity.title,
          contents: comunity.contents,
          attachedFiles: comunity.attachedFiles,
        });
      });
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Type </label>
                    <select
                      placeholder="type"
                      name="type"
                      className="form-control"
                      value={this.state.type}
                      onChange={this.changeTypeHandler}
                      disabled
                    >
                      <option value="1">자유게시판</option>
                      <option value="2">질문과 답변</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label> Title </label>
                    <input
                      type="text"
                      placeholder="title"
                      name="title"
                      className="form-control"
                      value={this.state.title}
                      onChange={this.changeTitleHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Contents </label>
                    <textarea
                      placeholder="contents"
                      name="contents"
                      className="form-control"
                      value={this.state.contents}
                      onChange={this.changeContentsHandler}
                      style={{ width: "100%", height: "150px" }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Attached Files</label>
                    <div>
                      {this.state.attachedFilesPreview &&
                        this.state.attachedFilesPreview.map(
                          (preview, index) => (
                            <div key={index}>
                              <img
                                src={preview}
                                alt={`file_${index + 1}`}
                                style={{ width: "100px", height: "100px" }}
                              />
                            </div>
                          )
                        )}
                    </div>
                    <input
                      type="file"
                      multiple
                      onChange={this.changeattachedFilesHandler}
                    />
                  </div>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={this.createBoard}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateBoardComponent;
