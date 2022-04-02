import PropTypes from "prop-types";
import React, { Component } from "react";
import axios from "axios";
import { Input, Radio, Modal, Table, Divider, Tag, Button } from "antd";

import "antd/dist/antd.css";
import "./App.css";
import { Icon } from "antd";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",

      visibleAdd: false,
      data: [],
      columns: [
        {
          title: "Id",
          dataIndex: "id",
          key: "id",
          width: "10%",
          align: "center",
        },
        {
          title: "Title",
          dataIndex: "title",
          width: "50%",
          align: "left",
        },
        {
          title: "Completed",
          dataIndex: "completed",
          width: "20%",
          align: "center",
          render: (tags) => (
            <span>
              <>
                {tags === true ? (
                  <span className="true" style={{}}>
                    {" "}
                  </span>
                ) : (
                  <span className="false"> </span>
                )}
              </>
            </span>
          ),
        },
        {
          title: "Action",
          dataIndex: "",
          width: "20%",
          key: "action",
          align: "center",
          render: (text) => (
            <span>
              <a>
                <Icon
                  className="edit"
                  type="edit"
                  theme="filled"
                  //   onClick={this.showEditModal}
                />
              </a>

              <Divider type="vertical" />
              <a>
                <Icon
                  className="delete"
                  type="delete"
                  theme="filled"
                  onClick={() => {
                    this.setState({
                      data: this.state.data.filter(
                        (item) => item.id !== text.id
                      ),
                    });
                  }}
                />
              </a>
            </span>
          ),
        },
      ],
    };
    this.handleChange = this.handleChange.bind(this);
  }
  showAddModal = () => {
    this.setState({
      visibleAdd: true,
    });
  };

  handleAddOk = (e) => {
    console.log(e);
    this.setState({
      visibleAdd: false,
      data: [
        ...this.state.data,
        {
          id: this.state.data.length + 1,
          title: this.state.value,
          completed: false,
        },
      ],
      value: "",
    });
  };

  handleAddCancel = (e) => {
    console.log(e);
    this.setState({
      visibleAdd: false,
    });
  };
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  //   }
  //   showEditModal = () => {
  //     this.setState({
  //       visibleEdit: true,
  //     });
  //   };

  //   handleEditOk = (e) => {
  //     console.log(e);
  //     this.setState({
  //       visibleEdit: false,
  //     });
  //   };

  //   handleEditCancel = (e) => {
  //     console.log(e);
  //     this.setState({
  //       visibleEdit: false,
  //     });
  //   };
  //   showDeleteModal = () => {
  //     this.setState({
  //       visibleDelete: true,
  //     });
  //   };

  //   handleDeleteOk = (e) => {
  //     console.log(e);
  //     this.setState({
  //       visibleDelete: false,
  //     });
  //   };

  //   handleDeleteCancel = (e) => {
  //     console.log(e);
  //     this.setState({
  //       visibleDelete: false,
  //     });
  //   };
  //   handleAddTodo = (e) => {
  //     console.log(e);
  //     this.setState({
  //       addValue: e.target.value,
  //     });
  //   };
  async componentDidMount() {
    const data = await axios.get(`https://jsonplaceholder.typicode.com/todos/`);
    this.setState({ data: data.data });
  }

  render() {
    return (
      <div className="App">
        <div className="heading">
          <h1>Todo List</h1>
          <Button type="primary" onClick={this.showAddModal}>
            <Icon type="file-add" /> Add Todo
          </Button>
        </div>
        {this.state.data && (
          <Table
            columns={this.state.columns}
            dataSource={this.state.data}
            pagination={false}
            className="table"
          />
        )}
        <Modal
          title="Add Modal"
          visible={this.state.visibleAdd}
          onOk={this.handleAddOk}
          onCancel={this.handleAddCancel}
          okText="Add"
        >
          <Input
            placeholder="Add your todo"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </Modal>
      </div>
    );
  }
}
