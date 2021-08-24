import React, {Fragment, useMemo}  from 'react';
import Table from '../table/table';
import Form from '../form/form';
import Panel from './panel';
import Message from '../message/message';
const TableForm = (props) =>{
    const {
        modelDefinition,
        modelRaws,
        message,
        editAction,
        editRaw,
        cancelEdit,
        updateRaw,
        deleteAction,
        deleteRaw,
        cancelDelete,
        deleteRawConfirm,
        createRaw,
        model
    } = props;
    const headerDefinition = useMemo(()=>modelDefinition.filter(item=>!item?.noSHow).map(item=>item.headerName),[modelDefinition]);
    const tableDefinition = useMemo(()=>modelDefinition.map(item=>{return {source:item.source,type:item.type}}),[modelDefinition])
    let formPanelClasses, formPanelTitle;
    if(editAction.status){
      formPanelClasses="is-warning";
      formPanelTitle="Editing ID#" + editAction.raw.id; 
    }
    if(deleteAction.status){
      formPanelClasses="is-danger";
      formPanelTitle="Deleting ID#" + deleteAction.raw.id; 
    }
    if(!editAction.status && !deleteAction.status){
      formPanelClasses="is-info";
      formPanelTitle="Create New "+ model.slice(0,model.length-1); 
    }
    return (
        <Fragment>
          <Message message={message} />
          <div className="columns">
            <div className="column is-two-third view-port">
              <Panel label={model} classes="is-info">
                <div className="table-container">
                  <Table
                    classes="table is-fullwidth is-hoverable"
                    tableDefinition={tableDefinition}
                    headerDefinition={headerDefinition}
                    data={modelRaws}
                    allowEdit={editRaw}
                    allowDelete={deleteRaw}
                  />
                </div>
              </Panel>
            </div>
            <div className="column is-one-third">
              <Panel
                label={formPanelTitle}
                classes={formPanelClasses}
              >
                <Form
                  formDefinition={modelDefinition}
                  editAction={editAction}
                  cancelEdit={cancelEdit}
                  updateRaw={updateRaw}
                  deleteAction={deleteAction}
                  cancelDelete={cancelDelete}
                  deleteRawConfirm={deleteRawConfirm}
                  createRaw={createRaw}
                />
              </Panel>
            </div>
          </div>
        </Fragment>
      );
}
export default TableForm;