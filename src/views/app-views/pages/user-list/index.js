import React, { Component } from "react";
import { Card, Table, Tooltip, message, Button } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import UserView from "./UserView";
import AvatarStatus from "components/shared-components/AvatarStatus";

import { connect } from "react-redux";
import { usersTC } from "../../../../redux/thunks/Users";

export class UserList extends Component {
    componentDidMount() {
        this.props.usersTC();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.usersData !== this.props.usersData) {
            this.setState({
                users: this.props.usersData,
            });
        }
    }

    state = {
        users: this.props.usersData,
        userProfileVisible: false,
        selectedUser: null,
    };

    deleteUser = userId => {
        this.setState({
            users: this.state.users.filter(item => item.id !== userId),
        });
        message.success({ content: `Deleted user ${userId}`, duration: 2 });
    };

    showUserProfile = userInfo => {
        this.setState({
            userProfileVisible: true,
            selectedUser: userInfo,
        });
    };

    closeUserProfile = () => {
        this.setState({
            userProfileVisible: false,
            selectedUser: null,
        });
    };

    render() {
        const { users, userProfileVisible, selectedUser } = this.state;

        const tableColumns = [
            {
                title: "User",
                dataIndex: "name",
                render: (_, record) => (
                    <div className='d-flex'>
                        <AvatarStatus
                            id={record.id}
                            src={record.img}
                            name={record.name}
                            subTitle={record.email}
                            website={record.website}
                            username={record.username}
                            phone={record.phone}
                            address={record.address.street}
                            city={record.address.city}
                        />
                    </div>
                ),
                sorter: {
                    compare: (a, b) => {
                        a = a.name.toLowerCase();
                        b = b.name.toLowerCase();
                        return a > b ? -1 : b > a ? 1 : 0;
                    },
                },
            },
            {
                title: "Website",
                dataIndex: "website",
                sorter: {
                    compare: (a, b) => {
                        a = a.website.toLowerCase();
                        b = b.website.toLowerCase();
                        return a > b ? -1 : b > a ? 1 : 0;
                    },
                },
            },
            {
                title: "Email",
                dataIndex: "email",
                sorter: (a, b) => {
                    a = a.website.toLowerCase();
                    b = b.website.toLowerCase();
                    return a > b ? -1 : b > a ? 1 : 0;
                },
            },
            {
                title: "Phone",
                dataIndex: "phone",
                sorter: {
                    compare: (a, b) => a.status.length - b.status.length,
                },
            },
            {
                title: "",
                dataIndex: "actions",
                render: (_, elm) => (
                    <div className='text-right'>
                        <Tooltip title='View'>
                            <Button
                                type='primary'
                                className='mr-2'
                                icon={<EyeOutlined />}
                                onClick={() => {
                                    this.showUserProfile(elm);
                                }}
                                size='small'
                            />
                        </Tooltip>
                        <Tooltip title='Delete'>
                            <Button
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => {
                                    this.deleteUser(elm.id);
                                }}
                                size='small'
                            />
                        </Tooltip>
                    </div>
                ),
            },
        ];
        return (
            <Card bodyStyle={{ padding: "0px" }}>
                <Table
                    columns={tableColumns}
                    dataSource={users}
                    rowKey='id'
                />
                <UserView
                    data={selectedUser}
                    visible={userProfileVisible}
                    close={() => {
                        this.closeUserProfile();
                    }}
                />
            </Card>
        );
    }
}

const mapStateToProps = ({ users }) => {
    const { usersData } = users;
    return { usersData };
};
const mapDispatchToProps = {
    usersTC,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);

// export default UserList;
