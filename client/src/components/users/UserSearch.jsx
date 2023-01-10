import React from "react";
import { Col, Row, Avatar } from "antd";
import { Link } from "react-router-dom";
import "../../assets/style/user.css";
const style = {
  background: "none",
  padding: "4px 0",
};

function UserSearch({ users }) {
  return (
    <div>
      <Row gutter={16}>
        {users?.map((el, idx) => (
          <Col span={6} className="gutter-row" key={idx}>
            <div style={style}>
              <div className="userContainer">
                <Avatar size={64} src={el.avatar_url} className="avatar" />
                <div className="subUserContainer">
                  {el.login}
                  <Link className="link" to={`users/${el.login}`}>
                    <p className="linkToProfile">View Profile</p>
                  </Link>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default UserSearch;
