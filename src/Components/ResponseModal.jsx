// Import required modules and libraries
import React, { useState, useRef } from "react";
import { Menu, Row, Col, Modal, Tabs, notification } from "antd";
import Question from "./Question";
import { UserOutlined } from "@ant-design/icons";
import { getItem } from "../Utils/helpers";

function ResponseModal({
  isModalOpen,
  setIsModalOpen,
  application,
  candidates,
  setCandidates,
  selectedKey,
  setApplication,
  setSelectedKey,
}) {
  const [api, contextHolder] = notification.useNotification();
  const [activeTab, setActiveTab] = useState(0);
  const playerRef = useRef(null);

  // Define function to handle tab changes
  const onChange = (tabIndex) => {
    try {
      // Pause the video player if it's currently playing
      if (playerRef.current) {
        playerRef.current.getInternalPlayer().pause();
      }
      // Set the active tab to the selected tab index
      setActiveTab(tabIndex);
    } catch (error) {
      console.error({ error });
    }
  };

  // Define function to open notifications with appropriate icons
  const openNotificationWithIcon = (type, title, description) => {
    api[type]({
      message: title,
      description: description,
    });
  };

  // Define function to handle menu item clicks
  const onClick = ({ key }) => {
    try {
      // Find the selected candidate from the candidates list
      let item = candidates.find((item) => item?.id === Number(key));
      if (item !== undefined) {
        // Check if the candidate has any applications
        if (item?.application?.length > 0) {
          // Set the application state with the selected candidate's details
          setApplication({
            candidateId: item?.id,
            applicationId: item?.applicationId,
            videos: item?.application,
          });
          // Set the selected key to the selected candidate's ID
          setSelectedKey(item?.id.toString());
        } else {
          // Show a notification if the candidate has no applications
          openNotificationWithIcon(
            "info",
            "No Application found",
            "This candidate does not have any application. Please select another one."
          );
        }
      }
    } catch (error) {
      console.error({ error });
    }
  };

  // Map the candidates list to menu items for display
  let menuItems = candidates.map((item, index) => ({
    ...item,
    label: item?.name,
    key: item?.id?.toString(),
  }));

  // Render the component JSX
  return (
    <>
      {/* Display notification context holder */}
      {contextHolder}
      <Modal
        destroyOnClose
        width={1000}
        title="Response Modal"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            {/* Render the menu with the list of candidates */}
            <Menu
              onClick={onClick}
              style={{
                width: 256,
              }}
              selectedKeys={selectedKey}
              defaultOpenKeys={["candidates"]}
              mode="inline"
              items={[
                getItem(
                  "Candidates",
                  "candidates",
                  <UserOutlined />,
                  menuItems
                ),
              ]}
            />
          </Col>
          <Col xs={24} sm={24} md={16} lg={16} xl={16} xxl={16}>
            {/* Render the video player and editor for comments */}
            {application && (
              <Tabs
                defaultActiveKey={activeTab}
                items={application?.videos?.map((item, index) => {
                  return {
                    key: index,
                    label: `Question ${index + 1}`,
                    children: (
                      <Question
                        setCandidates={setCandidates}
                        itemIndex={index}
                        videos={application?.videos}
                        candidateId={application?.candidateId}
                        applicationId={application?.applicationId}
                        candidates={candidates}
                        url={item?.answer?.src}
                        questionId={item?.id}
                        comments={item?.answer?.comments}
                        question={item?.question}
                        playerRef={playerRef}
                        playing={index === activeTab}
                      />
                    ),
                  };
                })}
                onChange={onChange}
              />
            )}
          </Col>
        </Row>
      </Modal>
    </>
  );
}

export default ResponseModal;
