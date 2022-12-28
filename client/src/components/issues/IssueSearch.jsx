import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import GithubContext from "../../context/github/GithubContext";
import { Col, Row, Avatar, Select } from "antd";

const style = {
  background: "none",
  padding: "4px 0",
  border: "1px solid black",
  borderRadius: "10px",
  margin: "5px 0",
};

function IssueSearch({ issues }) {
  console.log(issues);

  const { loading } = useContext(GithubContext);

  return (
    <div>
      <Row gutter={16}>
        {issues?.map((issue, idx) => (
          <Col span={12} className="gutter-row" key={idx}>
            {issue.url}
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default IssueSearch;
