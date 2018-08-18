import * as React from 'react';
import {Modal} from 'react-bootstrap';
import AceEditor from 'react-ace';

import 'brace/theme/chrome';
import logo from '../../assets/img/logo.png';
import {CSSProperties} from "react";

const logoStyle: CSSProperties = {
    height: 50,
    marginBottom: 15
};

const modalBodyStyle: CSSProperties = {
    height: 200
};

interface SourceCodeProps {
    show: boolean
    onHide: (() => void)
}

interface GenericSourceCodeProps {
    title: string
    sourceCode: string
    show: boolean
    onHide: (() => void)
}

const SourceCode = (props: GenericSourceCodeProps) => (
    <Modal show={props.show || false} onHide={props.onHide}>
        <Modal.Header closeButton>
            <h2>{props.title}</h2>
        </Modal.Header>
        <Modal.Body style={modalBodyStyle}>
            <AceEditor
                mode="java"
                theme="chrome"
                value={props.sourceCode}
                height="160px"
                width="100%"
                readOnly={true}
                fontSize={14}
                editorProps={{$blockScrolling: true}}
            />
        </Modal.Body>
        <Modal.Footer>
            <div className="col-md-offset-4 col-md-4">
                <img src={logo} className="img-responsive" style={logoStyle} />
            </div>
        </Modal.Footer>
    </Modal>
);


const WeightedGraphSourceCode = (props: SourceCodeProps) => (
    <SourceCode
        title={"WeightedGraph"}
        sourceCode={`public class WeightedGraph {
    public WeightedGraphNode[] nodes;
    public WeightedGraphEdge[] edges;
}

public class WeightedGraphNode {
    public String name;
}

public class WeightedGraphEdge {
    public String from;
    public String to;
    public int weight;
}`}
        show={props.show}
        onHide={props.onHide}
    />
);

const TreeNodeSourceCode = (props: SourceCodeProps) => (
    <SourceCode
        title={"TreeNode"}
        sourceCode={`public class TreeNode {
    public int data;
    public TreeNode left;
    public TreeNode right;

    public TreeNode(int data) {
        this(data, null, null);
    }

    public TreeNode(int data, TreeNode left, TreeNode right) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}`}
        show={props.show}
        onHide={props.onHide}
    />
);

const PairSourceCode = (props: SourceCodeProps) => (
    <SourceCode
        title={"Pair"}
        sourceCode={`public class Pair {
    public Object first;
    public Object second;
}`}
        show={props.show}
        onHide={props.onHide}
    />
);

const ListNodeSourceCode = (props: SourceCodeProps) => (
    <SourceCode
        title={"ListNode"}
        sourceCode={`public class ListNode {
    public int value;
    public ListNode next;

    public ListNode(int value) {
        this.value = value;
    }
}`}
        show={props.show}
        onHide={props.onHide}
    />
);

const IntervalSourceCode = (props: SourceCodeProps) => (
    <SourceCode
        title={"Interval"}
        sourceCode={`public class Interval {
    public int start;
    public int end;

    public Interval(int start, int end) {
        this.start = start;
        this.end = end;
    }
}`}
        show={props.show}
        onHide={props.onHide}
    />
);

const GraphNodeSourceCode = (props: SourceCodeProps) => (
    <SourceCode
        title={"GraphNode"}
        sourceCode={`public class GraphNode {
    public String name;
    public ArrayList${"<GraphNode>"} adjacentNodes;
}`}
        show={props.show}
        onHide={props.onHide}
    />
);



export {WeightedGraphSourceCode, ListNodeSourceCode, PairSourceCode, TreeNodeSourceCode, IntervalSourceCode, GraphNodeSourceCode};