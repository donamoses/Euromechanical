import * as React from 'react';
import styles from './CreateDocument.module.scss';
import { ICreateDocumentProps } from './ICreateDocumentProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Checkbox, DatePicker, DefaultButton, DialogFooter, Dropdown, Icon, IDropdownOption, ITooltipHostStyles, Label, MessageBar, MessageBarType, PrimaryButton, TextField, TooltipHost } from 'office-ui-fabric-react';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { sp } from '@pnp/sp/presets/all';
import "@pnp/sp/sites";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/site-users/web";
import { Web } from "@pnp/sp/webs";
import { IAttachmentFileInfo } from "@pnp/sp/attachments";
import * as moment from 'moment';
import SimpleReactValidator from 'simple-react-validator';
const calloutProps = { gapSpace: 0 };
const hostStyles: Partial<ITooltipHostStyles> = { root: { display: 'inline-block' } };
const MyIcon = () => <Icon iconName="TextDocumentSettings" />;
export interface ICreateDocumentState {
    saving: boolean;
    depOptions: any[];
    docCategoryOptions: any[];
    docs: any[];
    addUsers: any[];
    value: any;
    allItemss: any[];
    key: any;
    deptkey: any;
    verifierid: any;
    approverid: any;
    docRespId: any;
    tkey: any;
    setverifier: string;
    setapprover: string;
    // firstDayOfWeek?: DayOfWeek;
    expiredate: any;
    showProgress: boolean;
    progressLabel: string;
    progressDescription: string;
    progressPercent: any;
    userdept: any;
    depttext: any;
    siteurl: any;
    title: any;
    DocumentAdded: any;
    hideDirectPublish: string;
    approvalDate: any;
    hideaAppDatePic: string;
    ExpiryLeadPeriod: string;
    hideExpLeadPeriod: string;
    directPublihCheck: boolean;
    businessUnit: string;
    category: string;
    subCategory: string;
    bUkey: string;
    publishOptionKey: string;
    categoryKey: string;
    subCategoryKey: string;
    publishOption: string;
    hideProject:boolean;
    dcc: any;
}
export default class CreateDocument extends React.Component<ICreateDocumentProps, ICreateDocumentState, any> {
    private validator: SimpleReactValidator;
    constructor(props: ICreateDocumentProps) {
        super(props);
        this.state = {
            saving: false,
            depOptions: [],
            docCategoryOptions: [],
            docs: [],
            addUsers: [],
            showProgress: false,
            progressLabel: "File upload progress",
            progressDescription: "",
            progressPercent: 0,
            value: "",
            allItemss: [],
            key: "",
            deptkey: "",
            verifierid: "",
            approverid: "",
            docRespId: "",
            tkey: "",
            setverifier: "",
            setapprover: "",
            expiredate: "",
            userdept: "",
            depttext: "",
            siteurl: "",
            title: "",
            DocumentAdded: 'none',
            hideDirectPublish: 'none',
            approvalDate: "",
            hideaAppDatePic: "none",
            ExpiryLeadPeriod: "",
            hideExpLeadPeriod: "none",
            directPublihCheck: false,
            businessUnit: "",
            category: "",
            subCategory: "",
            bUkey: "",
            publishOptionKey: "",
            categoryKey: "",
            subCategoryKey: "",
            publishOption: "",
            hideProject:true,
            dcc: "",
        };

        this._drpdwnDocCateg = this._drpdwnDocCateg.bind(this);
        this._drpdwnDepCateg = this._drpdwnDepCateg.bind(this);
        this._drpdwnSubCateg = this._drpdwnSubCateg.bind(this);
        this._drpdwnPublishFormat = this._drpdwnPublishFormat.bind(this);
        this._drpdwnBUCateg = this._drpdwnBUCateg.bind(this);
        this._onCancel = this._onCancel.bind(this);
        this.templatechange = this.templatechange.bind(this);
        this._titleValidation = this._titleValidation.bind(this);
        this._onCreateDocChecked = this._onCreateDocChecked.bind(this);
    }
    public async componentDidMount() {

       
        console.log(this.props.project);
        if (this.props.project) {
          this.setState({ hideProject: false });
        }
      }

    public componentWillMount = () => {
        this.validator = new SimpleReactValidator({
            messages: {
                required: "Please enter mandatory fields"
            }
        });

    }
    
    public _titleValidation = () => {

        let titlemsg = ((document.getElementById("t1") as HTMLInputElement).value);
        let titleformat = /^[A-Za-z0-9\s]*$/;
        if (titlemsg.match(titleformat)) {
            document.getElementById("msg").style.display = 'none';
        }
        else {
            document.getElementById("msg").style.display = 'inline';

        }

    }
    private _titleChange = (ev: React.FormEvent<HTMLInputElement>, Title?: string) => {
        this.setState({ title: Title || '' });
    }
    public _drpdwnDocCateg(option: { key: any; text: any }) {
        //console.log(option.key);
        this.setState({ categoryKey: option.key, category: option.text });
    }
    public _drpdwnSubCateg(option: { key: any; text: any }) {
        //console.log(option.key);
        this.setState({ subCategoryKey: option.key, subCategory: option.text });
    }
    public _drpdwnBUCateg(option: { key: any; text: any }) {
        //console.log(option.key);
        // alert(option.text);
        this.setState({ bUkey: option.key, businessUnit: option.text });
    }
    public _drpdwnPublishFormat(option: { key: any; text: any }) {
        //console.log(option.key);
        this.setState({ publishOptionKey: option.key, publishOption: option.text });
    }
    public _drpdwnDepCateg = async (option) => {
        console.log(option.key);
        this.setState({
            deptkey: option.key,
            depttext: option.text
        });

        const items: any[] = await sp.web.lists.getByTitle(this.props.DepartmentlistName).items.select("Approver/Title", "Approver/Id", "Verifier/Title", "Verifier/Id").expand("Approver", "Verifier").filter("substringof('" + option.text + "',DepartmentName)").get();
        console.log(items);
        console.log(items[0].Approver.Title);
        this.setState({ setapprover: items[0].Approver.Title });
        this.setState({ setverifier: items[0].Verifier.Title });
        this.setState({ verifierid: items[0].Verifier.Id });
        this.setState({ approverid: items[0].Approver.Id });
    }
    public _getDocResponsible = (items: any[]) => {
        console.log(items);
        let getSelectedUsers = [];
        for (let item in items) {
            getSelectedUsers.push(items[item].id);
        }
        this.setState({ docRespId: getSelectedUsers[0] });
        console.log(getSelectedUsers);


    }
    public _Verifier = (items: any[]) => {

        console.log(items);
        let getSelectedUsers = [];

        for (let item in items) {
            getSelectedUsers.push(items[item].id);
        }
        this.setState({ verifierid: getSelectedUsers[0] });
        console.log(getSelectedUsers);
        //this.setState({ addUsers: getSelectedUsers });
        //console.log(this.state.addUsers);

        //console.log('Items:', items);

    }
    public _Approver = (items: any[]) => {

        console.log(items);
        let getSelectedUsers = [];

        for (let item in items) {
            getSelectedUsers.push(items[item].id);
        }
        this.setState({ approverid: getSelectedUsers[0] });
        console.log(getSelectedUsers);
        //this.setState({ addUsers: getSelectedUsers });
        //console.log(this.state.addUsers);

        //console.log('Items:', items);

    }
    private _onExpDatePickerChange = (date?: Date): void => {

        this.setState({ expiredate: date, hideExpLeadPeriod: "" });

    }
    private _onApprovalDatePickerChange = (date?: Date): void => {

        this.setState({ approvalDate: date, });

    }
    public templatechange(option: { key: any; }) {
        //console.log(option.key);
        this.setState({ tkey: option.key });
    }
    private fileUpload = () => {
        let fileInfos: IAttachmentFileInfo[] = [];
        let input = document.getElementById("myfile") as HTMLInputElement;
        var fileCount = input.files.length;
        console.log(fileCount);
        for (var i = 0; i < fileCount; i++) {
            var fileName = input.files[i].name;
            console.log(fileName);
            var file = input.files[i];
            var reader = new FileReader();
            reader.onload = ((fileN => {
                return (e) => {
                    console.log(fileN.name);
                    //Push the converted file into array
                    fileInfos.push({
                        "name": file.name,
                        "content": e.target.result,
                    });
                    console.log(fileInfos);
                };
            }))(file);
            reader.readAsArrayBuffer(file);
        }
        //End of for loop
    }

    private _onCreateDocChecked = (ev: React.FormEvent<HTMLInputElement>, isChecked?: boolean) => {
        if (isChecked) { this.setState({ hideDirectPublish: "", }); }
        else if (!isChecked) {
            this.setState({ hideDirectPublish: "none", hideaAppDatePic: "none", });
            if (this.state.directPublihCheck == true) {
                this.setState({
                    directPublihCheck: false,
                });
            }
        }
    }
    private _onDirectPublishChecked = (ev: React.FormEvent<HTMLInputElement>, isChecked?: boolean) => {
        if (isChecked) { this.setState({ hideaAppDatePic: "", directPublihCheck: true }); }
        else if (!isChecked) { this.setState({ hideaAppDatePic: "none", directPublihCheck: false }); }
    }

    private _onCreateDocument = () => {
        if (this.validator.fieldValid("Name") && this.validator.fieldValid("category") && this.validator.fieldValid("subCategory") && this.validator.fieldValid("businessUnit") && (this.state.directPublihCheck == false) || this.validator.fieldValid("depatment")) {

            this.validator.hideMessages();
            this.setState({ DocumentAdded: "" });
            setTimeout(() => this.setState({ DocumentAdded: 'none' }), 1000);


            // this._onCancel();
        }
        else if (this.validator.fieldValid("Name") && this.validator.fieldValid("category") && this.validator.fieldValid("subCategory") && this.validator.fieldValid("businessUnit") && (this.state.directPublihCheck == true) && this.validator.fieldValid("publishFormat")) {
            this.validator.hideMessages();
            this.setState({ DocumentAdded: "" });
            setTimeout(() => this.setState({ DocumentAdded: 'none' }), 1000);
        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
        }

    }
    private _onCancel = () => {
        // window.location.href = this.props.RedirectUrl;
        this.setState({
            hideExpLeadPeriod: "none",
            title: "",
            DocumentAdded: 'none',
            hideDirectPublish: 'none',
            approvalDate: "",
            hideaAppDatePic: "none",
            ExpiryLeadPeriod: "",
            directPublihCheck: false,
            businessUnit: "",
            category: "",
            subCategory: "",
            bUkey: "",
            publishOptionKey: "",
            categoryKey: "",
            subCategoryKey: "",
            publishOption: "",
        });
    }

    public render(): React.ReactElement<ICreateDocumentProps> {
        const BusinessUnit: IDropdownOption[] = [

            { key: '1', text: 'BU1' },
            { key: '2', text: 'BU2' },

        ];
        const Category: IDropdownOption[] = [

            { key: '1', text: 'Cat1' },
            { key: '2', text: 'Cat2' },

        ];
        const SubCategory: IDropdownOption[] = [

            { key: '1', text: 'SubCat1' },
            { key: '2', text: 'SubCat2' },

        ];
        const publishFormat: IDropdownOption[] = [

            { key: '1', text: 'Native' },
            { key: '2', text: 'PDF' },

        ];
        const depOptions: IDropdownOption[] = [

            { key: '1', text: 'HR' },
            { key: '2', text: 'Marketing' },

        ];
        return (
            <div className={styles.createDocument}>
                <div style={{ marginLeft: "auto", marginRight: "auto", width: "35rem" }}>
                    <div className={styles.alignCenter}> Create Document</div>
                    <div style={{ display: this.state.DocumentAdded }}>
                        <MessageBar messageBarType={MessageBarType.success} isMultiline={false}>  Document Saved Successfully.</MessageBar>
                    </div>


                    < TextField required id="t1"
                        label="Title"
                        onKeyUp={this._titleValidation}
                        onChange={this._titleChange}
                        value={this.state.title} style={{ width: "49.5rem" }}></TextField>
                    <div style={{ color: "#dc3545" }}>{this.validator.message("Name", this.state.title, "required|alpha_num_space")}{" "}</div>



                    <Dropdown id="t3" label="Business Unit"
                        required={true}
                        selectedKey={this.state.bUkey}
                        placeholder="Select an option"
                        options={BusinessUnit}
                        onChanged={this._drpdwnBUCateg} />
                    <div style={{ color: "#dc3545" }}>{this.validator.message("businessUnit", this.state.businessUnit, "required")}{" "}</div>
                    <Dropdown id="t3" label="Department"
                        required={true}
                        selectedKey={this.state.deptkey}
                        placeholder="Select an option"
                        options={depOptions}
                        onChanged={this._drpdwnDepCateg} />
                    <div style={{ color: "#dc3545" }}>{this.validator.message("department", this.state.deptkey, "required")}{" "}</div>

                    <Dropdown id="t2" required={true} label="Category"
                        placeholder="Select an option"
                        selectedKey={this.state.categoryKey}
                        options={Category}
                        onChanged={this._drpdwnDocCateg} />
                    <div style={{ color: "#dc3545" }}>{this.validator.message("category", this.state.category, "required")}{" "}</div>

                    <Dropdown id="t2"  label="Sub Category"
                        placeholder="Select an option"
                        selectedKey={this.state.subCategoryKey}
                        options={SubCategory}
                        onChanged={this._drpdwnSubCateg} />
                    <div style={{ color: "#dc3545" }}>{this.validator.message("subCategory", this.state.subCategory, "required")}{" "}</div>

                    <PeoplePicker
                        context={this.props.context}
                        titleText="Originator"
                        personSelectionLimit={1}
                        groupName={""} // Leave this blank in case you want to filter from all users    
                        showtooltip={true}
                        required={false}
                        disabled={false}
                        ensureUser={true}
                        onChange={this._getDocResponsible}
                        showHiddenInUI={false}
                        principalTypes={[PrincipalType.User]}
                        resolveDelay={1000} />
                    <PeoplePicker
                        context={this.props.context}
                        titleText="Reviewer(s)"
                        personSelectionLimit={8}
                        groupName={""} // Leave this blank in case you want to filter from all users    
                        showtooltip={true}
                        required={false}
                        disabled={false}
                        ensureUser={true}
                        onChange={this._Verifier}
                        showHiddenInUI={false}
                        principalTypes={[PrincipalType.User]}
                        // defaultSelectedUsers={[this.state.setverifier]}
                        resolveDelay={1000} />
                    <PeoplePicker
                        context={this.props.context}
                        titleText="Approver"
                        personSelectionLimit={3}
                        groupName={""} // Leave this blank in case you want to filter from all users    
                        showtooltip={true}
                        required={false}
                        disabled={false}
                        ensureUser={true}
                        onChange={this._Approver}
                        showHiddenInUI={false}
                        // defaultSelectedUsers={[this.state.setapprover]}
                        principalTypes={[PrincipalType.User]}
                        resolveDelay={1000} />
                        <div  hidden={this.state.hideProject}>
                         <PeoplePicker
                            context={this.props.context}
                            titleText="DCC"
                            personSelectionLimit={1}
                            groupName={""} // Leave this blank in case you want to filter from all users    
                            showtooltip={true}
                            disabled={false}
                            ensureUser={true}
                            // selectedItems={this._getVerifier}
                            defaultSelectedUsers={[this.state.dcc]}
                            showHiddenInUI={false}
                            // isRequired={true}
                            principalTypes={[PrincipalType.User]}
                            resolveDelay={1000}
                            />
                        </div>                    
                    <Label >Select a Template:</Label> 
                     <Dropdown id="t7"
                        placeholder="Select an option"
                        options={this.state.docs} onChanged={this.templatechange}
                    />
                    <Label >Upload Document:</Label> <input type="file" id="myfile" ></input>
                    <div style={{ padding: "14px 0px 0 0",display:"flex"}} >
                        <TooltipHost
                            content="Check if the template or attachment is added"
                            //id={tooltipId}
                            calloutProps={calloutProps}
                            styles={hostStyles}>
                            <Checkbox label="Create Document ? " boxSide="end" onChange={this._onCreateDocChecked} />
                        </TooltipHost>
                        <div style={{ display: this.state.hideDirectPublish, padding: "0px 0 0 18px" }}>
                        <TooltipHost
                                        content="The document to published library without sending it for review/approval"
                                        //id={tooltipId}
                                        calloutProps={calloutProps}
                                        styles={hostStyles}>
                                        <Checkbox label="Direct Publish ? " boxSide="end" onChange={this._onDirectPublishChecked} checked={this.state.directPublihCheck} />
                                    </TooltipHost>
                        </div>
                    </div>

                   
                       <div style={{ display: this.state.hideaAppDatePic, padding: "0 0 24px 0px" }}>
                        <table>
                            <tr>                            
                               <td >
                                    <div style={{ display: "flex", }}>
                                       <td> <DatePicker label="Approved Date"
                                            style={{ width: '200px' }}
                                            value={this.state.approvalDate}
                                            onSelectDate={this._onApprovalDatePickerChange}
                                            placeholder="Select a date..."
                                            ariaLabel="Select a date"
                                        />
                                        </td>
                                        <td>
                                        <Dropdown id="t2" required={true}
                                            label="Publish Option"
                                            selectedKey={this.state.publishOptionKey}
                                            placeholder="Select an option"
                                            options={publishFormat}
                                            onChanged={this._drpdwnPublishFormat} style={{ padding: " 0 0 0 15px" }} />
                                        <div style={{ color: "#dc3545" }}>{this.validator.message("publishFormat", this.state.publishOptionKey, "required")}{" "}</div>
                                        </td>
                                    </div>
                                </td>
                            </tr>
                        </table>
                        </div>
                   
                    <div style={{ display: "flex" }}>
                        <div>
                            <DatePicker label="Expiry Date"
                                style={{ width: '200px' }}
                                value={this.state.expiredate}
                                onSelectDate={this._onExpDatePickerChange}
                                placeholder="Select a date..."
                                ariaLabel="Select a date"
                            />
                        </div>
                        <div style={{ padding: " 0 0 0 19px", display: this.state.hideExpLeadPeriod }}>
                            < TextField id="ExpiryLeadPeriod"
                                label="Expiry Lead  Period"
                                onKeyUp={this._titleValidation}
                                onChange={this._titleChange}
                                value={this.state.ExpiryLeadPeriod} >
                            </TextField>
                        </div>
                    </div>
                    <div style={{ padding: "9px 0 0 0" }}>
                        <TooltipHost
                            content="Is the document is Critical"
                            //id={tooltipId}
                            calloutProps={calloutProps}
                            styles={hostStyles}>
                            <Checkbox label="Critical Document ? " boxSide="end" style={{color:"red" }} />
                        </TooltipHost>
                    </div>

                    <DialogFooter>
                        <table style={{ float: "right" }}>
                            <tr>
                                <div>
                                    <td style={{ display: "flex" }}>
                                        <Label style={{ color: "red", fontSize: "23px" }}>*</Label>
                                        <label style={{ fontStyle: "italic", fontSize: "12px" }}>fields are mandatory </label>
                                    </td>
                                    <DefaultButton style={{ float: "right", borderRadius: "10px", border: "1px solid gray" }} text="Cancel" onClick={this._onCancel}></DefaultButton >
                                    <DefaultButton style={{ float: "right", marginRight: "10px", borderRadius: "10px", border: "1px solid gray" }} text="Submit" onClick={this._onCreateDocument} />

                                </div>
                            </tr>

                        </table>
                    </DialogFooter>

                </div>
            </div>
        );
    }
}
