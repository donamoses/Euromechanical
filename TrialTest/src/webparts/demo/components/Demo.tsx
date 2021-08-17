import * as React from 'react';
import styles from './Demo.module.scss';
import { IDemoProps } from './IDemoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from "@pnp/sp/presets/all";
import "@pnp/sp/sites";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { FilePicker, IFilePickerResult } from '@pnp/spfx-controls-react/lib';
export default class Demo extends React.Component<IDemoProps, {}> {
  public async componentDidMount() {
    const allItems: any[] = await sp.web.lists.getByTitle("Metadata").items.get();
    console.log(allItems);
    }
    private _handleFileUpload(file: IFilePickerResult[]){
      if (file[0].fileAbsoluteUrl == null) {  
        this.setState({
          Document: file[0]
        });
      }
    }
  public render(): React.ReactElement<IDemoProps> {
    return (
      <div className={ styles.demo }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
            <FilePicker
            label={'Upload a Document'}
            buttonClassName={styles.button}
            buttonLabel={'Upload'}
            buttonIcon="FileImage"
            onSave={this._handleFileUpload}
            onChange={this._handleFileUpload} 
            context={this.props.context}
          />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
