import { IInputs, IOutputs } from "./generated/ManifestTypes";
import {ApplicationProgress, IApplicationProgressBarProps} from "./ApplicationProgressBar";
import * as React from "react";

interface IOptionSetMetaData{
    label : string;
    value : number;
}

export class ApplicaionProgress implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;
    private maxRange : number;
    private Options : ComponentFramework.PropertyHelper.OptionMetadata[] | undefined;
    private OptionSet : IOptionSetMetaData[];
    private selectedValue : number;
    /**
     * Empty constructor.
     */
    constructor() {
        // Empty
    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.maxRange = 100;
        this.Options = context.parameters.StageField.attributes?.Options;
        this.OptionSet = [];
        // this.Options?.forEach(opt =>{
        //     this.OptionSet.push({label: opt.Label, value: opt.Value})
        // });
        this.OptionSet = this.Options?.map(optn =>({label: optn.Label, value: optn.Value}))??[];
        this.selectedValue = context.parameters.StageField.raw ?? -1;
        this.notifyOutputChanged = notifyOutputChanged;
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        let props : IApplicationProgressBarProps; 
        if(this.selectedValue == -1 || this.selectedValue == 0){
            props = {stageName: 'Not Started!',x: 0,y:this.maxRange,}
        }else{
            props = this.OptionSet != null && this.OptionSet != undefined ? {stageName:this.OptionSet[this.selectedValue-1].label,x: (this.selectedValue/this.OptionSet.length)*100, y: this.maxRange} : {stageName:'Not Started',x: 0,y:this.maxRange};
        }
        return React.createElement(
            ApplicationProgress,props
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return { };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
