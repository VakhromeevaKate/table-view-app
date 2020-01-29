import React, { PureComponent } from 'react';
import { getList } from '../services/loadListService';
import { Virtuoso } from 'react-virtuoso';
import './List.css';

interface IListState {
    loading: boolean;
    list: Array<string>;
    selectedRow: number | null;
}

export default class List extends PureComponent <any, IListState> {

  constructor(props: any) {
    super(props);
    const row = localStorage.getItem('selectedRowNumber');
    this.state = {
      list: [],
      loading: false,
      selectedRow: row ? parseInt(row, 0) : null
    };
  }

  componentDidMount = async () => {
      this.setState({ loading: true })
      try {
          const list = await getList();
          if (list) {
              this.setState({ list });
          }
      }
      catch(error) {
          console.log(error)
      }
      finally {
          this.setState({ loading: false })
      }
  }

  handleRowSelection = (e: React.MouseEvent, index: number) => {
    localStorage.setItem('selectedRowNumber', index.toString());
    this.setState({
      selectedRow: index
    })
  };

  renderRow = (data: string, index: number) => {
    const { selectedRow } = this.state;
    return ( <div
      className={selectedRow === index ? 'row selectedRow' : 'row'}
      onClick={(e) => this.handleRowSelection(e, index)}
    >
      {data}
    </div> );
  };

  render() {
    const {
      list, loading
    } = this.state;
      return (
        <div>
          {loading ? 'Загрузка данных...' : 
            <Virtuoso
              className='list'
              totalCount={list.length}
              item={index => this.renderRow(list[index], index)}
            />
          }
        </div>
      );
  }
}
