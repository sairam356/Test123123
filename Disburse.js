import React from 'react';
import cellEditFactory from 'react-bootstrap-table2-editor';
 import BootstrapTable from 'react-bootstrap-table-next';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Container,Alert,Nav,NavItem,FormGroup,Label, Badge,Row,Col,Card,CardHeader,FormText,CardBlock,Button,Modal, ModalHeader, ModalBody, ModalFooter,Input, InputGroup, InputGroupAddon } from "reactstrap";
import { EditingState } from '@devexpress/dx-react-grid';
import EventEmitter from "react-native-eventemitter"; 
import axios from 'axios';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
   PagingPanel,
} from '@devexpress/dx-react-grid-bootstrap4';


import {
  PagingState,
  IntegratedPaging,
} from '@devexpress/dx-react-grid';
import _ from 'lodash';
const CommandButton = ({
  onExecute, icon, text, hint, color,id
}) => (
  <button
    type="button"

    className="btn btn-link"
    style={{ padding: 11 }}
   
     onClick={(e) => {
      onExecute();
      e.stopPropagation();
    
 
      
    }}
    title={hint}
  >
    <span className={color || 'undefined'}>

      {text}
    </span>
  </button>
);

const AddButton = ({ onExecute }) => (
  <CommandButton icon="plus" text="Add" hint="Create new row" onExecute={onExecute} />
);

const EditButton = ({ onExecute ,id}) => (

  <CommandButton icon="pencil" text="Correct" hint="Edit row" color="text-danger" onExecute={onExecute} id={id} />
);

const DeleteButton = ({ onExecute }) => (
  <CommandButton
    icon="trash"
    hint="Delete row"
    color="text-danger"
    text="Delete"
    onExecute={() => {
      // eslint-disable-next-line
      if (window.confirm('Are you sure you want to delete this row?')) {
        onExecute();
      }
    }}
  />
);

const CommitButton = ({ onExecute }) => (
  <CommandButton icon="check" text="Save" hint="Save changes" color="text-danger" onExecute={onExecute} />
);

const CancelButton = ({ onExecute }) => (
  <CommandButton icon="x" text="Cancel" hint="Cancel changes" color="cancelData" onExecute={onExecute} />
);

const commandComponents = {
  add: AddButton,
  edit: EditButton,
  delete: DeleteButton,
  commit: CommitButton,
  cancel: CancelButton,
};

const editCommand = ({ id, onExecute }) => {
  const ButtonComponent = commandComponents[id];
  return (
    <ButtonComponent
      onExecute={onExecute}
      id={id}
    />
  );
};
const getRowId = row => row.id;
export default class Disburse extends React.Component {
    constructor(props) {
    super(props);
     this.disburse={
         market:'',
         plant:'',
         sloc:'',
         matid:'',
         reel:'',
         radio1:''

     }
     this.dateObject={
          toDate:'',
         fromDate:''
     }
     this.state={
         displayTable: false,
          products:[
      {
         'id':1,
         'name':'laptiop',
         'price':12.5
      },
      {
         'id':2,
         'name':'laptiop2',
         'price':14.5
      }


      ],
      columns: [
      { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car4564646456456', title: 'Car' },
        { name: 'car1', title: 'Car1' },
        { name: 'car2', title: 'Car2' },
        { name: 'car3', title: 'Car3' },
        { name: 'car4', title: 'Car4' },
        { name: 'car5', title: 'Car5' },
        { name: 'car6', title: 'Car6' },
        { name: 'car7', title: 'Car7' },
        { name: 'car8', title: 'Car8' },
        { name: 'car9', title: 'Car9' },
        { name: 'car10', title: 'Car10' },
        { name: 'car11', title: 'Car11' },
        { name: 'car12', title: 'Car12' },
        { name: 'car13', title: 'Car13' },
        { name: 'car14', title: 'Car14' },
        { name: 'car15', title: 'Car15' },
      ],
      columnWidths: [
      
      ],

      tableColumnExtensions: [
      

      ],
      rows:[
      {
         'id':1,
         'name':'laptiop',
         'sex':'M',
         'city':'vij',
         'car':'car'
      },
     {
         'id':2,
         'name':'laptiop',
         'sex':'M',
         'city':'vij',
         'car':'car456'
      },
      {
         'id':3,
         'name':'laptiop',
         'sex':'F',
         'city':'v456ij',
         'car':'car456'
      },
      {
         'id':4,
         'name':'laptiop',
         'sex':'F',
         'city':'v456ij',
         'car':'car456'
      },
      {
         'id':5,
         'name':'laptiop',
         'sex':'F',
         'city':'v456ij',
         'car':'car456'
      },
      {
         'id':6,
         'name':'laptiop',
         'sex':'F',
         'city':'v456ij',
         'car':'car456'
      }



      ],
      editingRowIds: [],
      addedRows: [],

      rowChanges: {}
     }
      this.plant=[];
      this.sloc=[]
     this.handleChangeToDate = this.handleChangeToDate.bind(this);
     this.handleChangeFromDate  = this.handleChangeFromDate.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
     this.handleChange = this.handleChange.bind(this);
     this.changeAddedRows = this.changeAddedRows.bind(this);
    this.changeEditingRowIds = this.changeEditingRowIds.bind(this);
    this.changeRowChanges = this.changeRowChanges.bind(this);
    this.commitChanges = this.commitChanges.bind(this);
    this.saveCommitedChanges = this.saveCommitedChanges.bind(this);
     EventEmitter.on("plantValue", (value)=>{
          this.plant = value;
          this.setState(this.plant)

     });
      EventEmitter.on("slocValue", (value)=>{

         this.sloc = value;
         this.setState(this.sloc);

     });
    
    EventEmitter.on("mmvalue", (value)=>{
 
       if(value){
         this.disburse.market = value.market;
         this.disburse.plant =value.plant;
         this.disburse.sloc = value.sloc;
         this.setState(this.disburse);
          
       }

    });
   
   }
    handleChangeToDate(date){
        this.dateObject.toDate =date;
        this.setState(this.dateObject);
   }
   handleChangeFromDate(date){
       this.dateObject.fromDate =date;
       this.setState(this.dateObject); 
   }
   changeAddedRows(addedRows) {
    const initialized = addedRows.map(row => (Object.keys(row).length ? row : { city: 'Tokio' }));
    this.setState({ addedRows: initialized });
  }

componentDidAmount(){
  console.log("hai")
}


onAfterSaveCell(value, name){
   console.log(value);
   console.log(name);
 }
  changeEditingRowIds(editingRowIds) {
    this.setState({ editingRowIds });
  }

  changeRowChanges(rowChanges) {
    this.setState({ rowChanges });
  }
 //// this function changes 
  commitChanges({ added, changed, deleted }) {
    let { rows } = this.state;

    console.log(added);
  
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      rows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];

      console.log("dfgggggggggggggggggggggggggggggggggggd")
    }
    console.log(changed);
   
    if (changed) {
      rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        this.saveCommitedChanges(changed ,rows);
       this.setState({ rows }); 
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      rows = rows.filter(row => !deletedSet.has(row.id));
    }
    this.setState({ rows });
  }
  /// new function added
  saveCommitedChanges(changed ,rows){
       document.getElementById("loader").style.display = 'block';
         console.log('changed');
        var keys= Object.keys(changed)
       
        var getRowObject = '';
        _.forEach(rows,function(data){
            if(data.id == keys[0]){
                getRowObject = data;
            }
        })
       console.log(getRowObject); /// in row object  data will updated row data  jsut called getRoow

     this.data ={};
     this.data.action = getRowObject.name;
     this.data.invCheckOutId ='';


   axios.post("https://jsonplaceholder.typicode.com/posts?userId=1",this.data).then((response) => {
    
       if(response)
       document.getElementById("loader").style.display = 'none';

      });
     }
   handleChange(event){
       this.disburse[event.target.name] = event.target.value;
       if(event.target.id =='Y' || event.target.id =='N' || event.target.id =='E' ){
           this.disburse.radio1 = event.target.id;
       }
      this.setState(this.disburse);

   }

   clearData = () =>{
        this.disburse={
         market:'',
         plant:'',
         sloc:'',
         matid:'',
         reel:'',
         radio1:false

     } 

       this.dateObject={
          toDate:'',
         fromDate:''
     }

     this.setState(this.disburse);
   }

   handleSubmit(event){
      event.preventDefault();
  
   if(this.disburse.market!='' || this.disburse.sloc!='' || this.dateObject.fromDate!='' || this.dateObject.toDate!=''){
         this.setState({
                    displayTable: true
                });
         console.log(this.state.rows)
        _.forEach(this.state.rows,function(data){
            if(data.sex =='F'){
                  
             console.log(data);
            }


        })
          var data = _(this.dateObject).clone();
          var date = new Date(data.fromDate);
          var newData       = date.getFullYear() + '-' + Number(date.getMonth() + 1) + '-' + date.getDate();
           var date1 = new Date(data.toDate);
          var newData1       = date1.getFullYear() + '-' + Number(date1.getMonth() + 1) + '-' + date1.getDate();
          console.log(newData);
          console.log(newData1);

          // intergertate  newData, newData1   assign to requestObject 

   }
   
   }
  render() {
    const {
      rows, columns, tableColumnExtensions, editingRowIds, rowChanges, addedRows,
    } = this.state;

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true,
  clickToEdit: true  // Click to edit cell also
};

const cellEdit = {
  mode: 'click'
};
    return (
  <div className="disburse_width mm_bottom"> 

<p className="test" style={{textAlign: 'left',marginLeft: '3rem',color: '#a60606'}}> <b> Search</b> </p>
      <Row className="test">
           
            <Col md="4">
               <InputGroup>
                   <div style={{width: '140px'}} className="text-right mr-3">Market: </div>                                         
                   <Input className="" style={{marginLeft: '20px'}} type="text"  value={this.disburse.market} onChange={this.handleChange} name="market" placeholder="" id="1"/>                               
                 </InputGroup>
            </Col> 
            <Col md="4">
               <InputGroup>
                   <div style={{width: '140px'}} className="text-right mr-3">Plant: </div>                                         
                   <Input className="" style={{marginLeft: '20px'}} type="select"  value={this.disburse.plant} onChange={this.handleChange} name="plant" placeholder="" id="2"> 
                     {this.plant.map((item,index) =>( <option key={index} value={item.sloc}>{item.plant}</option> ))}      
                    </Input>                        
                 </InputGroup>
            </Col> 
            <Col md="4">
               <InputGroup>
                   <div style={{width: '140px'}} className="text-right mr-3">Sloc: </div>                                         
                   <Input className="" style={{marginLeft: '20px'}} type="select"  value={this.disburse.sloc} onChange={this.handleChange} name="sloc" placeholder="" id="3">
                     {this.sloc.map((item,index) =>( <option key={index} value={item.sloc}>{item.sloc}</option> ))}      
                     </Input>                         
                 </InputGroup>
            </Col>     
            
        </Row>
        <Row className="test">
           
            <Col md="4">
               <InputGroup>
                   <div style={{width: '140px'}} className="text-right mr-3">Reel: </div>                                         
                   <Input className="" style={{marginLeft: '20px'}} type="text"  value={this.disburse.reel} onChange={this.handleChange} name="reel" placeholder="" id="4"/>                               
                 </InputGroup>
            </Col> 
            <Col md="4">
               <InputGroup>
                   <div style={{width: '140px'}} className="text-right mr-3">MatID: </div>                                         
                   <Input className="" style={{marginLeft: '20px'}} type="text"  value={this.disburse.matid} onChange={this.handleChange} name="matid" placeholder="" id="5"/>                               
                 </InputGroup>
            </Col> 
                
            
        </Row>
        <Row className="test">
            <Col md="4">
               
                  <InputGroup>
                     <div style={{width: '140px'}} className="text-right mr-3">Start Date : </div>                                         
                   <DatePicker className="ml-20"
                       selected={this.dateObject.toDate}
                        onChange={this.handleChangeToDate}
                        placeholderText="MM-DD-YYYY"
                       />                                
                 </InputGroup>                                      
            </Col> 
            <Col md="4">

                 <InputGroup>
                     <div style={{width: '140px'}} className="text-right mr-3">End Date : </div>                                   
                 <DatePicker className="ml-20"
                          selected={this.dateObject.fromDate}
                          onChange={this.handleChangeFromDate}
                          placeholderText="MM-DD-YYYY"
                          />                               
                 </InputGroup>  
                                                     
            </Col>
        </Row>
 <Row className="test">

            <Col md="3" style={{textAlign: 'left',paddingLeft: '6.5rem'}}>
                <p>Show Status</p>

            </Col>
            <Col md="6" style={{textAlign: 'left',marginLeft: '-100px'}}>
                <FormGroup tag="fieldset">
          
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" id="Y" value= {this.disburse.radio1} onChange={this.handleChange}/>{' '}
               Success
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" id="N"  value={this.disburse.radio1} onChange={this.handleChange}/>{' '}
               Error 
            </Label>
          </FormGroup>
          <FormGroup check disabled>
            <Label check>
              <Input type="radio" name="radio1" id="E" value={this.disburse.radio1} onChange={this.handleChange} />{' '}
               Both
            </Label>
          </FormGroup>
        </FormGroup>

            </Col>
            </Row>

       { /*<Col md="12" style={{textAlign: 'right'}}>
                   <Button  color="primary"   onClick={this.handleSubmit}>Search</Button>
                                   
               </Col>*/}
        <Col md="4" style={{marginTop: '2rem'}}>
       <Button style={{marginRight: '20px', backgroundColor:'#a70606',borderColor: '#a70606'}} color="primary"   className="save_button" onClick={this.handleSubmit}>Search</Button>
        <Button  color="primary"  style={{backgroundColor: '#b1aeae', borderColor: '#b1aeae'}} className="save_button" onClick={this.clearData}>Clear</Button>
        </Col>
        
    <hr style={{width: '105%'}}/>
        

    {this.state.displayTable ?
       <div>
        <p className="test" style={{textAlign: 'left',marginLeft: '3rem',color: '#a60606'}}> <b> List  of Disbursements</b> </p>
       <div className="row pb-4 px-5">
       <div className="col-12 grid-table">
        <Grid className=""
          rows={rows}
          columns={columns}
          getRowId={getRowId}
        >
          <PagingState
            defaultCurrentPage={0}
            pageSize={5}
          />
          <IntegratedPaging />
          <EditingState
            editingRowIds={editingRowIds}
            onEditingRowIdsChange={this.changeEditingRowIds}
            rowChanges={rowChanges}
            onRowChangesChange={this.changeRowChanges}
            onCommitChanges={this.commitChanges}
          />
          <Table
            columnExtensions={tableColumnExtensions}
          />
          <TableHeaderRow />
          <TableEditRow />
          <TableEditColumn
            showEditCommand
            commandComponent={editCommand}
          />
            <PagingPanel />
        </Grid>
        </div>
      </div></div>:" "}

  </div>
    );
  }
}


