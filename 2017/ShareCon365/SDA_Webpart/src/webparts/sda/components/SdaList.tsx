import * as React from 'react';
import { getRTL } from 'office-ui-fabric-react/lib/Utilities';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { List } from 'office-ui-fabric-react/lib/List';
import styles from './Sda.module.scss';

import ISdaListItem from '../Model/ISdaListItem';


export interface IListBasicExampleProps {
  items: ISdaListItem[];
}

export class ListBasicExample extends React.Component<IListBasicExampleProps, any> {
  constructor(props: IListBasicExampleProps) {
    super(props);

    this._onFilterChanged = this._onFilterChanged.bind(this);

    this.state = {
      filterText: '',
      items: props.items
    };
  }
  
  componentWillReceiveProps(nextProp){
    this.setState({
      filterText: '',
      items: nextProp.items
    });
  }

  public render() {
    let { items: originalItems } = this.props;
    let { items } = this.state;
    let resultCountText = items.length === originalItems.length ? '' : ` (${items.length} of ${originalItems.length} shown)`;

    return (
      <FocusZone direction={ FocusZoneDirection.vertical }>
        <TextField label={ 'Filter by name' + resultCountText } onBeforeChange={ this._onFilterChanged } />
        <List
          items={ items }
          onRenderCell={ this._onRenderCell }
        />
      </FocusZone>
    );
  }

  private _onFilterChanged(text: string) {
    let { items } = this.props;

    this.setState({
      filterText: text,
      items: text ?
        items.filter(item => item.Title.toLowerCase().indexOf(text.toLowerCase()) >= 0) :
        items
    });
  }

  private _onRenderCell(item: ISdaListItem, index: number | undefined): JSX.Element {    
    return (
      <div className={styles.listItem} data-is-focusable={ true }>        
        <div className={styles.listItem} onClick={            
            ()=>{
              alert(`Element Id: ${item.Id}`);
            }
          }>
          <div className={styles.listItem}>{ item.Title }</div>
        </div>
      </div>
    );
  }
}