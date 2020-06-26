import React from 'react';
import axios from '../core/axios';
import QueryUI from './QueryUI';
import moment from 'moment';
import QuerySimpUI from './QuerySimpUI';

interface Props {
  nodes: Node[];
  onSubmit: (e) => void;
  type?: 'default' | 'simple'
}

class Query extends React.Component<Props, any> {

  static defaultProps = {
    type: 'default'
  }

  constructor(props) {
    super(props)
    
    this.state = { nodes: props.nodes }
    this.state.nodes.map((node: Node) => {
      if (node.type === 'select' || node.type === 'radio') {
        node.optionKey = node.optionKey || { label: 'name', value: 'id' };
        node.options = node.options || [];
        if (node.optionsUrl) {
          axios.post(node.optionsUrl).then(res => {
            // @ts-ignore
            node.options = (node.options).concat(res.result); 
            this.setState({ nodes: this.state.nodes });
          })
        }
      }
      return node;
    });
  }

  onFinish = (values: object) => {
    this.state.nodes.map((node: any) => {
      if (node.type === 'rangepicker') {
        if (values[node.keys[0]]) {
          const [start, end] = values[node.keys[0]]
          values[node.keys[0]] = moment(start).format('yyyy-MM-DD');
          values[node.keys[1]] = moment(end).format('yyyy-MM-DD');;
        } else {
          delete values[node.keys[0]];
        }
      } else if (node.type === 'between') {
        (values[node.keys[0]] === void '0' || values[node.keys[0]] === null) && delete values[node.keys[0]];
        (values[node.keys[1]] === void '0' || values[node.keys[1]] === null) && delete values[node.keys[1]];
      } else {
        (values[node.key] === void '0' || values[node.key] === '' || values[node.key] === null) && delete values[node.key];
      }
      return node;
    });
    this.props.onSubmit(values);
  }

  render() {
    return (
      this.props.type === 'default' ? 
        <QueryUI onFinish={this.onFinish} nodes={this.props.nodes} /> :
        <QuerySimpUI onFinish={this.onFinish} nodes={this.props.nodes} />
    );
  }
}

export default Query;



interface Node {
  label       : string;
  key?         : string;
  type        : string | 'input' | 'select' | 'radio' | 'between' | 'datepicker' | 'rangepicker' | 'radio' | 'monthpicker';
  default?    : any;
  keys?   : string[];
  options?    : any[];
  optionsUrl? : string;
  optionKey?  : OptionsKey;
  ranges?     : Object;
  placeholder?: string | string[];
  isHide?     : boolean;
  isRemove?   : boolean;
  multiple?   : number;
}
interface OptionsKey {
  label: string;
  value: string;
}


// const Query = (props: Props) => {
//   props.nodes.map((node: Node) => {
//     if (node.type === 'select' || node.type === 'radio') {
//       node.optionKey = node.optionKey || { label: 'name', value: 'id' };
//       node.options = node.options || [];
//       if (node.optionsUrl) {
//         // @ts-ignore
//         axios.post(node.optionsUrl).then(res => { node.options = (node.options).concat(res.result); })
//       }
//     }
//     return node;
//   });

//   const onFinish = (values: object) => {
//     props.nodes.map((node: any) => {
//       if (node.type === 'rangepicker') {
//         if (values[node.keys[0]]) {
//           const [start, end] = values[node.keys[0]]
//           values[node.keys[0]] = moment(start).format('yyyy-MM-DD');
//           values[node.keys[1]] = moment(end).format('yyyy-MM-DD');;
//         } else {
//           delete values[node.keys[0]];
//         } 
//       } else if (node.type === 'between') {
//         (values[node.keys[0]] === void '0' || values[node.keys[0]] === null) && delete values[node.keys[0]];
//         (values[node.keys[1]] === void '0' || values[node.keys[1]] === null) && delete values[node.keys[1]];
//       } else {
//         (values[node.key] === void '0' || values[node.key] === '' || values[node.key] === null) && delete values[node.key];
//       }
//       return node;
//     });
//     props.onSubmit(values);
//   }
//   return <QueryUI onFinish={onFinish} nodes={props.nodes} />
// }