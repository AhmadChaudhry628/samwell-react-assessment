// Import necessary modules from antd library and react
import React, { useState } from "react";
import { Card, List, Col, Row, Button, Typography, notification } from "antd";
import { EyeTwoTone } from "@ant-design/icons";

// Import the response modal component
import ResponseModal from "./ResponseModal";

// Destructure Title component from Typography module
const { Title } = Typography;

function CandidateList({ candidates, setCandidates }) {
  // Define state variables
  const [application, setApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState([]);

  // Use the antd notification module
  const [api, contextHolder] = notification.useNotification();

  // Define function to open notifications with appropriate icons
  const openNotificationWithIcon = (type, title, description) => {
    api[type]({
      message: title,
      description: description,
    });
  };

  // Define function to handle the viewing of an application
  const handleApplicationView = (item) => {
    if (item?.application?.length > 0) {
      setIsModalOpen(true);
      setApplication({
        candidateId: item?.id,
        applicationId: item?.applicationId,
        videos: item?.application,
      });
      setSelectedKey(item?.id.toString());
    } else {
      openNotificationWithIcon(
        "info",
        "No Application found",
        "This candidate doesnot have any application.Please select another one."
      );
    }
  };

  // Return the candidate list component
  return (
    <>
      {contextHolder}

      {/* Display the list of candidates  */}
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 4,
          xxl: 3,
        }}
        dataSource={candidates}
        renderItem={(item, index) => {
          return (
            <List.Item>
              <Card title={`Candidate ${index + 1}`}>
                <Row align={"center"} justify={"center"} gutter={16}>
                  <Col className="gutter-row" span={18}>
                    <Title level={5}>{item?.name || "Candidate Name"}</Title>
                  </Col>
                  <Col className="gutter-row" span={6}>
                    <Button
                      onClick={() => handleApplicationView(item)}
                      type="ghost"
                      icon={<EyeTwoTone />}
                      size={"large"}
                    />
                  </Col>
                </Row>
              </Card>
            </List.Item>
          );
        }}
      />
      {/* Render the response modal */}
      <ResponseModal
        selectedKey={selectedKey}
        setSelectedKey={setSelectedKey}
        setCandidates={setCandidates}
        candidates={candidates}
        application={application}
        setApplication={setApplication}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}

// Export the CandidateList component
export default CandidateList;
