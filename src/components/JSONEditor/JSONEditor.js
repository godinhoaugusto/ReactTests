import React from "react";
import { isArray, isObject, isNumber, isString, isBoolean, merge, cloneDeep } from "lodash";
import JSONViewer from "./JSONViewer";
import { CollapseIcon, isNodeCollapsed, toggleNodeCollapsed } from "./CollapseIcon";
import Textarea from "react-textarea-autosize";

export default class JSONEditor extends React.Component {
  static defaultProps = {
    data: {}, //data to edit
    marginLeftStep: 10, //indentation step for nested objects
    marginBottom: 3, //margin bottom of nodes
    collapsible: true, //whether nodes are collapsible or not
    //this prevents modifying the data you passed in however cloning is expensive especially for large objects
    cloneData: true,
    onChange: null, //data changed handler,
    view: "single", //dual, shows the editor and the json viewer side to side,
    collapsedNodes: {},
    synchronizedCollapse: true //if in dual view when editor is collapsed, viewer is also collapsed
  };

  constructor(props) {
    super(props);
    this.state = {
      data: { root: props.cloneData ? cloneDeep(props.data) : props.data },
      collapsedNodes: this.props.collapsedNodes
    };
  }

  getCollapseIcon(marginLeft, currentKey) {
    let { collapsedNodes } = this.state;
    let { collapsible, marginLeftStep } = this.props;
    return (
      <CollapseIcon
        collapsedNodes={collapsedNodes}
        marginLeft={marginLeft}
        collapsible={collapsible}
        currentKey={currentKey}
        isNodeCollapsed={isNodeCollapsed.bind(this, marginLeft, currentKey, marginLeftStep)}
        toggleNodeCollapsed={toggleNodeCollapsed.bind(this, marginLeft, currentKey, marginLeftStep)}
      />
    );
  }

  dataChanged(key, parent, type, e) {
    let value = this.castToType(e.target.value, type);
    parent[key] = value;
    this.setState(this.state.data);
    if (this.props.onChange) this.props.onChange(key, value, parent, this.state.data.root);
  }

  deleteKey(key, parent, e) {
    e.preventDefault();
    e.stopPropagation();
    e.persist();
    console.log(e);
    console.log("key : ", key);
    console.log("parent : ", parent);
    console.log("event : ", e);
    console.log("event1 : ");

    //
  }

  castToType(value, type) {
    switch (type) {
      case "number":
        return Number(value);
      case "string":
        return String(value);
      case "boolean":
        return value === "true" ? true : false;
      default:
        return value;
    }
  }

  recursiveParseData(currentKey, parentKeyPath, parent, elems, marginLeft) {
    parentKeyPath = parentKeyPath + "_" + currentKey;
    let data = parent[currentKey];
    let label = currentKey;
    let { marginLeftStep } = this.props;
    if (isArray(parent)) {
      label += 1;
      label += ".";
    }
    if (isArray(data)) {
      if (marginLeft > 0) {
        //special case to avoid showing root
        elems.push(
          <ParentLabel
            key={getKey("parent_label", currentKey, parentKeyPath, marginLeft)}
            value={label}
            marginLeft={marginLeft}
            currentKey={currentKey}
            getCollapseIcon={this.getCollapseIcon.bind(this)}
          />
        );
      }

      if (isNodeCollapsed.call(this, marginLeft, currentKey, marginLeftStep)) return; //this node is collapsed

      for (let key = 0; key < data.length; key++) {
        this.recursiveParseData(key, parentKeyPath, data, elems, marginLeft + marginLeftStep);
      }
    } else if (isObject(data)) {
      if (marginLeft > 0) {
        //special case to avoid showing root
        elems.push(
          <ParentLabel
            key={getKey("parent_label", currentKey, parentKeyPath, marginLeft)}
            value={label}
            marginLeft={marginLeft}
            currentKey={currentKey}
            getCollapseIcon={this.getCollapseIcon.bind(this)}
          />
        );
      }

      if (isNodeCollapsed.call(this, marginLeft, currentKey, marginLeftStep)) return; //this node is collapsed

      Object.keys(data).forEach(key => {
        this.recursiveParseData(key, parentKeyPath, data, elems, marginLeft + marginLeftStep);
      });
    } else if (isNumber(data)) {
      elems.push(
        <Input
          key={getKey("input", currentKey, parentKeyPath, marginLeft)}
          marginLeft={marginLeft}
          marginBottom={this.props.marginBottom}
          label={label}
          type="number"
          onChange={this.dataChanged.bind(this, currentKey, parent, "number")}
          value={data}
        />
      );
    } else if (isString(data)) {
      elems.push(
        <TextArea
          key={getKey("input", currentKey, parentKeyPath, marginLeft)}
          marginLeft={marginLeft}
          marginBottom={this.props.marginBottom}
          label={label}
          type="text"
          onChange={this.dataChanged.bind(this, currentKey, parent, "text")}
          deleteKey={this.deleteKey.bind(this, currentKey, parent)}
          value={data}
        />
      );
    } else if (isBoolean(data)) {
      elems.push(
        <Boolean
          key={getKey("boolean", currentKey, parentKeyPath, marginLeft)}
          marginLeft={marginLeft}
          marginBottom={this.props.marginBottom}
          onChange={this.dataChanged.bind(this, currentKey, parent, "boolean")}
          label={label}
          value={data}
        />
      );
    }
  }

  render() {
    let elems = [];
    let { view, collapsible, synchronizedCollapse } = this.props;
    let { data, collapsedNodes } = this.state;
    this.recursiveParseData("root", "", data, elems, 0);
    if (view === "single") {
      return <div style={styles.root}>{elems}</div>;
    } else if (view === "dual") {
      return (
        <div style={styles.dualView}>
          <div style={styles.jsonEditor}>{elems}</div>
          <div style={styles.jsonViewer}>
            <JSONViewer data={data.root} collapsible={collapsible} collapsedNodes={synchronizedCollapse ? collapsedNodes : {}} />
          </div>
        </div>
      );
    }
  }
}

const Input = props => {
  let { marginLeft, marginBottom, label, value, type, onChange } = props;
  let style = merge({ marginLeft, marginBottom }, styles.row);
  return (
    <div style={style}>
      <Label value={label} marginLeft={0} />
      <div style={styles.value}>
        <input style={styles.input} type={type} value={value} onChange={onChange} />
      </div>
    </div>
  );
};

const TextArea = props => {
  let { marginLeft, marginBottom, label, value, type, onChange, deleteKey } = props;
  let style = merge({ marginLeft, marginBottom }, styles.row);

  return (
    <div style={style}>
      <ButtonDelete deleteKey={deleteKey} />

      <Label value={label} marginLeft={5} />
      <div style={styles.value}>
        <Textarea style={styles.textarea} onChange={onChange} value={value} />
      </div>
    </div>
  );
};

const Boolean = props => {
  //Boolean is reserved in javascript, rename to _Boolean?
  let { marginLeft, marginBottom, label, value, onChange } = props;
  let style = merge({ marginLeft, marginBottom }, styles.row);
  return (
    <div style={style}>
      <Label value={label} marginLeft={0} />
      <div style={styles.value}>
        <select style={styles.select} value={value} onChange={onChange}>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>
    </div>
  );
};

const Label = props => {
  let { marginLeft, value } = props;
  let style = merge({ marginLeft }, styles.label);
  return <div style={style}>{value}</div>;
};

const ParentLabel = props => {
  let { marginLeft, value, currentKey, getCollapseIcon } = props;
  let style = merge({ marginLeft: marginLeft, display: "flex" }, styles.label);
  return (
    <div style={style}>
      <div>{value}</div>
      <div style={{ marginLeft: 5 }}>{getCollapseIcon(marginLeft, currentKey)}</div>
    </div>
  );
};

const ButtonDelete = props => {
  const { deleteKey } = props;
  return (
    <div>
      <button onClick={deleteKey}>-</button>
    </div>
  );
};

const getKey = (prefix, currentKey, parentKeyPath, marginLeft) => {
  return `${prefix}_${parentKeyPath}_${currentKey}_${marginLeft}`;
};

const styles = {
  dualView: {
    display: "flex"
  },
  jsonViewer: {
    borderLeft: "1px solid lightgrey",
    width: "50%",
    margin: 10
  },
  jsonEditor: {
    width: "50%",
    fontSize: 12,
    fontFamily: "monospace",
    margin: 10
  },
  label: {
    color: "#c00",
    marginTop: 4,
    width: "50%"
  },
  value: {
    marginLeft: 10,
    width: "50%"
  },
  row: {
    display: "flex",
    justifyContent: "space-between"
  },
  root: {
    fontSize: 12,
    fontFamily: "monospace"
  },
  withChildrenLabel: {
    color: "#a52a2a"
  },
  select: {
    borderRadius: 3,
    borderColor: "#d3d3d3"
  },
  input: {
    borderRadius: 3,
    border: "1px solid #d3d3d3",
    padding: 3
  },
  textarea: {
    // display: "block",
    borderRadius: 5,
    border: "2px solid #d3d3d3",
    padding: 10,
    height: "auto",
    width: "100%"
  }
};
