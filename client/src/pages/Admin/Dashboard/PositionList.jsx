import React, { useState } from "react";
import PropTypes from "prop-types";
import { compose, graphql } from "react-apollo";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

import {
  AdminPositionsQuery,
  AdminAddPosition,
  AdminDeletePosition,
  AdminUpdatePosition,
  AdminTopicsQuery
} from "../../../queries";

function PositionList(props) {
  const [newPosition, setNewPosition] = useState(false);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [position, setPosition] = useState(null);

  const savePosition = () => {
    const { addPosition, updatePosition } = props;
    const { id, __typename, ...rest } = position;
    if (newPosition) {
      addPosition({
        variables: {
          data: {
            ...rest,
            topic: {
              connect: {
                id: rest.topic.id
              }
            }
          }
        }
      }).then(() => setDisplayDialog(false));
    } else {
      updatePosition({
        variables: {
          data: rest,
          where: {
            id
          }
        }
      }).then(() => setDisplayDialog(false));
    }
  };

  const deletePosition = () => {
    const { deletePosition } = props;
    deletePosition({
      variables: {
        where: {
          id: position.id
        }
      }
    }).then(() => setDisplayDialog(false));
  };

  const updateProperty = (property, value) => {
    setPosition({
      ...position,
      [property]: value
    });
  };

  const addNewPosition = () => {
    setNewPosition(true);
    setPosition({
      name: ""
    });
    setDisplayDialog(true);
  };

  const onPositionSelect = e => {
    setNewPosition(false);
    setPosition(Object.assign({}, e.data.position));
    setDisplayDialog(true);
  };

  const { positions, topics } = props;
  return (
    <React.Fragment>
      <DataTable
        lazy
        rows={10}
        paginator
        loading={positions.loading}
        value={positions.positionsWithLikes}
        header={<h2 style={{ margin: 0 }}>Positions</h2>}
        footer={
          <div className="p-clearfix">
            <Button
              style={{ float: "left" }}
              label="Add"
              icon="pi pi-plus"
              onClick={addNewPosition}
            />
          </div>
        }
        selectionMode="single"
        onRowSelect={onPositionSelect}
      >
        <Column field="position.name" header="Position" sortable />
        <Column field="likes" header="Likes" sortable />
        <Column field="dislikes" header="Dislikes" sortable />
      </DataTable>
      <Dialog
        visible={displayDialog}
        width="300px"
        header="Position Details"
        modal={true}
        footer={
          <div className="ui-dialog-buttonpane p-clearfix">
            <Button
              label="Delete"
              icon="pi pi-times"
              onClick={deletePosition}
            />
            <Button label="Save" icon="pi pi-check" onClick={savePosition} />
          </div>
        }
        onHide={() => setDisplayDialog(false)}
      >
        {position && (
          <div className="p-grid p-fluid">
            <div className="p-col-4" style={{ padding: ".75em" }}>
              <label htmlFor="name">Name</label>
            </div>
            <div className="p-col-8" style={{ padding: ".5em" }}>
              <InputText
                id="name"
                onChange={e => {
                  updateProperty("name", e.target.value);
                }}
                value={position.name}
              />
            </div>
            <div className="p-col-4" style={{ padding: ".75em" }}>
              <label htmlFor="topic">Topic</label>
            </div>
            <div className="p-col-8" style={{ padding: ".5em" }}>
              <Dropdown
                id="topic"
                options={topics.topics}
                optionLabel="name"
                dataKey="id"
                placeholder="Select a topic"
                onChange={e => {
                  updateProperty("topic", e.value);
                }}
                value={position.topic}
              />
            </div>
          </div>
        )}
      </Dialog>
    </React.Fragment>
  );
}

PositionList.propTypes = {};

export default compose(
  graphql(AdminPositionsQuery, {
    name: "positions",
    options: { fetchPolicy: "network-only" }
  }),
  graphql(AdminTopicsQuery, { name: "topics" }),
  graphql(AdminAddPosition, {
    name: "addPosition",
    options: {
      refetchQueries: [{ query: AdminPositionsQuery }]
    }
  }),
  graphql(AdminUpdatePosition, {
    name: "updatePosition",
    options: {
      refetchQueries: [{ query: AdminPositionsQuery }]
    }
  }),
  graphql(AdminDeletePosition, {
    name: "deletePosition",
    options: {
      update: (proxy, { data: { deletePosition } }) => {
        const { positionsWithLikes } = proxy.readQuery({
          query: AdminPositionsQuery
        });
        proxy.writeQuery({
          query: AdminPositionsQuery,
          data: {
            positionsWithLikes: positionsWithLikes.filter(
              position => position.id !== deletePosition.id
            )
          }
        });
      }
    }
  })
)(PositionList);
